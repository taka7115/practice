export default {
  id: 26,
  ttl: "<span>C</span>anvasで<br class='u-sp'>【HTML5】",
  txt: "Canvasで<br><br>【HTML5】",
  alt: "Canvasで",
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
  let triArray = [];

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

      //キャンバスにclassを付与
      canvas.class('p5Canvas');


      // スタイルを定義
      p.noStroke();
      p.fill(255, 255, 255);

      // Triangle()によって出力された粒子の情報を、配列に格納
      for (let i = 0; i < quantity; i++) {
        triArray.push(new Triangle());
      }

    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

      // 粒子をそれぞれ描画
      triArray.forEach(function (el) {
        // el.update();
        el.draw();
      });

    } // p.draw()

    // ------------------------------

    /**
     * クラスの定義
     */
    class Triangle {
      constructor() {

        // 大きさ
        this.r = p.random(10, 24);

        // 頂点A
        this.posA = p.createVector(p.random(p.width), p.random(p.height));

        // 頂点B
        this.posB = p.createVector(this.posA.x + this.r, this.posA.y);

        // 頂点Cのy座標を求めるための計算
        this.disY = Math.sqrt(3) / 2 * this.r;

        // 頂点C
        this.posC = p.createVector(this.posA.x + (this.r / 2), this.posA.y - this.disY);

        // // 速さ
        // this.v = p.createVector(p.random(-1, 1), p.random(-1, 1));
      }

      // // 粒子の移動操作関数
      // update() {
      //   this.pos.add(this.v);
      // } // update()

      // 描画関数
      draw() {

        // 粒子の色
        p.fill(0, 0, 0);

        // 粒子描画
        p.triangle(this.posA.x, this.posA.y, this.posB.x, this.posB.y, this.posC.x, this.posC.y);

      } // draw()



    } // class Triangle

    // ---------------------------------------------------

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
