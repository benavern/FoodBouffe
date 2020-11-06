import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    "category": "Plat",
    "id": "5FqOszTNpQ4K2w1M5XnU",
    "image": "https://source.unsplash.com/12eHC6FxPyg/200x100",
    "info": "Pas trop fort alors ...",
    "like": true,
    "name": "Pates au pesto",
    "prepDuration": 10,
  },
  {
    "category": "Entrée",
    "id": "5GhXVJCNeu1tlXs9tm7T",
    "image": "https://source.unsplash.com/9aOswReDKPo/200x100",
    "info": "Dans son plus simple appareil",
    "like": true,
    "name": "Avocat",
    "prepDuration": 1,
  },
  {
    "category": "Plat",
    "id": "9ln4uJd7IRXKKCmWu4eI",
    "image": "https://source.unsplash.com/Djs02AtkOm4/200x100",
    "info": "Faits maison, les meilleurs",
    "like": false,
    "name": "Burger",
    "prepDuration": 90,
  },
  {
    "category": "Désert",
    "id": "BExpwdFZhJungHC4BGU3",
    "image": "https://source.unsplash.com/8Nc_oQsc2qQ/200x100",
    "info": "Avec sirop d'erable et myrtilles",
    "like": false,
    "name": "Pancakes",
    "prepDuration": 45,
  },
  {
    "category": "Plat",
    "id": "NN4yxKagILGoUhrUxjho",
    "image": "https://source.unsplash.com/GXhmQt6MFX8/200x100",
    "info": "Épicés mais pas trop!",
    "like": false,
    "name": "Ramen",
    "prepDuration": 120,
  },
  {
    "category": "Plat",
    "id": "QAVWlwwIMZ2uvBmBTqii",
    "image": "https://source.unsplash.com/ennARkXrF74/200x100",
    "info": "Grillés, c'est comme ça que ça se mange!",
    "like": false,
    "name": "Épis de maïs",
    "prepDuration": 10,
  },
  {
    "category": "Déssert",
    "id": "qS89GDrigN5FBOlenBbS",
    "image": "https://source.unsplash.com/kXoCXrHhfRc/200x100",
    "info": "miam! 😜️",
    "like": true,
    "name": "Pizza nutella",
    "prepDuration": 20,
  },
]

const recipesSlice = createSlice({
  name: 'recipes',

  initialState,

  reducers: {
    addRecipe(state, action) {
      state.push(action.payload)
    },

    toggleLikeRecipe(state, action) {
      const { id } = action.payload
      const recipe = state.find(rec => rec.id === id)

      if(!recipe) {
        console.warn('This recipe does not exist.')
        return
      }
      recipe.like = !recipe.like
    },

    removeRecipe(state, action) {
      return state.filter(rec => rec.id !== action.payload.id)
    }
  }
})

export const { addRecipe, toggleLikeRecipe, removeRecipe } = recipesSlice.actions
export default recipesSlice.reducer
