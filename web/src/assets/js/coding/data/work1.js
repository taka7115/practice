export default {
  id: 1,
  ttl: '<a><span>カ</span>ーソル</a><a><span>タ</span>ッチ</a>周りのみ<br class="u-sp">オリジナルの画像を照らし出す',
  txt: "カーソル周りのみ<br>オリジナルの画像を<br>照らし出す",
  alt: "カーソル周りのみオリジナルの画像を照らし出す画像",
  p1: "ここにpointの1つ目が入ります。",
  p1_color: "js-orange",
  p1_list1: "<span data='dot'>&#9642;</span>ここにリストの1つ目が入ります",
  p1_list2: "<span data='dot'>&#9642;</span>ここにリストの2つ目が入ります",
  p2: 'ここにpointの2つ目が入ります。',
  p2_color: "js-blue",
  p2_list1: "<span data='dot'>&#9642;</span>ここにリストの1つ目が入ります",
  p2_list2: "<span data='dot'>&#9642;</span>ここにリストの2つ目が入ります",
  p3: 'ここにpointの3つ目が入ります。',
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>ここにリストの1つ目が入ります",
  p3_list2: "<span data='dot'>&#9642;</span>ここにリストの2つ目が入ります",
  func
}

/**
 * js--------------------------------------
 */

function func() {

  //.areaを変数化しておく
  var area = document.querySelector(".area");

  //mousemoveもしくはtouchmoveしたときの関数
  var action = (e) => {

    // .areaのサイズを取得
    var clientRect = area.getBoundingClientRect();

    // 画面上端から.areaまでの距離を取得
    var areaTop = clientRect.top;

    // 画面左端から.areaまでの距離を取得
    var areaLeft = clientRect.left;

    // カーソル、もしくはタッチした座標を取得
    if (window.innerWidth > 750) {
      var distanceTop = e.clientY;
      var distanceLeft = e.clientX;
    } else {
      var distanceTop = e.changedTouches[0].pageY;
      var distanceLeft = e.changedTouches[0].pageX;
    }


    // カーソル、もしくはタッチした座標から.areaの端までの距離を取得
    var distanceY = distanceTop - areaTop;
    var distanceX = distanceLeft - areaLeft;

    // その距離を.overlayのtopとleftに代入
    $('.overlay').css({
      "top": distanceY + 'px',
      "left": distanceX + 'px'
    });
  }


  // PCではmousemove、SPではtouchmoveしたときに関数実行
  if (window.innerWidth > 750) {
    area.addEventListener("mousemove", (e) => {
      action(e);
    });
  } else {
    area.addEventListener("touchmove", (e) => {
      action(e);
      // タッチによる画面スクロールを止める
      event.preventDefault();
    });
  }

}
