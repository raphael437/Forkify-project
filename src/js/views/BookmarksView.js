import view from './view.js';
import icons from 'url:../../img/icons.svg'; //import icons
import previewView from './previewView.js';
class BookmarksView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet, please find a recipe and bookmark it';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
