import React, { useCallback, useContext, useState } from 'react';

const foodState = {
  ingredients: new Array<{ name: string; emoji: string }>(),
  sandwiches: new Array<string>(),
};

const foodContext = {
  state: foodState,
  setFood: (newState: typeof foodState) => {},
};

export const FoodContext = React.createContext(foodContext);

export const useFood = () => useContext(FoodContext);

export const useFoo = () => {
  const [food, setFood] = useState(foodState);
  return { food, setFood };
};

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [food, setFood] = useState(foodState);
  return (
    <FoodContext.Provider
      value={{
        state: food,
        setFood: (x: any) => {
          console.log('NEW_FOOD:', x);
          setFood(x);
        },
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
