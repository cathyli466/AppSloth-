import React, { createContext, useContext, useState } from 'react';

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);

  const updateCoins = (timeSpentInSeconds) => {

    const coinsEarned = Math.floor(timeSpentInSeconds / 60); // 1 coin per minute 
    setCoins(coins + coinsEarned);
  };

  return (
    <CoinContext.Provider value={{ coins, updateCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  return useContext(CoinContext);
};
