import { configureStore } from "@reduxjs/toolkit";
import PokemonReducer from "./reducer";

export const store = configureStore({
  reducer: { pokemon: PokemonReducer },
});
