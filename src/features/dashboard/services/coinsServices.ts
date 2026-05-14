import { api } from "@/lib/axios";

export const getCoinsList = async (currency: string) => {
  const res = await api.get(`coins/markets?vs_currency=${currency}&per_page=10`);
  return res.data;
}