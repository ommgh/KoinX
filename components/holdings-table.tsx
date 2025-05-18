"use client";

import React, { useState, useMemo } from "react";
import { useHoldingsStore, type Holding } from "@/store/use-holdings-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  type SortingState,
  type Row,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<Holding>();

export function HoldingsTable() {
  const {
    holdings,
    selectedHoldings,
    toggleHolding,
    selectAllHoldings,
    clearSelectedHoldings,
  } = useHoldingsStore();

  const [showAll, setShowAll] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: () => {
          const isAllCurrentlySelected =
            holdings.length > 0 && selectedHoldings.length === holdings.length;
          const isSomeCurrentlySelected =
            selectedHoldings.length > 0 &&
            selectedHoldings.length < holdings.length;

          return (
            <Checkbox
              checked={
                isAllCurrentlySelected
                  ? true
                  : isSomeCurrentlySelected
                  ? "indeterminate"
                  : false
              }
              onCheckedChange={(value) => {
                if (
                  value ||
                  (!isAllCurrentlySelected && isSomeCurrentlySelected)
                ) {
                  selectAllHoldings();
                } else {
                  clearSelectedHoldings();
                }
              }}
              aria-label="Select all holdings"
              className="ml-1"
            />
          );
        },
        cell: ({ row }: { row: Row<Holding> }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => {
              toggleHolding(row.original.coin);
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("coinName", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 p-0 hover:bg-transparent font-semibold"
          >
            Asset
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Image
              src={row.original.logo || "/placeholder.svg"}
              alt={row.original.coinName}
              width={24}
              height={24}
              className="rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/24x24/E2E8F0/94A3B8?text=?";
              }}
            />
            <div>
              <div className="font-medium">{row.original.coinName}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {row.original.coin}
              </div>
            </div>
          </div>
        ),
        sortingFn: "text",
      }),
      columnHelper.accessor("totalHolding", {
        header: ({ column }) => (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="flex items-center gap-1 p-0 hover:bg-transparent font-semibold ml-auto"
            >
              Holdings
              <ArrowUpDown className="h-3 w-3" />
            </Button>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Current Market Rate
            </div>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            <div>
              {row.original.totalHolding.toFixed(6)} {row.original.coin}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ${" "}
              {row.original.currentPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              /{row.original.coin}
            </div>
          </div>
        ),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor((row) => row.totalHolding * row.currentPrice, {
        id: "totalValue",
        header: ({ column }) => (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="flex items-center gap-1 p-0 hover:bg-transparent font-semibold ml-auto"
            >
              Total Current Value
              <ArrowUpDown className="h-3 w-3" />
            </Button>
          </div>
        ),
        cell: ({ getValue }) => (
          <div className="text-right font-medium">
            ${" "}
            {getValue().toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ),
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor((row) => row.stcg.gain, {
        id: "shortTerm",
        header: ({ column }) => (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="flex items-center gap-1 p-0 hover:bg-transparent font-semibold ml-auto"
            >
              Short-term P/L
              <ArrowUpDown className="h-3 w-3" />
            </Button>
          </div>
        ),
        cell: ({ row }) => {
          const value = row.original.stcg.gain;
          const isNegative = value < 0;
          return (
            <div
              className={`text-right ${
                isNegative ? "text-red-600" : "text-green-600"
              }`}
            >
              {isNegative ? "-" : "+"}$
              {Math.abs(value).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {row.original.stcg.balance.toFixed(4)} {row.original.coin}
              </div>
            </div>
          );
        },
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor((row) => row.ltcg.gain, {
        id: "longTerm",
        header: ({ column }) => (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="flex items-center gap-1 p-0 hover:bg-transparent font-semibold ml-auto"
            >
              Long-Term P/L
              <ArrowUpDown className="h-3 w-3" />
            </Button>
          </div>
        ),
        cell: ({ row }) => {
          const value = row.original.ltcg.gain;
          const isNegative = value < 0;
          return (
            <div
              className={`text-right ${
                isNegative ? "text-red-600" : "text-green-600"
              }`}
            >
              {isNegative ? "-" : "+"}$
              {Math.abs(value).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {row.original.ltcg.balance.toFixed(4)} {row.original.coin}
              </div>
            </div>
          );
        },
        sortingFn: "alphanumeric",
      }),
      columnHelper.display({
        id: "actions",
        header: () => (
          <div className="text-right font-semibold">Amount to Sell</div>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            {row.getIsSelected() ? ( // Check if the row is selected
              <div>
                {row.original.totalHolding.toFixed(6)} {row.original.coin}
              </div>
            ) : (
              <div className="text-gray-400">-</div>
            )}
          </div>
        ),
      }),
    ],
    [
      holdings.length,
      selectedHoldings.length,
      selectAllHoldings,
      clearSelectedHoldings,
      toggleHolding,
    ]
  );

  const rowSelection = useMemo(() => {
    const selection: { [key: string]: boolean } = {};
    selectedHoldings.forEach((coinId) => {
      selection[coinId] = true;
    });
    return selection;
  }, [selectedHoldings]);

  const table = useReactTable({
    data: holdings,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.coin,
    enableRowSelection: true,
  });

  const rowsToDisplay = useMemo(() => {
    const processedRows = table.getRowModel().rows;
    return showAll ? processedRows : processedRows.slice(0, 5);
  }, [showAll, table.getRowModel().rows]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Your Holdings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            {" "}
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      style={{
                        width:
                          header.getSize() !== 0 ? header.getSize() : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rowsToDisplay.length > 0 ? (
                rowsToDisplay.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-10 text-gray-500"
                  >
                    No holdings data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {holdings.length > 5 && (
          <div className="flex items-center justify-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="link"
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              {showAll ? "Show Less" : `View all ${holdings.length} holdings`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
