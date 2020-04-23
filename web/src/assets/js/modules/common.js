export default class Common {
  constructor() {
    this.speed = 400;
  }
  init() {
    const self = this;
    $('a[href^="#"]').on('click', function () {
      self.pageScroll(this);
    });
  }
  pageScroll(el) {
    let self, href, target, position;
    href = $(el).attr("href");
    target = $(href == "#" || href == "" ? 'html' : href);
    position = target.offset().top;
    $("html, body").animate({
      scrollTop: position
    }, this.speed);
  }
  /**
   * サイドナビゲーションの表示
   */
  sideNavFadeOut() {
    $(window).on("scroll", function () {

      /**
       * fadeoutするアンカー一位置を取得
       */
      var anchor01 = $(".js-side-anchor01").offset().top;
      var anchor02 = $(".js-side-anchor02").offset().top;

      /**
       * スクロール位置 画面上
       */
      var scrollH = $(window).scrollTop();

      /**
       * 画面の高さを取得
       */
      var windowH = $(window).innerHeight();

      /**
       * スクロール位置 画面下
       */
      var scrollHBottom = scrollH + windowH;

      /**
       * 2つのアンカーの間だけサイドナビを表示
       */
      if (scrollH < anchor01) {
        $(".sideNav").fadeOut(400);
      } else if (scrollHBottom > anchor02) {
        $(".sideNav").fadeOut(400);
      } else {
        $(".sideNav").fadeIn(400);
      }
    });
  }
};
