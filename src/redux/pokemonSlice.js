import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'catchPokemon',
  initialState : {
    myPokemon: []
  },
  reducers: {
    addPokemon: (state, data) => {
      state.myPokemon.unshift(data.payload)
    },
    removePokemon: (state, id) => {
      const newArray = state.myPokemon.filter(obj => obj.catchId !== id.payload)
      state.myPokemon = []
      state.myPokemon = newArray
    },
  },
})

// Action creators are generated for each case reducer function
export const { addPokemon, removePokemon } = pokemonSlice.actions

export default pokemonSlice.reducer