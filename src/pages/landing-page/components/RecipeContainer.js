import React from "react";

import { connect } from "react-redux";

import RecipeCard from "./RecipeCard";

function RecipeContainer(props) {
  const { recipes } = props;
  let content =
    recipes?.length > 0
      ? recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))
      : null;

  return <div>{content}</div>;
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes
});

export default connect(mapStateToProps)(RecipeContainer);
