import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ICT Trading Signals</h1>
              <p className="text-xs text-muted-foreground">Institutional Order Flow Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-success text-success animate-pulse-glow">
              ● Markets Open
            </Badge>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Current Session</div>
              <div className="font-mono font-bold text-primary">New York Kill Zone</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
