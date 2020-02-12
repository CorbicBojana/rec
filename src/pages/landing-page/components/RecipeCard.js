import React from "react";

function RecipeCard(props) {
  const { recipe } = props;

  return <div>{recipe.strMeal}</div>;
}

export default RecipeCard;
