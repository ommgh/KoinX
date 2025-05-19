"use client";

import { useHoldingsStore } from "@/store/use-holdings-store";
import { Card, CardContent } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";

export function CapitalGainsSection() {
  const { capitalGains, afterHarvestingCapitalGains } = useHoldingsStore();

  if (!capitalGains || !afterHarvestingCapitalGains) return null;

  // Pre-harvesting calculations
  const stcgProfits = capitalGains.capitalGains.stcg.profits;
  const stcgLosses = capitalGains.capitalGains.stcg.losses;
  const ltcgProfits = capitalGains.capitalGains.ltcg.profits;
  const ltcgLosses = capitalGains.capitalGains.ltcg.losses;

  const stcgNet = stcgProfits - stcgLosses;
  const ltcgNet = ltcgProfits - ltcgLosses;
  const realisedCapitalGains = stcgNet + ltcgNet;

  // After harvesting calculations
  const afterStcgProfits =
    afterHarvestingCapitalGains.capitalGains.stcg.profits;
  const afterStcgLosses = afterHarvestingCapitalGains.capitalGains.stcg.losses;
  const afterLtcgProfits =
    afterHarvestingCapitalGains.capitalGains.ltcg.profits;
  const afterLtcgLosses = afterHarvestingCapitalGains.capitalGains.ltcg.losses;

  const afterStcgNet = afterStcgProfits - afterStcgLosses;
  const afterLtcgNet = afterLtcgProfits - afterLtcgLosses;
  const effectiveCapitalGains = afterStcgNet + afterLtcgNet;

  // Savings calculation
  const savings = realisedCapitalGains - effectiveCapitalGains;
  const showSavings = realisedCapitalGains > effectiveCapitalGains;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="bg-white dark:bg-gray-900 border">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Pre Harvesting</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div></div>
              <div className="text-right font-medium">Short-term</div>
              <div className="text-right font-medium">Long-term</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>Profits</div>
              <div className="text-right">
                ${" "}
                {stcgProfits.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-right">
                ${" "}
                {ltcgProfits.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>Losses</div>
              <div className="text-right text-red-500">
                - ${" "}
                {stcgLosses.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-right text-red-500">
                - ${" "}
                {ltcgLosses.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>Net Capital Gains</div>
              <div className="text-right">
                ${" "}
                {stcgNet.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-right">
                ${" "}
                {ltcgNet.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className="font-bold">Realised Capital Gains:</div>
                <div className="text-2xl font-bold">
                  $
                  {realisedCapitalGains.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500 text-white border border-blue-600">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">After Harvesting</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div></div>
              <div className="text-right font-medium">Short-term</div>
              <div className="text-right font-medium">Long-term</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>Profits</div>
              <div className="text-right">
                ${" "}
                {afterStcgProfits.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-right">
                ${" "}
                {afterLtcgProfits.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>Losses</div>
              <div className="text-right">
                - ${" "}
                {afterStcgLosses.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-right">
                - ${" "}
                {afterLtcgLosses.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>Net Capital Gains</div>
              <div className="text-right">
                {afterStcgNet < 0 ? "- " : ""}$
                {Math.abs(afterStcgNet).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-right">
                {afterLtcgNet < 0 ? "- " : ""}$
                {Math.abs(afterLtcgNet).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="pt-4 border-t border-blue-400">
              <div className="flex justify-between items-center">
                <div className="font-bold">Effective Capital Gains:</div>
                <div className="text-2xl font-bold">
                  {effectiveCapitalGains < 0 ? "- " : ""}$
                  {Math.abs(effectiveCapitalGains).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>
            </div>
            {showSavings && (
              <div className="pt-4 flex items-center gap-2">
                <PartyPopper className="h-5 w-5 text-yellow-300" />
                <span>
                  You are going to save upto ${" "}
                  {savings.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
