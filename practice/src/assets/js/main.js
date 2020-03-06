/*import*/
import $ from 'jquery';
import Common from './modules/common';
// import Sample from './modules/Sample';

/*create instance*/
const common = new Common();
// const sample = new Sample({
//     name: 'world'
// });

/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  common.init();
})



// class仕様で円を左右に----------------------------------------------

/**
 * 円を左右に動かす
 */
class Transform {
  constructor(a, b) {
    this.trigger1 = a;
    this.trigger2 = b;
    this.reset = $('.btn-reset');
    this.content = $('.circle');
    this.init();
  }

  /**
   * 処理実行
   */
  init() {
    this.clickRight();
    this.clickLeft();
    this.clickReset();
  }

  /**
   * 右へボタンを押すと円が右に移動
   */
  clickRight() {
    this.trigger1.on('click', () => {
      this.content.removeClass('left');
      this.content.addClass('right');
    });
  }

  /**
   * 左へボタンを押すと円が左に移動
   */
  clickLeft() {
    this.trigger2.on('click', () => {
      this.content.removeClass('right');
      this.content.addClass('left');
    });

  }

  /**
   * リセットボタンを押すと円がリセット
   */
  clickReset() {
    this.reset.on('click', () => {
      this.content.removeClass('right');
      this.content.removeClass('left');
    });
  }
}

/**
 * 関数実行
 */
$(window).on('load', () => {
  new Transform($('.btn-right'), $('.btn-left'));
});


// マウスストーカー----------------------------------------------

/**
 * マウスストーカー
 */

class stalker {
  constructor() {
    this.init();
    this.range();
  }

  init() {
    /**
     * マウスストーカー用のdivを取得
     */

    //上記のdivタグをマウスに追従させる処理
    $(".section7").mousemove(function (e) {
      $('.stalker').css({
        "transform": 'translate(' + e.clientX + 'px ,' + e.clientY + 'px)'
      });
    });
  }

  /**
   * 円をsection7の上でしか表示させない
   */
  range() {
    $(window).mousemove(function () {
      var rangeT = $(".section7").offset().top;
      var rangeL = $(".section7").offset().left;

      var stalkerT = $(".stalker").offset().top;
      var stalkerL = $(".stalker").offset().left;
      if (stalkerT > rangeT && stalkerL > rangeL) {
        $('.stalker').css("opacity", "1");
      } else {
        $('.stalker').css("opacity", "0");
      }
    });
  }
}
/**
 * 関数実行
 */
$(window).on('load', () => {
  new stalker();
});



// ----------------------------------------------
