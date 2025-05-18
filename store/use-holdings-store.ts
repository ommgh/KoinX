import { create } from "zustand";

export type Holding = {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
};

export type CapitalGains = {
  capitalGains: {
    stcg: {
      profits: number;
      losses: number;
    };
    ltcg: {
      profits: number;
      losses: number;
    };
  };
};

type HoldingsMap = {
  [coinId: string]: Holding;
};

type HoldingsState = {
  holdings: Holding[];
  holdingsMap: HoldingsMap;
  capitalGains: CapitalGains | null;
  selectedHoldings: string[];
  afterHarvestingCapitalGains: CapitalGains | null;

  setHoldings: (holdings: Holding[]) => void;
  setCapitalGains: (capitalGains: CapitalGains) => void;
  toggleHolding: (coinId: string) => void;
  selectAllHoldings: () => void;
  clearSelectedHoldings: () => void;
};

/**
 * Helper function to deep clone the CapitalGains object.
 * This ensures that mutations are made on a new object instance.
 * For the given structure, JSON.parse(JSON.stringify()) is generally acceptable.
 * @param cg The CapitalGains object to clone.
 * @returns A new, deep-cloned CapitalGains object.
 */
const cloneCapitalGains = (cg: CapitalGains): CapitalGains => {
  return JSON.parse(JSON.stringify(cg));
};

/**
 * Internal helper function to calculate the 'afterHarvestingCapitalGains' state.
 * This function is pure and takes all necessary state as arguments.
 * @param baseCapitalGains The initial capital gains before harvesting.
 * @param holdingsMap A map of all holdings for efficient lookup.
 * @param selectedHoldings An array of coin IDs that are selected for harvesting.
 * @returns A new CapitalGains object representing the state after virtual harvesting, or null.
 */
const calculateNewAfterHarvestingGainsInternal = (
  baseCapitalGains: CapitalGains | null,
  holdingsMap: HoldingsMap,
  selectedHoldings: string[]
): CapitalGains | null => {
  if (!baseCapitalGains) return null;

  const newCalculatedGains = cloneCapitalGains(baseCapitalGains);

  selectedHoldings.forEach((coinId) => {
    const holding = holdingsMap[coinId];
    if (!holding) {
      console.warn(
        `Holding with ID ${coinId} not found in holdingsMap during calculation.`
      );
      return;
    }

    if (holding.stcg.gain > 0) {
      newCalculatedGains.capitalGains.stcg.profits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      newCalculatedGains.capitalGains.stcg.losses += Math.abs(
        holding.stcg.gain
      );
    }

    if (holding.ltcg.gain > 0) {
      newCalculatedGains.capitalGains.ltcg.profits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      newCalculatedGains.capitalGains.ltcg.losses += Math.abs(
        holding.ltcg.gain
      );
    }
  });

  return newCalculatedGains;
};

export const useHoldingsStore = create<HoldingsState>((set, get) => ({
  holdings: [],
  holdingsMap: {},
  capitalGains: null,
  selectedHoldings: [],
  afterHarvestingCapitalGains: null,

  setHoldings: (newHoldings) => {
    const newHoldingsMap: HoldingsMap = newHoldings.reduce((acc, holding) => {
      acc[holding.coin] = holding;
      return acc;
    }, {} as HoldingsMap);

    set((state) => ({
      holdings: newHoldings,
      holdingsMap: newHoldingsMap,
      afterHarvestingCapitalGains: state.capitalGains
        ? calculateNewAfterHarvestingGainsInternal(
            state.capitalGains,
            newHoldingsMap,
            state.selectedHoldings
          )
        : null,
    }));
  },

  setCapitalGains: (newCapitalGains) => {
    set((state) => ({
      capitalGains: newCapitalGains,
      afterHarvestingCapitalGains: calculateNewAfterHarvestingGainsInternal(
        newCapitalGains,
        state.holdingsMap,
        state.selectedHoldings
      ),
    }));
  },

  toggleHolding: (coinId) => {
    set((state) => {
      const newSelectedHoldings = state.selectedHoldings.includes(coinId)
        ? state.selectedHoldings.filter((c) => c !== coinId)
        : [...state.selectedHoldings, coinId];
      return {
        selectedHoldings: newSelectedHoldings,
        afterHarvestingCapitalGains: state.capitalGains
          ? calculateNewAfterHarvestingGainsInternal(
              state.capitalGains,
              state.holdingsMap,
              newSelectedHoldings
            )
          : null,
      };
    });
  },

  selectAllHoldings: () => {
    set((state) => {
      const newSelectedHoldings = state.holdings.map((h) => h.coin);
      return {
        selectedHoldings: newSelectedHoldings,
        afterHarvestingCapitalGains: state.capitalGains
          ? calculateNewAfterHarvestingGainsInternal(
              state.capitalGains,
              state.holdingsMap,
              newSelectedHoldings
            )
          : null,
      };
    });
  },

  clearSelectedHoldings: () => {
    set((state) => ({
      selectedHoldings: [],
      afterHarvestingCapitalGains: state.capitalGains
        ? cloneCapitalGains(state.capitalGains)
        : null,
    }));
  },
}));
