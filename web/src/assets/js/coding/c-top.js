import Vue from 'vue';
import Top from './vue/components/Top.vue';

new Vue({
  el: '#c-top',
  components: {
    'top': Top
  }

})


export default class C_top {
  constructor() {}

  init() {
    this.kvHeight();
    this.scrollDown(".js-scrollBtn");
    this.animSession();
    this.getLength(".js-path-length");
  }
  /**
   *stretch kv height to window height
   */
  kvHeight() {
    var changeHeight = function () {
      if ($(window).width() > 750) {
        var wH = $(window).height();
        $(".c-kv").css("height", wH);
      }
    }

    changeHeight();

    $(window).resize(function () {
      changeHeight();
    });
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


  /**
   * add sessionstorage func to opAnim
   */
  animSession() {
    var num = sessionStorage.getItem('anim');
    var w = $(window).width();
    /**
     * if value = null
     */
    if (w > 750 && num === null) {
      this.ttlArea();
    }
    /**
     * if value = else
     */
    else {
      /**
       * after kv is loaded, remove .first
       */
      // var header = document.querySelector(".c-kv");
      // imagesLoaded(header,
      //   // {background: true},
      //   () => {
      var first = document.querySelector(".js-first");
      var wrap = document.querySelector(".js-wrap");
      var ttl = document.querySelector(".js-ttl");
      var area = document.querySelector(".js-area");
      var letters = document.querySelectorAll(".js-letter");
      var rects = document.querySelectorAll(".js-rect");
      var bar = document.querySelector(".js-bar");
      first.classList.add("js-session-first");
      wrap.classList.add("js-session-wrap");
      ttl.classList.remove('js-ttl');
      area.classList.add("js-wideArea");
      for (var i = 0; i < letters.length; i++) {
        var el1 = letters[i];
        el1.classList.remove('js-letter');
      }
      var rect1 = rects[0]
      var rect2 = rects[1]
      rect1.classList.add("js-session-rect1")
      rect2.classList.add("js-session-rect2")

      bar.classList.add("js-session-bar");
      // });
    }
    /**
     * add 1 not to show opAnim from next loading
     */
    window.addEventListener('DOMContentLoaded', function () {
      num = 1;
      var value = num;
      sessionStorage.setItem('anim', value);
    });
  }
  /**
   *opAnim
   */
  ttlArea() {

    function scroll_control(event) {
      event.preventDefault();
    }

    /**
     * firstを表示
     */
    var showFirst = () => {
      $(".js-wrap").show();
      $(".js-ttl").show();
    }

    /**
     * prohibit scrolling
     */
    var noScroll = () => {
      // prohibit in PC
      document.addEventListener("mousewheel", scroll_control, {
        passive: false
      });
      // prohibit in SP
      document.addEventListener("touchmove", scroll_control, {
        passive: false
      });
    }
    /**
     * widen the width of title
     */
    var widen = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var area = document.querySelector(".js-area");
          area.classList.add("js-wideArea");
          resolve("promised");
        }, 800);

      });
    }

    /**
     * fall letters by one by
     */
    var jack = (num) => {
      return new Promise((resolve, reject) => {
        var letters = document.querySelectorAll(".js-letter");
        var el = letters[num];
        if (el === letters[0]) {
          setTimeout(() => {
            el.classList.add('js-jack');
          }, 500);
        } else {
          el.classList.add('js-jack');
        }
        // for (var i = 0; i < letters.length; i++) {
        //   var el = letters[i];
        //   el.classList.add('js-jack');
        // }

        if (el === letters[0] || el === letters[9]) {
          setTimeout(() => {
            resolve("promised");
          }, 500);
        } else {
          setTimeout(() => {
            resolve("promised");
          }, 100);
        }

      })
    }

    /**
     * fall the blue boxes
     */
    var fall = (num) => {
      return new Promise((resolve, reject) => {
        var rects = document.querySelectorAll(".js-rect");
        var el = rects[num];
        el.classList.add('js-fall');
        if (el === rects[0]) {
          resolve("promised");
        } else {
          setTimeout(() => {
            resolve("promised");
          }, 260);
        }

      })
    }

    /**
     * bounce the text
     */
    var bounce = () => {
      return new Promise((resolve, reject) => {
        var el = document.querySelector(".js-area");
        el.classList.add('js-bounce');
        resolve("promised");
      });
    }

    /**
     * bounce the light blue box
     */
    var rotate1 = () => {
      return new Promise((resolve, reject) => {
        var boxes = document.querySelectorAll(".js-box");
        var el = boxes[0];
        el.classList.add('js-rotate1');
        resolve("promised");
      })
    }

    /**
     * bounce the deep blue box
     */
    var rotate2 = () => {
      return new Promise((resolve, reject) => {
        var boxes = document.querySelectorAll(".js-box");
        var el = boxes[1];
        el.classList.add('js-rotate2');
        resolve("promised");
      })
    }

    /**
     * swing the vertical line
     */
    var swing = () => {
      return new Promise((resolve, reject) => {
        var bar = document.querySelector(".js-bar");
        bar.classList.add('js-swing');
        setTimeout(() => {
          resolve("promised");
        }, 1600);
      })
    }

    /**
     * remove the vertical line
     */
    var lean = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var bar = document.querySelector(".js-bar");
          bar.classList.add('js-lean');
          resolve("promised");
        }, 400);
      })
    }

    /**
     * remove .first
     */
    var vanish = () => {
      return new Promise((resolve, reject) => {
        var first = document.querySelector(".js-first");
        var wrap = document.querySelector(".js-wrap");
        first.classList.add('js-vanish');
        wrap.classList.add('js-smaller');
        resolve("promised");
      });
    }

    /**
     * accepting scrolling
     */
    var yesScroll = () => {
      // accepting in PC
      document.removeEventListener("mousewheel", scroll_control, {
        passive: false
      });
      // accepting in SP
      document.removeEventListener("touchmove", scroll_control, {
        passive: false
      });
    }

    /**
     * title animation done in order
     */
    var ttlAnimation = async () => {
      showFirst();
      noScroll();
      await widen();
      await jack(0);
      await jack(1);
      await jack(2);
      await jack(3);
      await jack(4);
      await jack(5);
      await jack(6);
      await jack(7);
      await jack(8);
      await jack(9);
      await fall(0);
      await bounce();
      await fall(1);
      await rotate1();
      await rotate2();
      await swing();
      await lean();
      await vanish();
      yesScroll();
    }
    ttlAnimation();
  }


  /**
   *if path length is changed, use below to confirm
   */
  getLength(el) {
    const path = document.querySelectorAll(el);
    /**
     * get the length of path
     */
    console.log(path);
    for (let i = 0; i < path.length; i++) {
      var lengthValue = path[i].getTotalLength();
      console.log(lengthValue);
      path[i].style.strokeDasharray = lengthValue;
      path[i].style.strokeDashoffset = lengthValue;
    }
  }



};


/**
 * import c-top----------------------------------------
 */

const c_top = new C_top();


/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  c_top.init();
})
