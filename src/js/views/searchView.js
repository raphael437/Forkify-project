class searchView {
  _parentEL = document.querySelector('.search');
  getquery() {
    const query = this._parentEL.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEL.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
