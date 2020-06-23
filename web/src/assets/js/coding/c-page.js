import Vue from 'vue';
import Page from './vue/components/Page.vue';



new Vue({
  el: '#c-page',
  components: {
    'page': Page
  }
})

/**
 * change the height of .nz
 */
var scrollCurve = () => {
  if (window.innerWidth > 1200) {
    var anchor = document.querySelector('.nz');
    var footer = document.querySelector('.footer');
    var footerH = footer.clientHeight * 1.1;
    var anchorPosition = anchor.offsetTop + footerH;
    console.log(`距離は${anchor}`)

    window.addEventListener('scroll', () => {

      var wH = window.innerHeight;
      var y = window.pageYOffset + wH;
      var distanceFromAnchor = y - anchorPosition;
      var img = document.querySelector('.nz');
      var imgH = img.clientHeight;
      var ratio = distanceFromAnchor / imgH;
      if (distanceFromAnchor > 0 && ratio <= 1) {
        var img = document.querySelector('.nz');
        img.style.transform = 'scaleY(' + ratio + ')';
      }
    });
  }
}

/**
 * js for each works---------------
 */
var work01 = () => {

  //.areaの範囲でカーソルを動かしたときの処理
  var area = document.querySelector(".area");
  area.addEventListener("mousemove", (e) => {

    // .areaのサイズを取得
    var clientRect = area.getBoundingClientRect();

    // 画面上端からの距離を取得
    var areaTop = clientRect.top;

    // 画面左端からの距離を取得
    var areaLeft = clientRect.left;

    // カーソルの座標を取得
    var cursorTop = e.clientY;
    var cursorLeft = e.clientX;

    // カーソルから.areaの端までの距離を取得し、
    // その距離を.overlayのtopとleftに代入
    var distanceY = cursorTop - areaTop;
    var distanceX = cursorLeft - areaLeft;
    $('.overlay').css({
      "top": distanceY + 'px',
      "left": distanceX + 'px'
    });

  });
}


/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  scrollCurve();
  work01();
})

// window.on("load", () => {
// });
