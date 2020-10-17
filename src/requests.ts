import axios from 'axios';
import { Ingredient, Sandwich } from 'types';

export const fetchIngredients = () =>
  axios
    .get<Ingredient[]>('http://localhost:4001/ingredients')
    .then(({ data }) => data);

export const fetchSandwiches = () =>
  axios
    .get<Sandwich[]>('http://localhost:4000/sandwiches')
    .then(({ data }) => data);

export const postIngredient = (ingredient: Ingredient) =>
  axios.post<undefined>('http://localhost:4001/ingredients', ingredient);

export const postSandwich = (sandwich: Sandwich) =>
  axios.post<undefined>('http://localhost:4000/sandwiches', sandwich);
