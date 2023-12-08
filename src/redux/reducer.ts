import { createSlice } from "@reduxjs/toolkit";
import { PokemonName, searchName } from "../components/Type";

interface initialStateInterface {
  pokemon: PokemonName[];
  newPokemon: PokemonName[];
  currentPage: number;
  filterType: string;
  searchName: searchName[];
}

const initialState: initialStateInterface = {
  pokemon: [],
  newPokemon: [],
  currentPage: 1,
  filterType: "",
  searchName: [],
};

export const PokemonReducer = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    setNewPokemon: (state, action) => {
      state.newPokemon = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
  },
});

export const {
  setPokemon,
  setNewPokemon,
  setCurrentPage,
  setFilterType,
  setSearchName,
} = PokemonReducer.actions;

export default PokemonReducer.reducer;
