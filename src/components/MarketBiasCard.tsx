import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Wifi, WifiOff } from "lucide-react";
import { PriceDisplay } from "./PriceDisplay";

interface MarketBiasProps {
  assetClass: string;
  bias: "bullish" | "bearish" | "neutral";
  keyDriver: string;
  percentage: string;
  price?: number;
  change?: number;
  changePercent?: number;
  isConnected?: boolean;
}

export const MarketBiasCard = ({ 
  assetClass, 
  bias, 
  keyDriver, 
  percentage, 
  price, 
  change, 
  changePercent,
  isConnected = false 
}: MarketBiasProps) => {
  const getBiasConfig = () => {
    switch (bias) {
      case "bullish":
        return {
          icon: TrendingUp,
          gradient: "bg-gradient-bullish",
          color: "text-success",
          badge: "success"
        };
      case "bearish":
        return {
          icon: TrendingDown,
          gradient: "bg-gradient-bearish",
          color: "text-destructive",
          badge: "destructive"
        };
      default:
        return {
          icon: Minus,
          gradient: "bg-gradient-neutral",
          color: "text-warning",
          badge: "warning"
        };
    }
  };

  const config = getBiasConfig();
  const Icon = config.icon;

  return (
    <Card className={`${config.gradient} border-border/50 hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-glow relative`}>
      <div className="absolute top-3 right-3">
        {isConnected ? (
          <Wifi className="h-4 w-4 text-success animate-pulse" />
        ) : (
          <WifiOff className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg mb-1">{assetClass}</h3>
            <Badge variant={config.badge as any} className="font-mono">
              {bias.toUpperCase()}
            </Badge>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Icon className={`h-8 w-8 ${config.color}`} />
            <span className={`text-2xl font-bold font-mono ${config.color}`}>
              {percentage}
            </span>
          </div>
        </div>

        {price && change !== undefined && changePercent !== undefined && (
          <div className="mb-4 p-3 rounded-lg bg-card/50 border border-border/30">
            <div className="text-xs text-muted-foreground mb-1">Live Price</div>
            <PriceDisplay 
              price={price} 
              change={change} 
              changePercent={changePercent}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Key Driver</div>
          <p className="text-sm">{keyDriver}</p>
        </div>
      </div>
    </Card>
  );
};
