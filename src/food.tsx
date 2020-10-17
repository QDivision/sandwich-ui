import React, { useCallback, useContext, useState } from 'react';
import { Ingredient, Sandwich } from 'types';

export interface FoodState {
  ingredients: Ingredient[];
  sandwiches: Sandwich[];
  setIngredients: (ingredients: Ingredient[]) => void;
  setSandwiches: (sandwiches: Sandwich[]) => void;
}

const initialFoodState: FoodState = {
  ingredients: [],
  sandwiches: [],
  setIngredients: () => {},
  setSandwiches: () => {},
};

const FoodContext = React.createContext(initialFoodState);

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [food, setFood] = useState(initialFoodState);

  const setIngredients = useCallback(
    (ingredients: Ingredient[]) =>
      setFood((prevState) => ({ ...prevState, ingredients })),
    [],
  );

  const setSandwiches = useCallback(
    (sandwiches: Sandwich[]) =>
      setFood((prevState) => ({ ...prevState, sandwiches })),
    [],
  );

  return (
    <FoodContext.Provider value={{ ...food, setIngredients, setSandwiches }}>
      {children}
    </FoodContext.Provider>
  );
};
