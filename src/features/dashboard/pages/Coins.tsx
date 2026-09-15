import { useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useCoinQuery } from "../hooks/useCoinQueries";
import Loader from "@/components/atom/Loader";
import { Table, TableBody, TableEmptyState, TableHead, TableHeader, TableRow } from "@/components/atom/Table";
import { useCoinStore } from "@/store/coinStore";
import CoinRow from "../components/table/CoinRow";

const Coins = () => {
  const [visibleCoinIds, setVisibleCoinIds] = useState<string[]>([]);
  const { isLoading, currency, fetchNextPage, hasNextPage, isFetchingNextPage } = useCoinQuery();
  const data = useCoinStore(state => state.coinIds)

  console.log(visibleCoinIds);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader>Loading</Loader>
      </div>
    )
  }

  return (
    <div className="overflow-hidden h-[calc(100vh-64px)]">
      <TableVirtuoso
        data={data}
        style={{ height: "100%" }}
        rangeChanged={(range) => {
          const visibleIds = data?.slice(range.startIndex, range.endIndex + 1);
          setVisibleCoinIds(visibleIds ?? []);
        }}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        components={{
          Table,
          TableHead: TableHeader,
          TableBody,
          TableRow,
          EmptyPlaceholder: () => (
            <tbody>
              <TableEmptyState
                colSpan={5}
              />
            </tbody>
          ),
        }}
        fixedHeaderContent={() => (
          <TableRow className="bg-black">
            <TableHead className="w-20">Index</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead>Valuation</TableHead>
            <TableHead>Total Volume</TableHead>
            <TableHead className="text-right">
              Market Change (24h)
            </TableHead>
          </TableRow>
        )}
        itemContent={(index, coinId) => (
          <CoinRow
            key={coinId}
            coinId={coinId}
            index={index}
            currency={currency}
          />
        )}
      />
    </div>
  )

};
export default Coins;