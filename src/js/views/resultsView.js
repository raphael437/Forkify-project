import view from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

/////
/*
import view from './view.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg'; //import icons
class ResultsView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found in your query!, please try again';
  _message = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
*/
