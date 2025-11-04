import { Card } from "@/components/ui/card";
import { Filter, Bell, BarChart3, Clock, BookOpen } from "lucide-react";

const features = [
  {
    icon: Filter,
    title: "Filter by Asset Class",
    description: "Navigate the side menu to view signals for Forex, Indices, Crypto, Futures, or Commodities"
  },
  {
    icon: Clock,
    title: "Kill Zone Alerts",
    description: "Enable session alerts for London and New York openings when institutional order flow is highest"
  },
  {
    icon: Bell,
    title: "News Feed",
    description: "Access 30+ recent market-moving articles with filters by region and asset class"
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "View historical P&L, win rates, average R:R, and max drawdown for each signal"
  },
  {
    icon: BookOpen,
    title: "ICT Methodology",
    description: "Learn about Order Blocks, Fair Value Gaps, Liquidity Sweeps, and Breaker Blocks"
  }
];

export const NavigationGuide = () => {
  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Platform Features</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Explore the tools and features designed to enhance your trading decisions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/50">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This platform is for educational purposes only. 
            Trading carries significant risk of loss. Always use proper risk management and 
            never trade with money you cannot afford to lose.
          </p>
        </div>
      </div>
    </Card>
  );
};
