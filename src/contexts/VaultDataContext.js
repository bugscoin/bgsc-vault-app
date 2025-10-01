import { createContext } from 'react';

export const VaultDataContext = createContext({
  vaultData: {
    totalDeposited: '0',
    userBalance: '0',
    apy: '0',
    nextRewardTime: null
  },
  setVaultData: () => {}
});
