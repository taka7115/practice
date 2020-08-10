export default {
  id: 22,
  ttl: "<span>p</span>5.jsを使って<br class='u-sp'>キラキラ光るパーティクルを<br>描画してみた【p5.js ①】",
  txt: "p5.jsを使って<br>キラキラ光るパーティ<br class='u-sp'>クルを描画してみた<br>【p5.js ①】",
  alt: "p5.jsを使ってキラキラ光るパーティクルを描画してみた【p5.js ①】",
  p1: "<br class='u-sp'>初めてのp5.js",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>これまで基本的なHTML5のCanvasを使用してパーティクルやサインウェーブを描画してきましたが、今回からはライブラリーを使って、本格的にクリエイティブコーディングをしていこうと思います。",
  p1_list2: "<span data='dot'>&#9642;</span>数あるCanvasライブラリーからp5.jsを選んだ理由。それは日本語でのtutorialが豊富である点。ドットインストールさんには大変お世話になりました。<br><br><a href='https://dotinstall.com/lessons/basic_p5js' target='_blank'>ドットインストール p5.js入門 (全14回)</a><br><br><a href='https://dotinstall.com/lessons/basic_p5js' target='_blank'>p5.jsの公式サイト</a>もデモが充実。ドットインストールで使用方法を学習したあと、公式サイトで理解を深める、という学習フローがオススメです。",
  p2: "set()とdraw()。<br class='u-sp'>2つの関数",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>この2つの関数が肝です。setup()は最初に1回だけ実行される関数。draw()は繰り返し実行される関数。",
  p2_list2: "<span data='dot'>&#9642;</span>例えば今回、setup()関数では、キャンバスサイズの指定やクラスの付与、配列への情報格納など、アニメーション(繰り返し描画)する前の、キャンバスの初期設定を定義しています。逆にdraw()関数は、描画内容のリセットやパーティクルの座標変更など、アニメーションに必要な定義となっています。",
  p3: "<br class='u-sp'>パーティクルの描画方法",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>今回のパーティクルの描画方法に関しては、<a href='./page4.html' target='_blank'>独学で勉強してみた③</a>を参考に描画しています。詳しくはそちらの解説をご確認ください。",
  func
}



/**
 * js--------------------------------------
 */



function func() {

  // p5.jsをnode moduleから読み込み
  // 今回p5.jsのjsファイルのみ、npm&gulpによりコンパイルしています。コンパイルしない開発環境の場合、CDNや単一ファイルを読み込んでください。
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // 粒子の数(canvasサイズをもとに調整)
  let quantity = Math.floor(window.innerWidth / 10);

  // 粒子情報の配列
  let ptcArray = [];

  // -------------------------------

  /**
   * インスタンスモードで記述
   */
  const sketch = (p) => {

    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      let canvas = p.createCanvas(cW, cH);

      //キャンバスにclassを付与 ※今回は付与しただけ。cssは未設定。無視ください。
      canvas.class('p5Canvas');

      // スタイルを指定
      p.noStroke();

      // Particle()によって出力された粒子の情報を、配列に格納
      for (let i = 0; i < quantity; i++) {
        ptcArray.push(new Particle());
      }

    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

      // スタイルをリセット
      p.background('rgb(237, 255, 194)');

      // 粒子をそれぞれ描画
      ptcArray.forEach(function (el, index) {
        el.update();
        el.draw();
      });

    } // p.draw()

    // ------------------------------

    /**
     * クラスの定義
     */
    class Particle {
      constructor() {
        // 座標
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        // 大きさ
        this.r = p.random(5, 25);
        // 速さ
        this.v = p.createVector(p.random(-2, 2), p.random(-2, 2));
      }

      // 粒子の移動操作関数
      update() {
        this.pos.add(this.v);
        this.reflection();
      }

      // 描画関数
      draw() {
        // 粒子の色を明るい緑に配色
        let g = p.random(127, 255);
        let r = p.random(g);
        let b = p.random(b);
        p.fill(r, g, b);

        // 粒子描画
        p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
      }

      // 粒子反射関数
      reflection() {
        if (this.pos.x < 0 || this.pos.x > p.width) {
          this.v.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > p.height) {
          this.v.y *= -1;
        }
      }

    } // class Particle

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
