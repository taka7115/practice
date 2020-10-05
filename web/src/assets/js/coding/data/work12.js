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

  // sectionの配列
  var secArray = [];

  // ナビゲーションのリンクを取得
  var secList = document.querySelectorAll(".js-target");

  var navList = document.querySelectorAll(".js-list");

  // 特徴ページ。スクロール量によってコンテンツナビゲーションのアンダーラインの位置を変える
  var addLine = () => {



    for (var i = 0; i < secList.length; i++) {
      // コンテンツのIDを取得
      var target = secList[i];
      console.log(target);


      // ページ上部からコンテンツの開始位置までの距離を取得
      var secTop = target.offsetTop;
      console.log(`コンテンツ開始位置までの距離：${secTop}`)
      // ページ上部からコンテンツの終了位置までの距離を取得
      var secBottom = secTop + target.clientHeight - 1;
      console.log(`コンテンツ終了位置までの距離：${secTop}`)
      // 配列に格納
      secArray[i] = [secTop, secBottom]
    };

    console.log(`配列：${secArray}`)

  } //addLine()



  // 現在地をチェックする
  var currentCheck = () => {

    // スクロールする要素の取得
    var base = document.querySelector(".wrapper");

    // 現在のスクロール位置を取得
    var scrollVolume = base.scrollTop;



    for (var i = 0; i < secArray.length; i++) {
      // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
      if (secArray[i][0] <= scrollVolume && secArray[i][1] >= scrollVolume) {
        //  && secArray[i][1] >= scrollVolume
        // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
        i == secArray.length;
        navList[i].classList.add('underline');
      } else {
        navList[i].classList.remove('underline');
      }
    };
  } //currentCheck

  window.addEventListener("load", () => {
    addLine();
  })

  // スクロール時に、現在地をチェックする
  document.querySelector(".wrapper").addEventListener("scroll", () => {
    currentCheck();
  });





  // const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
  // for (let i = 0; i < smoothScrollTrigger.length; i++) {
  //   smoothScrollTrigger[i].addEventListener('click', (e) => {
  //     e.preventDefault();
  //     let href = smoothScrollTrigger[i].getAttribute('href');
  //     let targetElement = document.getElementById(href.replace('#', ''));
  //     let area = document.querySelector(".cont");
  //     const rect = targetElement.getBoundingClientRect().top;
  //     const offset = window.pageYOffset;
  //     const gap = 60;
  //     const target = rect + offset - gap;
  //     area.scrollTo({
  //       top: target,
  //       behavior: 'smooth',
  //     });
  //   });
  // }




}
