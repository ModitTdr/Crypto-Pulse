import { useCoinQuery } from "../hooks/useCoinQueries"
import { Table, TableBody, TableEmptyState, TableHead, TableHeader, TableRow } from "@/components/atom/Table";
import CoinRow from "../components/table/CoinRow";
import CoinCard from "../components/CoinCard";
import { useCoinStore } from "@/store/coinStore";
// import { useEffect, useRef } from "react";
import { TableVirtuoso } from "react-virtuoso"

const Dashboard = () => {
  const { isLoading, currency, fetchNextPage, hasNextPage, isFetchingNextPage } = useCoinQuery();
  // const data = useCoinStore(state => state.coins);
  const data = useCoinStore(state => state.coinIds)
  const topData = data?.slice(0, 3);

  // --old--> used for scroll event based infinite scroll
  // const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);
  // useEffect(() => {
  //   function handleScroll() {
  //     if (!tableBodyRef.current) return;
  //     const table = tableBodyRef.current.getBoundingClientRect();
  //     const scrollPosition = table.bottom - window.innerHeight;

  //     console.log('isFetchingNextPage', isFetchingNextPage);
  //     if (scrollPosition < 300 && hasNextPage && !isFetchingNextPage) {
  //       fetchNextPage();
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <section className="space-y-10 overflow-hidden">
      <div className="relative text-center">
        <div className="bg-radial-[at_top] from-primary/60 to-transparent absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[70vh] blur-[99px]" />
        <h1
          className="
            text-[17vw] font-semibold font-sora
            bg-linear-to-b from-foreground from-25% via-foreground/5 via-60% to-background
            bg-clip-text bg-transparent text-transparent
            absolute top-0 left-1/2 -translate-x-1/2 lg:-translate-y-20
          "
        >
          Dashboard
        </h1>
        <div className="flex justify-evenly items-center gap-4 pt-35 flex-wrap">
          {topData &&
            topData.map((coinId: string, index) => {
              return (
                <CoinCard
                  key={coinId}
                  // data={data}
                  coinId={coinId}
                  index={index}
                  currencyType={currency}
                />
              )
            })
          }
        </div>
      </div>

      <div className="w-full h-[720px]">
        <TableVirtuoso
          data={data}
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
              coinId={coinId}
              index={index}
              currency={currency}
            />
          )}
        />
      </div>

    </section>
  )
}

export default Dashboard
