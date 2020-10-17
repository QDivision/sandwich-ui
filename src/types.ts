export interface Ingredient {
  name: string;
  emoji: string;
}

export interface Sandwich {
  name: string;
  bread: Ingredient;
  condiments: Ingredient[];
  layers: Ingredient[];
}
