import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceDisplayProps {
  price: number;
  change: number;
  changePercent: number;
  className?: string;
}

export const PriceDisplay = ({ price, change, changePercent, className = '' }: PriceDisplayProps) => {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const [prevPrice, setPrevPrice] = useState(price);

  useEffect(() => {
    if (price !== prevPrice) {
      setFlash(price > prevPrice ? 'up' : 'down');
      setPrevPrice(price);
      
      const timer = setTimeout(() => setFlash(null), 500);
      return () => clearTimeout(timer);
    }
  }, [price, prevPrice]);

  const isPositive = change >= 0;
  const flashClass = flash === 'up' 
    ? 'bg-success/20' 
    : flash === 'down' 
    ? 'bg-destructive/20' 
    : '';

  return (
    <div className={`flex items-center gap-2 transition-colors duration-300 ${flashClass} ${className}`}>
      <span className="font-mono font-bold">
        {price.toFixed(price > 1000 ? 2 : 4)}
      </span>
      <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="font-mono">
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
