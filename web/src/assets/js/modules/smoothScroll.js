  /**
   * ライブラリ/smooth-scroll
   * https://github.com/cferdinandi/smooth-scroll
   */
  import SmoothScroll from 'smooth-scroll';

  class SScroll {
    constructor() {

    }

    init() {

      /**
       * ターゲットとなる要素
       */
      const targetElement = 'a[href*="#"]';

      /**
       * オプション
       */
      const option = {
        speed: 1000,
        easing: 'easeInOutCubic',
        speedAsDuration: true,
        //header: '.l-header' 固定ヘッダーの場合
      }

      new SmoothScroll(targetElement, option);

    }

  }

  export default SScroll;
