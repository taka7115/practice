export default {
  id: 27,
  ttl: "<span>T</span>weenMaxとTimelineMaxによる、<br class='u-pc'>印象強いテキスト<br class='u-sp'>アニメーション【GSAP】",
  txt: "TweenMaxと<br>TimelineMaxによる、<br>印象強いテキストアニメーション【GSAP】",
  alt: "TweenMaxとTimelineMaxによる、印象強いテキストアニメーション【GSAP】",
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

//  インポート
import gsap from "gsap";
import {
  TweenMax,
  TimelineMax,
} from 'gsap/all';

function func() {

  // 変数化
  var p = document.querySelector(".dokka_n");
  var txt = p.querySelectorAll("svg");
  var d = txt[0];
  var t = txt[1];
  var k = txt[2];
  var _ = txt[3];
  var n = txt[4];
  var s = txt[5];
  var ss = txt[6];
  var b = document.querySelector(".redo");

  // アニメーション前のスタイルの定義
  var setting = () => {

    if (window.innerWidth > 750) {

      // テキストの透明度を0に
      TweenMax.set(txt, {
        opacity: 0
      })

      // "ド"を少し小さく配置
      TweenMax.set(d, {
        scale: .5,
      })
      // "ッ"をかなり小さく配置
      TweenMax.set(t, {
        scale: .1,
        rotation: 10,
      })
      // "カ"を少し回転させて配置
      TweenMax.set(k, {
        y: -20,
        rotation: 270,
      })
      // "ー"の幅を狭く配置
      TweenMax.set(_, {
        y: -25,
        rotation: -8,
        scaleX: .2
      })
      // "ン"を少し右に配置
      TweenMax.set(n, {
        y: -50,
        x: 30,
      })
      // 1つ目の"!"を少し上に配置
      TweenMax.set(s, {
        y: -180,
      })
      // 2つ目の"!"を少し上に配置
      TweenMax.set(ss, {
        y: -180,
      })
      // ボタンの透明度を0に&少し下に配置
      TweenMax.set(b, {
        opacity: 0,
        y: 10,
      })
    } else {
      // テキストの透明度を0に
      TweenMax.set(txt, {
        opacity: 0
      })

      // "ド"を少し小さく配置
      TweenMax.set(d, {
        scale: .5,
      })
      // "ッ"をかなり小さく配置
      TweenMax.set(t, {
        scale: .1,
        rotation: 10,
      })
      // "カ"を少し回転させて配置
      TweenMax.set(k, {
        y: -10,
        rotation: 270,
      })
      // "ー"の幅を狭く配置
      TweenMax.set(_, {
        y: -12,
        rotation: -7,
        scaleX: .2
      })
      // "ン"を少し右に配置
      TweenMax.set(n, {
        y: -25,
        x: 30,
      })
      // 1つ目の"!"を少し上に配置
      TweenMax.set(s, {
        y: -90,
      })
      // 2つ目の"!"を少し上に配置
      TweenMax.set(ss, {
        y: -90,
      })
      // ボタンの透明度を0に&少し下に配置
      TweenMax.set(b, {
        opacity: 0,
        y: 5,
      })
    }

  } //setting()

  // アニメーション関数
  var ani = () => {

    // インスタンス作成
    var tm = new TimelineMax();

    if (window.innerWidth > 750) {

      // ド
      tm.to(d, .3, {
        opacity: 1,
        scale: 1,
        ease: "back.out(120)",
      }) // ド

      // ッ
      tm.to(t, .3, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: "elastic.out(20)",
      }) // ッ

      // カ
      tm.to(k, .4, {
        opacity: 1,
        rotation: 0,
        ease: "elastic.out(10)",
      }) // カ

      // ー
      tm.to(_, 1, {
        opacity: 1,
        scaleX: 1,
        ease: "back.out(50)",
      }) // ー

      // ン
      tm.to(n, .3, {
        opacity: 1,
        y: -45,
        x: 0,
      }) // ン

      // 1つ目の!
      tm.to(s, .3, {
        opacity: 1,
        y: -60,
        ease: "elastic.out(1, 0.3)"
      }) // 1つ目の!

      // 2つ目の!
      tm.to(ss, .3, {
        opacity: 1,
        y: -65,
        ease: "elastic.out(1, 0.3)",
        // コールバック関数実行
        onComplete: btnShow
      }) // 2つ目の!

    } else {

      // ド
      tm.to(d, .3, {
        opacity: 1,
        scale: 1,
        ease: "back.out(180)",
      }) // ド

      // ッ
      tm.to(t, .3, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: "elastic.out(20)",
      }) // ッ

      // カ
      tm.to(k, .4, {
        opacity: 1,
        rotation: 0,
        ease: "elastic.out(10)",
      }) // カ

      // ー
      tm.to(_, 1, {
        opacity: 1,
        scaleX: 1,
        ease: "back.out(50)",
      }) // ー

      // ン
      tm.to(n, .3, {
        opacity: 1,
        y: -22,
        x: 0,
      }) // ン

      // 1つ目の!
      tm.to(s, .3, {
        opacity: 1,
        y: -30,
        ease: "elastic.out(1, 0.3)"
      }) // 1つ目の!

      // 2つ目の!
      tm.to(ss, .3, {
        opacity: 1,
        y: -32,
        ease: "elastic.out(1, 0.3)",
        // コールバック関数実行
        onComplete: btnShow
      }) // 2つ目の!

    }

  } //ani()

  // 2つ目の"!"のアニメーション終了後、ボタンを表示
  var btnShow = () => {
    TweenMax.to(b, .5, {
      opacity: 1,
      y: 0,
      delay: .5
    })
  }

  /*mountedのタイミングで実行*/
  document.addEventListener('DOMContentLoaded', () => {
    setting();
  })

  /*createdのタイミングで実行*/
  window.onload = ani;

  // ボタンを押したらアニメーション再実行
  b.addEventListener("click", () => {
    setting();
    ani();
  });

}
