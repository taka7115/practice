/**
 * PC版
 * kvを画面高さいっぱいに表示
 */
export default class Coding {
  constructor() {
    this.init();
  }

  init() {
    this.kvHeight();
    this.ttlArea();
  }


  /**
   *kvを画面高さいっぱいにする
   */
  kvHeight() {
    var changeHeight = function () {
      if ($(window).width() > 750) {
        var windowH = $(window).height();
        $(".codingKv").css("height", windowH);
      }
    }
    changeHeight();
    $(window).resize(function () {
      changeHeight();
    });
  }

  /**
   *オープニングアニメーション
   */
  ttlArea() {

    function scroll_control(event) {
      event.preventDefault();
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
     * タイトル部分のwidthを広げる
     */
    var widen = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          document.querySelector(".js-area").setAttribute("style", "width:" + 820 / 1920 * 100 + "vw;");
          resolve("promised");
        }, 800);

      });
    }

    /**
     * 文字を一文字ずつ落とす
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
     * 青いboxを落とす
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
     * テキストを弾ませる
     */
    var bounce = () => {
      return new Promise((resolve, reject) => {
        var el = document.querySelector(".js-area");
        el.classList.add('js-bounce');
        resolve("promised");
      });
    }

    /**
     * 淡い青boxを弾ませる
     */
    var rotate01 = () => {
      return new Promise((resolve, reject) => {
        var boxes = document.querySelectorAll(".js-box");
        var el = boxes[0];
        el.classList.add('js-rotate01');
        resolve("promised");
      })
    }

    /**
     * 濃い青boxを弾ませる
     */
    var rotate02 = () => {
      return new Promise((resolve, reject) => {
        var boxes = document.querySelectorAll(".js-box");
        var el = boxes[1];
        el.classList.add('js-rotate02');
        resolve("promised");
      })
    }

    /**
     * 縦線を揺らす
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
     * 縦線を倒す
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
     * firstを消す
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
      resolve("promised");
    }


    /**
     * タイトルのアニメーションを順番に処理
     */
    var ttlAnimation = async () => {
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
      await rotate01();
      await rotate02();
      await swing();
      await lean();
      await vanish();
      yesScroll();
    }



    ttlAnimation();



  }



};
