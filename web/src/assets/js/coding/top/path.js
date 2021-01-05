export default class Path {
  constructor() {

  }
  init() {
    this.getLength(".js-path-length");
  }

  /**
   *if path length is changed, use below to confirm
   */
  getLength(el) {
    const path = document.querySelectorAll(el);
    /**
     * get the length of path
     */
    for (let i = 0; i < path.length; i++) {
      var lengthValue = path[i].getTotalLength();
      path[i].style.strokeDasharray = lengthValue;
      path[i].style.strokeDashoffset = lengthValue;
    }
  }
};
