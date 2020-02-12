import React, { useState } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import {
  searchRecipe,
  fetchRecipes,
  setLoading
} from "../../../actions/searchActions";

function SearchForm(props) {
  const propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.fetchRecipes(props.text);
    props.setLoading();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="searchText" onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}

const mapStateToProps = state => ({
  text: state.recipes.text
});

export default connect(mapStateToProps, {
  searchRecipe,
  fetchRecipes,
  setLoading
})(SearchForm);
