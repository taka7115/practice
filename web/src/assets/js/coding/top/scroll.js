export default class Scroll {
  constructor() {

  }
  init() {

    this.scrollDown(".js-scrollBtn");

  }

  scrollDown(el) {
    var main = document.querySelector(".c-main");
    var mainH = main.offsetTop;
    var scrollBtn = document.querySelector(el);
    scrollBtn.addEventListener("click", () => {
      window.scroll({
        top: mainH,
        behavior: "smooth"
      });
    });
  }

};
