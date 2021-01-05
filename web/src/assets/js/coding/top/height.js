export default class Height {
  constructor() {
  }
  init() {
    this.changeHeight();
    window.addEventListener("resize", () => {
      this.changeHeight();
    });

  }


  /**
   *stretch kv height to window height
   */
  changeHeight() {
    if (window.innerWidth > 750) {
      var wH = window.innerHeight;
      document.querySelector(".c-kv").style.height = `${wH}px`;
    };
  }
};
