import { api } from "@/lib/axios";

export const getCoinsList = async (page: number, currency: string) => {
  const res = await api.get(`coins/markets?vs_currency=${currency}&page=${page}&per_page=50`);
  return res.data;
}

export const searchCoins = async (query: string) => {
  const res = await api.get(`search?query=${query}`);
  return res.data;
}

export const getCoinPrices = async (ids: string[], currency: string = 'usd') => {
  const res = await api.get(`simple/price?ids=${ids.join(',')}&vs_currencies=${currency}`);
  return res.data;
}