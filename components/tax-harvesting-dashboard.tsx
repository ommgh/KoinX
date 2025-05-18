"use client";

import { useQuery } from "@tanstack/react-query";
import { CapitalGainsSection } from "./capital-gains-section";
import { HoldingsTable } from "./holdings-table";
import {
  CapitalGains,
  Holding,
  useHoldingsStore,
} from "@/store/use-holdings-store";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AlertTriangleIcon, Info } from "lucide-react";

export function TaxHarvestingDashboard() {
  const { setHoldings, setCapitalGains } = useHoldingsStore();

  const {
    data: holdingsData,
    isLoading: isLoadingHoldings,
    error: holdingsError,
  } = useQuery<Holding[], Error>({
    queryKey: ["holdings"],
    queryFn: async () => {
      const response = await fetch("/api/holdings");
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch holdings:",
          response.status,
          response.statusText,
          errorText
        );
        throw new Error(
          `Network response was not ok for holdings. Status: ${response.status}. Details: ${errorText}`
        );
      }
      return response.json();
    },
  });

  const {
    data: capitalGainsData,
    isLoading: isLoadingCapitalGains,
    error: capitalGainsError,
  } = useQuery<CapitalGains, Error>({
    queryKey: ["capitalGains"],
    queryFn: async () => {
      const response = await fetch("/api/capital-gains");
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch capital gains:",
          response.status,
          response.statusText,
          errorText
        );
        throw new Error(
          `Network response was not ok for capital gains. Status: ${response.status}. Details: ${errorText}`
        );
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (holdingsData) {
      setHoldings(holdingsData);
    }
  }, [holdingsData, setHoldings]);

  useEffect(() => {
    if (capitalGainsData) {
      setCapitalGains(capitalGainsData);
    }
  }, [capitalGainsData, setCapitalGains]);

  const isLoading = isLoadingHoldings || isLoadingCapitalGains;
  const queryError = holdingsError || capitalGainsError;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5">
        <h1 className="text-2xl font-bold">Tax Harvesting Dashboard</h1>
        <Popover>
          <PopoverTrigger className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
            How it works?
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            className="rounded-md bg-[#0c1c40] dark:bg-white text-white dark:text-black shadow-md px-4 py-2 max-w-xs text-sm border border-gray-200"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh
              semper mattis scelerisque tellus. Vel mattis diam duis morbi
              tellus dui consectetur.{" "}
              <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                Know More
              </span>
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border border-blue-900 bg-[#d8dff4] dark:bg-[#0c1c40] rounded-lg shadow-sm"
        >
          <AccordionTrigger className="px-4 py-3 flex items-center gap-2 hover:no-underline">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">Important Notes & Disclaimers</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 border-blue-800 text-sm">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Tax-loss harvesting is currently not allowed under Indian tax
                regulations. Please consult your tax advisor before making any
                decisions.
              </li>
              <li>
                Tax harvesting does not apply to derivatives or futures. These
                are handled separately as business income under tax rules.
              </li>
              <li>
                Price and market value data is fetched from Coingecko, not from
                individual exchanges. As a result, values may slightly differ
                from the ones on your exchange.
              </li>
              <li>
                Some countries do not have a short-term / long-term bifurcation.
                For now, we are calculating everything as long-term.
              </li>
              <li>
                Only realized losses are considered for harvesting. Unrealized
                losses in held assets are not counted.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {queryError ? (
        <div className="flex flex-col items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600">
            We encountered an issue fetching the necessary data. Please try
            refreshing the page.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Error: {queryError.message}
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading Financial Data...
          </p>
        </div>
      ) : (
        <>
          <CapitalGainsSection />
          <HoldingsTable />
        </>
      )}
    </div>
  );
}
