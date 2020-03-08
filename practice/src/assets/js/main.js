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
 * SVG animation
 */
class SvgTextAnimation {
  constructor() {
    this.init();
  }
  init() {
    this.getLength();
    this.animStart();
  }
  getLength() {
    const wonderlust = document.querySelectorAll("#wonderlust path");
    /**
     * get the length of path
     */
    console.log(wonderlust);

    for (let i = 0; i < wonderlust.length; i++) {
      console.log(wonderlust[i].getTotalLength());
    }
  }

  animStart() {
    $("#wonderlust-btn").on("click", function () {
      $("#wonderlust").addClass("anim-start");
    })
  }
}

/**
 * 関数実行
 */
$(window).on('load', () => {
  new SvgTextAnimation();
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
