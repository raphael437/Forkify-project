import view from './view.js';
import icons from 'url:../../img/icons.svg'; //import icons
import { fraction } from 'fractional';

class paginationView extends view {
  _parentEl = document.querySelector('.pagination');
  addHandlerClicks(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //page1 ,there are other pages
    if (curPage === 1 && numPages > 1) {
      return ` <button data-goto=${
        curPage + 1
      } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${curPage - 1}</span>
          </button>`;
    }
    //other pages
    if (curPage < numPages) {
      return `<button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${curPage - 1}</span>
          </button>
           <button data-goto=${
             curPage + 1
           } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }
    //page1 ,no other pages
    return ``;
  }
}
export default new paginationView();
