import type { CoinResponseType } from '@/features/dashboard/types/coinResponseType'
import { create } from 'zustand'

interface State {
  // coins: CoinResponseType[]
  coinsObj: Record<string, CoinResponseType>
  coinIds: string[];
  setCoins: (coins: CoinResponseType[]) => void;
}

export const useCoinStore = create<State>(
  (set) => ({
    // coins: [],
    // setCoins: (coins) => set(() => ({ coins: coins }))

    coinsObj: {},
    coinIds: [],

    setCoins: (coins) => {
      set((state) => {
        const newCoinsObj = { ...state.coinsObj };
        let changed = false;

        for (const coin of coins) {
          const oldCoin = state.coinsObj[coin.id];
          if (!oldCoin) {
            newCoinsObj[coin.id] = coin;
          } else if (JSON.stringify(oldCoin) !== JSON.stringify(coin)) {
            newCoinsObj[coin.id] = coin;
            changed = true;
          }
        }
        if (!changed && JSON.stringify(state.coinsObj) === JSON.stringify(newCoinsObj)) {
          return state;
        }
        return { coinsObj: newCoinsObj, coinIds: coins.map(c => c.id) };
      });
    }

  })
);