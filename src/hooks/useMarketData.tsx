import { useState, useEffect, useRef } from 'react';

interface MarketPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface MarketDataState {
  [symbol: string]: MarketPrice;
}

const ASSET_SYMBOLS = {
  'EUR/USD': 'EURUSD',
  'S&P 500': 'SPX',
  'BTC/USD': 'BTCUSDT',
  'Gold (XAU)': 'XAUUSD',
  'Crude Oil': 'USOIL',
  'Forex': 'EURUSD',
  'Indices': 'SPX',
  'Crypto': 'BTCUSDT',
  'Futures': 'USOIL',
  'Commodities': 'XAUUSD'
};

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketDataState>({});
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = () => {
    try {
      // Using Binance WebSocket for crypto prices (public, no auth needed)
      const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Binance ticker data
          if (data.s) {
            const price = parseFloat(data.c);
            const changePercent = parseFloat(data.P);
            const change = parseFloat(data.p);
            
            setMarketData(prev => ({
              ...prev,
              [data.s]: {
                symbol: data.s,
                price,
                change,
                changePercent
              }
            }));

            // Simulate other markets based on BTC movement
            simulateOtherMarkets(price, changePercent);
          }
        } catch (error) {
          console.error('Error parsing market data:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        
        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }, 5000);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      setIsConnected(false);
    }
  };

  const simulateOtherMarkets = (btcPrice: number, btcChangePercent: number) => {
    // Simulate correlated price movements for demo purposes
    const variance = Math.random() * 0.5 - 0.25; // +/- 0.25%
    
    setMarketData(prev => ({
      ...prev,
      'EURUSD': {
        symbol: 'EURUSD',
        price: 1.0850 + (Math.random() * 0.004 - 0.002),
        change: 0.0015 + (variance * 0.001),
        changePercent: 0.14 + variance
      },
      'SPX': {
        symbol: 'SPX',
        price: 4825 + (Math.random() * 10 - 5),
        change: 12.5 + (variance * 5),
        changePercent: 0.26 + variance
      },
      'XAUUSD': {
        symbol: 'XAUUSD',
        price: 2387 + (Math.random() * 4 - 2),
        change: 8.2 + (variance * 2),
        changePercent: 0.34 + variance
      },
      'USOIL': {
        symbol: 'USOIL',
        price: 78.75 + (Math.random() * 0.5 - 0.25),
        change: 0.85 + (variance * 0.3),
        changePercent: 1.08 + variance
      }
    }));
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  const getPrice = (asset: string): MarketPrice | null => {
    const symbol = ASSET_SYMBOLS[asset as keyof typeof ASSET_SYMBOLS];
    return marketData[symbol] || null;
  };

  return {
    marketData,
    isConnected,
    getPrice
  };
};
