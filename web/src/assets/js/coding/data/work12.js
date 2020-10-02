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
  alert("ok");

  // 特徴ページ。スクロール量によってコンテンツナビゲーションのアンダーラインの位置を変える
  var addLine = () => {

    // ナビゲーションのリンクを指定
    var navList = document.querySelectorAll(".nav-list");

    // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
    var sectionArr = [];

    for (var i = 0; i < navList.length; i++) {
      // コンテンツのIDを取得
      var targetContents = navList[i].find("a").getAttribute("href");
      // ページ内リンクでないナビゲーションが含まれている場合は除外する
      if (targetContents.charAt(0) == "#") {

        // ページ上部からコンテンツの開始位置までの距離を取得
        var targetContentsTop = targetContents.offsetTop;
        // ページ上部からコンテンツの終了位置までの距離を取得
        var targetContentsBottom = targetContentsTop + targetContents.clientHeight - 1;
        // 配列に格納
        sectionArr[i] = [targetContentsTop, targetContentsBottom]
      }
    };

    // 現在地をチェックする
    var currentCheck = () => {
      // 現在のスクロール位置を取得
      var wS = document.documentElement.scrollTop || document.body.scrollTop;
      // 画面の高さを取得
      var wH = window.clientHeight;
      // 現在のスクロール位置を画面中央に指定
      var windowScrolltop = wS + (wH / 2);

      for (var i = 0; i < sectionArr.length; i++) {
        // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
        if (sectionArr[i][0] <= windowScrolltop) {
          //  && sectionArr[i][1] >= windowScrolltop
          // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
          navList.classList.remove('underline');
          navList[i].classList.add('underline');
          i == sectionArr.length;
        }
      };
    }

    // スクロール時に、現在地をチェックする
    document.querySelector(".wrapper").addEventListener("scroll", () => {
      console.log("ok");
      currentCheck();
    });

  } //	fNavUnderLine()

  window.addEventListener("load", () => {
    addLine();
  })


  const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
  for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener('click', (e) => {
      e.preventDefault();
      let href = smoothScrollTrigger[i].getAttribute('href');
      let targetElement = document.getElementById(href.replace('#', ''));
      let area = document.querySelector(".cont");
      const rect = targetElement.getBoundingClientRect().top;
      const offset = window.pageYOffset;
      const gap = 60;
      const target = rect + offset - gap;
      area.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    });
  }

  smoothScrollTrigger();



}
