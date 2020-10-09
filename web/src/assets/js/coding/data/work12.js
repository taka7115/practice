export default {
  id: 12,
  ttl: "<span></span><br class='u-sp'>",
  txt: "10作品目の情報が入ります。",
  alt: "10作品目の情報が入ります。",
  p1: "",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>",
  p1_list2: "<span data='dot'>&#9642;</span>",
  p2: "",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>",
  p2_list2: "<span data='dot'>&#9642;</span>",
  p3: "",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>",
  p3_list2: "<span data='dot'>&#9642;</span>",
  func
}


/**
 * js--------------------------------------
 */


function func() {

  // sectionそれぞれの位置の配列
  var secArray = [];

  // section要素を取得
  var secList = document.querySelectorAll(".js-target");

  // ナビゲーションリンク要素を取得
  var navList = document.querySelectorAll(".js-list");

  // スクロールする要素の取得 ※画面スクロールの場合、
  // 変数baseに格納される要素をwindowにする
  var base = document.querySelector(".wrapper");

  // sectionそれぞれの位置を配列に格納する関数
  var checkSecPos = () => {
    for (var i = 0; i < secList.length; i++) {
      // section要素
      var target = secList[i];
      // ページ上部からsection要素上までの距離を取得
      var secTop = target.offsetTop;
      // 要素下までの距離を取得 ※他sectionと被らないように-1
      var secBottom = secTop + target.clientHeight - 1;
      // 配列に格納
      secArray[i] = [secTop, secBottom]
    };

  } //checkSecPos()

  // スクロール量とsectionの位置を比較して、
  // underlineクラスの付与を操作する関数
  var scrollCheck = () => {

    // 現在のスクロール位置を取得
    var scrollPos = base.scrollTop;

    for (var i = 0; i < secArray.length; i++) {
      // 現在のスクロール位置が、どのsectionにあるかを調べる
      if (secArray[i][0] <= scrollPos && secArray[i][1] >= scrollPos) {

        //調べたsectionに該当するリンク要素にunderline付与。それ以外では削除
        i == secArray.length;
        navList[i].classList.add('underline');
      } else {
        navList[i].classList.remove('underline');
      }
    };
  } //scrollCheck

  // createdのタイミングでcheckSecPos()関数実行
  window.addEventListener("load", () => {
    checkSecPos();
  })

  // スクロール毎にscrollCheck()関数実行
  base.addEventListener("scroll", () => {
    scrollCheck();
  });

}
