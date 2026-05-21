import type { CoinResponseType } from '@/features/dashboard/types/coinResponseType'
import { create } from 'zustand'

interface State {
  coins: CoinResponseType[]
  setCoins: (coins: CoinResponseType[]) => void;
}

export const useCoinStore = create<State>(
  (set) => ({
    coins: [],
    setCoins: (coins) => set(() => ({ coins: coins }))
  })
);