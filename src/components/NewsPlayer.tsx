import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";

interface NewsItem {
  headline: string;
  summary: string;
  timestamp: string;
  impact: "high" | "medium" | "low";
}

const newsData: NewsItem[] = [
  {
    headline: "Fed Signals Potential Rate Pause",
    summary: "Federal Reserve hints at holding rates steady amid cooling inflation data",
    timestamp: "2 hours ago",
    impact: "high"
  },
  {
    headline: "Bitcoin Breaks $65K Resistance",
    summary: "Crypto markets surge as institutional adoption accelerates",
    timestamp: "4 hours ago",
    impact: "high"
  },
  {
    headline: "Gold Reaches New All-Time High",
    summary: "Safe-haven demand pushes precious metals to record levels",
    timestamp: "5 hours ago",
    impact: "medium"
  }
];

export const NewsPlayer = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary animate-pulse-glow" />
          <h2 className="text-xl font-bold">Live Market News</h2>
        </div>
        
        <div className="space-y-3">
          {newsData.map((news, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getImpactColor(news.impact)} className="text-xs">
                      {news.impact.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {news.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{news.headline}</h3>
                  <p className="text-xs text-muted-foreground">{news.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 text-sm text-primary hover:underline font-medium">
          View Full News Feed →
        </button>
      </div>
    </Card>
  );
};
