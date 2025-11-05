import { Header } from "@/components/Header";
import { NewsPlayer } from "@/components/NewsPlayer";
import { MarketBiasCard } from "@/components/MarketBiasCard";
import { SignalsTable } from "@/components/SignalsTable";
import { NavigationGuide } from "@/components/NavigationGuide";
import { useMarketData } from "@/hooks/useMarketData";

const Index = () => {
  const { marketData, isConnected, getPrice } = useMarketData();
  
  const marketBiases = [
    {
      assetClass: "Forex",
      bias: "bullish" as const,
      keyDriver: "Fed rate pause expectations weakening USD across majors",
      percentage: "+0.8%"
    },
    {
      assetClass: "Indices",
      bias: "bullish" as const,
      keyDriver: "Tech earnings momentum and rate stability supporting equity rally",
      percentage: "+1.2%"
    },
    {
      assetClass: "Crypto",
      bias: "bullish" as const,
      keyDriver: "Institutional adoption accelerating, BTC breaking key resistance",
      percentage: "+3.5%"
    },
    {
      assetClass: "Commodities",
      bias: "bullish" as const,
      keyDriver: "Gold hitting ATH on safe-haven demand, Oil supported by OPEC+",
      percentage: "+1.5%"
    },
    {
      assetClass: "Futures",
      bias: "neutral" as const,
      keyDriver: "Mixed sentiment ahead of key economic data releases",
      percentage: "+0.2%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <NewsPlayer />
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Market Bias Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {marketBiases.map((bias, index) => {
            const priceData = getPrice(bias.assetClass);
            return (
              <MarketBiasCard 
                key={index} 
                {...bias}
                price={priceData?.price}
                change={priceData?.change}
                changePercent={priceData?.changePercent}
                isConnected={isConnected}
              />
            );
          })}
          </div>
        </div>

        <SignalsTable marketData={marketData} isConnected={isConnected} />
        
        <NavigationGuide />
      </main>
    </div>
  );
};

export default Index;
