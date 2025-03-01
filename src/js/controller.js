/////////

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import BookmarksView from './views/BookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import previewView from './views/previewView.js';
import 'core-js/stable'; //parcel
import 'regenerator-runtime/runtime'; //parcel
import { async } from 'regenerator-runtime';
//const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //update bookmarks view
    BookmarksView.update(model.state.bookmarks);
    //load reciepe
    await model.loadRecipe(id);
    //const { recipe } = model.state;
    //render reciepe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    //    console.error(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getquery();
    if (!query) return;
    //load results

    await model.loadSearchResults(query);
    //render results
    resultsView.render(model.getSearchResultsPage());
    //render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //render results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render pagination buttons
  paginationView.render(model.state.search);
};
const controlServing = function (newServings) {
  //update serving in the state
  model.updateServings(newServings);
  //update recipe view
  //  recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  BookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    BookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClicks(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
