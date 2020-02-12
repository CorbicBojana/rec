import React, { useState } from "react";
import { connect } from "react-redux";
import Autocomplete from "./components/Autocomplete";

import instance from "../../axios";

import { searchRecipe } from "../../actions/searchActions";

import Loading from "./components/Loading";
import RecipeContainer from "./components/RecipeContainer";

import PropTypes from "prop-types";

function LandingPage(props) {
  const [options, setOptions] = useState([]);

  const { loading } = props;

  const handleChange = e => {
    searchRecipe(e.target.value);

    const userInput = e.currentTarget.value;
    console.log(userInput);

    const fetchRecipes = () => {
      instance
        .get(`/search.php?s=${userInput}`)
        .then(response => setOptions(response.data.meals))
        .catch(err => console.log(err));
    };
    fetchRecipes();
  };

  const optionsRecipe = options.map((recipe, index) => (
    <div key={index}>{recipe.strMeal}</div>
  ));

  console.log(props);
  const [state, setState] = useState({
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ""
  });

  // Event fired when the input value is changed
  const onChange = e => {
    const { suggestions } = props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // Update the user input and reset the rest of the state
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  let suggestionsListComponent;

  const {
    showSuggestions,
    userInput,
    filteredSuggestions,
    activeSuggestion
  } = state;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul class="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div class="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }
  console.log(suggestionsListComponent);
  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands"
        ]}
        onChange={e => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
        suggestionsListComponent={suggestionsListComponent}
      />
      {loading ? <Loading /> : <RecipeContainer />}
    </>
  );
}

const mapStateToProps = state => ({
  loading: state.recipes.loading
});

Autocomplete.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};

Autocomplete.defaultProps = {
  suggestions: []
};

export default connect(mapStateToProps, searchRecipe)(LandingPage);
