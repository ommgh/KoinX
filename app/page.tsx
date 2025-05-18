import { Header } from "@/components/header";
import { TaxHarvestingDashboard } from "@/components/tax-harvesting-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <TaxHarvestingDashboard />
      </div>
    </main>
  );
}
