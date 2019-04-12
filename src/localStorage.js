const localStorage = {
  store: window.localStorage,
  getItem(...args) {
    return window.localStorage.getItem(...args);
  },
  setItem(...args) {
    return window.localStorage.setItem(...args);
  }
}
export default localStorage;
