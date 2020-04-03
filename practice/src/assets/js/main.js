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
    const btn = document.getElementById("wonderlust-btn");
    const el = document.getElementById("wonderlust");

    // add a class to #wonderlust
    function add() {
      el.classList.add("show");
    }
    // remove a class from #wonderlust
    function remove() {
      el.classList.remove("show");
    }
    // ,message
    function message() {
      return console.log("5秒たちました。")
    }

    function opacity() {
      const clickAgain = document.getElementById("clickAgain");
      clickAgain.style.opacity = 1;
    }

    function opacityZero() {
      clickAgain.style.opacity = 0;
    }

    function urge() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(opacity());
        }, 400);
      });
    }

    function wait() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(message())
        }, 5000);
      });
    }


    btn.addEventListener('click', function () {
      async function asyncFunc() {
        opacityZero()
        add();
        await wait();
        await urge();
        remove();
      }
      asyncFunc()
    });

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
      var rangeT_end = rangeT + 248;
      var rangeL = $(".section7").offset().left;

      var stalkerT = $(".stalker").offset().top;
      var stalkerL = $(".stalker").offset().left;

      if (stalkerT > rangeT && stalkerL > rangeL) {
        $('.stalker').css("opacity", "1");
      } else {
        $('.stalker').css("opacity", "0");
      }
      // $(window).scroll(function () {
      if (rangeT_end < stalkerT) {
        $('.stalker').css("opacity", "0");
      }
      // });

    });
  }
}




// clip-path----------------------------------------------

/**
 * clip-path
 */

class ClipPath {
  constructor() {
    this.init();
  }

  init() {

    $(".contCircle").on("mouseover", function () {
      $(this).removeClass("zIndex3");
      $(".contCircle").not(this).addClass("zIndex3");
      $(".contCircle").not(this).addClass("eventNone");
      var set = $(this);
      setTimeout(function () {
        $(".contCircle").removeClass("eventNone");
      }, 500);
    })

    $(".contCircle").on("mouseleave", function () {
      $(".contCircle").removeClass("zIndex1");

    })



  }
}



// scroll-curve----------------------------------------------

/**
 * scroll-curve
 */

class ScrollCurve {
  constructor() {
    this.init();
  }

  init() {

    var scroll = document.querySelector('.curve');
    scroll.addEventListener('scroll', function () {
      getTheScrollPosition();
    });

    function getTheScrollPosition() {
      var range = document.querySelector('.curve');
      var scrollTopRatio = range.scrollTop / (range.scrollHeight - range.clientHeight);

      /**
       * .scrollTop=elがscrollされた値
       * .scrollHeight=overflow:hiddenで表示されない領域を含む、elの高さの値
       * .clientHeight=elのheightとpaddingの合計の値
       *
       * scrollされた値をelの高さで割り、その値をscaleYへ代入
       */
      var img = document.querySelector('.curveImg');
      img.style.transform = 'scaleY(' + scrollTopRatio + ')';
      console.log(scrollTopRatio);
    }
  }
}






/**
 * 関数実行--------------------------------------------------------
 */
$(window).on('load', () => {
  new SvgTextAnimation();
  new stalker();
  new ClipPath();
  new ScrollCurve();
});





// 時間あるときに
// https://qiita.com/amamamaou/items/728d571d508347b2bc82
// element.scrollIntoView({
//   behavior: 'auto',
//   block: 'center',
//   inline: 'nearest',
// });
