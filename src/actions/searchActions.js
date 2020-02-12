import { SEARCH_RECIPE, FETCH_RECIPES, LOADING } from "./types";

import instance from "../axios";

export const searchRecipe = text => dispatch => {
  dispatch({
    type: SEARCH_RECIPE,
    payload: text
  });
};

export const fetchRecipes = text => dispatch => {
  instance
    .get(`/search.php?s=${text}`)
    .then(response =>
      dispatch({
        type: FETCH_RECIPES,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const setLoading = () => {
  return {
    type: LOADING
  };
};
