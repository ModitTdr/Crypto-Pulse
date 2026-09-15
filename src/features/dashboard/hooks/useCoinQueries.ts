import { useCurrency } from "@/context/CurrencyContext";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCoinPrices, getCoinsList, searchCoins } from "../services/coinsServices";
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
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 50
        ? undefined
        : allPages.length + 1

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

export const useSimplePrice = (visibleCoinIds: string[]) => {
  const { currency } = useCurrency();
  const setCoins = useCoinStore(state => state.setCoins);

  return useQuery({
    queryKey: ['simple-price', visibleCoinIds.join(', '), currency],
    queryFn: async () => {
      const data = await getCoinPrices(visibleCoinIds, currency);
      setCoins(data)
      return data;
    },
    enabled: visibleCoinIds.length > 0,
    refetchOnWindowFocus: false,
    refetchInterval: 15000,
  })
}
