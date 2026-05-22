import { useCurrency } from "@/context/CurrencyContext";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCoinsList, searchCoins } from "../services/coinsServices";
import { useCoinStore } from "@/store/coinStore";

export const useCoinQuery = () => {
  const { currency } = useCurrency();
  const setCoins = useCoinStore((state) => state.setCoins);

  // const query = useQuery({
  //   queryKey: ['coins', page, currency],
  //   queryFn: async () => {
  //     const data = await getCoinsList(page, currency);
  //     setCoins(data)
  //     return data;
  //   },
  //   refetchOnWindowFocus: false,
  //   placeholderData: keepPreviousData,
  //   refetchInterval: 15000,
  // })

  const query = useInfiniteQuery({
    queryKey: ['coins'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = await getCoinsList(pageParam, currency);
      setCoins(data)
      return data;
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    refetchInterval: 15000,
  })

  return {
    ...query,
    currency
  }
};

export const useSearchCoin = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchCoins(query),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  })
}
