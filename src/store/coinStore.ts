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
        const newCoinsIds = [...state.coinIds];
        let changed = false;

        for (const coin of coins) {
          const oldCoin = state.coinsObj[coin.id];
          if (!oldCoin) {
            newCoinsObj[coin.id] = coin;
            newCoinsIds.push(coin.id)
            changed = true;
          } else if (
            oldCoin.current_price !== coin.current_price ||
            oldCoin.price_change_percentage_24h !== coin.price_change_percentage_24h ||
            oldCoin.total_volume !== coin.total_volume ||
            oldCoin.market_cap_change_percentage_24h !== coin.market_cap_change_percentage_24h
          ) {
            newCoinsObj[coin.id] = coin;
            changed = true;
          }
        }
        if (!changed) {
          return state;
        }
        return { coinsObj: newCoinsObj, coinIds: newCoinsIds };
      });
    }

  })
);
