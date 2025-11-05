import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Wifi, WifiOff } from "lucide-react";
import { PriceDisplay } from "./PriceDisplay";

interface Signal {
  asset: string;
  setupType: string;
  entry: string;
  stopLoss: string;
  targets: string;
  riskReward: string;
  notes: string;
  bias: "bullish" | "bearish";
}

const signals: Signal[] = [
  {
    asset: "EUR/USD",
    setupType: "Order Block + FVG",
    entry: "1.0850-1.0870",
    stopLoss: "1.0820",
    targets: "1.0950, 1.1020",
    riskReward: "1:3.5",
    notes: "London kill-zone setup. Fed rate pause supporting USD weakness.",
    bias: "bullish"
  },
  {
    asset: "S&P 500",
    setupType: "Liquidity Sweep",
    entry: "4820-4830",
    stopLoss: "4795",
    targets: "4890, 4920",
    riskReward: "1:2.2",
    notes: "NY session bounce. Tech earnings driving sentiment.",
    bias: "bullish"
  },
  {
    asset: "BTC/USD",
    setupType: "Breaker Block",
    entry: "64800-65200",
    stopLoss: "64200",
    targets: "67500, 69000",
    riskReward: "1:4.0",
    notes: "Institutional accumulation zone. Breaking resistance confluence.",
    bias: "bullish"
  },
  {
    asset: "Gold (XAU)",
    setupType: "Fair Value Gap",
    entry: "2385-2390",
    stopLoss: "2375",
    targets: "2415, 2435",
    riskReward: "1:2.8",
    notes: "Safe-haven bid on geopolitical concerns.",
    bias: "bullish"
  },
  {
    asset: "Crude Oil",
    setupType: "Order Block Retest",
    entry: "78.50-79.00",
    stopLoss: "77.80",
    targets: "81.20, 82.50",
    riskReward: "1:3.2",
    notes: "OPEC+ supply concerns. Asian session follow-through expected.",
    bias: "bullish"
  }
];

interface SignalsTableProps {
  marketData?: { [symbol: string]: { price: number; change: number; changePercent: number } };
  isConnected?: boolean;
}

export const SignalsTable = ({ marketData, isConnected = false }: SignalsTableProps) => {
  const getMarketPrice = (asset: string) => {
    const symbolMap: { [key: string]: string } = {
      'EUR/USD': 'EURUSD',
      'S&P 500': 'SPX',
      'BTC/USD': 'BTCUSDT',
      'Gold (XAU)': 'XAUUSD',
      'Crude Oil': 'USOIL'
    };
    const symbol = symbolMap[asset];
    return marketData?.[symbol];
  };
  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Active Trading Signals</h2>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-2 text-success">
                <Wifi className="h-4 w-4 animate-pulse" />
                <span className="text-xs font-medium">LIVE DATA</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <WifiOff className="h-4 w-4" />
                <span className="text-xs font-medium">OFFLINE</span>
              </div>
            )}
            <Badge variant="outline" className="animate-pulse-glow border-primary text-primary">
              LIVE
            </Badge>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Asset</TableHead>
                <TableHead>Live Price</TableHead>
                <TableHead>ICT Setup</TableHead>
                <TableHead>Entry Zone</TableHead>
                <TableHead>Stop Loss</TableHead>
                <TableHead>Targets</TableHead>
                <TableHead>R:R</TableHead>
                <TableHead>Analysis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((signal, index) => {
                const priceData = getMarketPrice(signal.asset);
                return (
                  <TableRow 
                    key={index}
                    className="border-border hover:bg-secondary/50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-bold font-mono">
                      {signal.asset}
                    </TableCell>
                    <TableCell>
                      {priceData ? (
                        <PriceDisplay 
                          price={priceData.price}
                          change={priceData.change}
                          changePercent={priceData.changePercent}
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">No data</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {signal.setupType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {signal.entry}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-destructive">
                      {signal.stopLoss}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-success">
                      {signal.targets}
                    </TableCell>
                    <TableCell className="font-mono font-bold text-primary">
                      {signal.riskReward}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs">
                      {signal.notes}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
