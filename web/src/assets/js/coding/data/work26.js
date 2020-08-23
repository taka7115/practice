export default {
  id: 26,
  ttl: "<span>p</span>5.jsを使って、回転&拡大する三角形を<br class='u-pc'>浮遊させてみた【p5.js ③】",
  txt: "p5.jsを使って、<br>回転&拡大する三角形を<br>浮遊させてみた<br>【p5.js ③】",
  alt: "p5.jsを使って、回転&拡大する三角形を浮遊させてみた【p5.js ③】",
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
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // 三角形の数(canvasサイズに合わせて数を調整)
  let quantity = Math.floor(window.innerWidth / 5);

  //三角形の色の配列
  let colorArray = ["#D90D43", "#1A1E26", "#F2C12E", "#F27507", "#BF9A84"];

  // 三角形の大きさの範囲
  let size = {
    min: 2,
    max: 8
  }

  // 三角形の最大拡大値
  let scaleMax = 3;

  // 三角形の情報を格納する配列
  let triArray = [];


  // ------------------------------------------------------------------

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

      // スタイルを定義
      p.noStroke();
      p.angleMode(p.degree)

      // Triangle()によって出力された三角形の情報を、配列に格納
      for (let i = 0; i < quantity; i++) {
        triArray.push(new Triangle());
      }

    } //p.setup()

    // ------------------------------------------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

      // スタイルをリセット
      p.background("#b3ffff");

      // 三角形をそれぞれ描画
      triArray.forEach(function (el) {
        el.draw();
        el.update();
      });

    } // p.draw()

    // ------------------------------------------------------------------

    /**
     * クラスの定義
     */
    class Triangle {
      constructor() {

        // 三角形の1辺の長さ
        this.s = p.random(size.min, size.max);

        // 三角形の色をランダムで配色
        this.c = colorArray[Math.floor(p.random(0, colorArray.length))];

        // 三角形の初期回転値
        this.d = Math.floor(p.random(0, 360));

        // 三角形の初期拡大値
        this.scale = 1;

        // 三角形を描画する座標
        this.coodinate = p.createVector(p.random(p.width), p.random(p.height));

        // 三角形の垂線を求める計算
        this.disY = Math.sqrt(3) / 2 * this.s;

        // 頂点Aの座標
        this.posA = {
          x: 0,
          y: 0 - this.disY / 2
        }

        // 頂点B(左下)
        this.posB = p.createVector(this.posA.x - this.s / 2, this.posA.y + this.disY);

        // 頂点C(右下)
        this.posC = p.createVector(this.posA.x + this.s / 2, this.posA.y + this.disY);

        // 移動速度
        this.v = p.createVector(p.random(-1, 1), p.random(-1, 1));

      } // constructor() 

      // 描画関数
      draw() {

        // 三角形の色
        p.fill(this.c);

        // 三角形の位置と回転を調整する関数の実行
        this.posAndRotate();

      } // draw()

      // 更新関数
      update() {

        // 三角形を回転
        this.d += 0.01;

        // 三角形を拡大
        if (this.scale < scaleMax) {
          this.scale += 0.01;
        }

        // 三角形を直線移動
        this.coodinate.x += this.v.x;
        this.coodinate.y += this.v.y;

        // キャンバス外に描画された三角形を、サイズ縮小&中心点で復活させる関数の実行
        this.revival();

      } // update()

      posAndRotate() {
        // 三角形の位置と回転を調整
        p.push();
        p.translate(this.coodinate.x, this.coodinate.y);
        p.rotate(this.d);
        p.scale(this.scale);
        p.triangle(this.posA.x, this.posA.y, this.posB.x, this.posB.y, this.posC.x, this.posC.y);
        p.pop();
      } //posAndRotate() 

      // キャンバス外に描画された三角形を、サイズ縮小&中心点で復活させる
      revival() {

        // (キャンバス左端-三角形の最大サイズ)より左に、もしくは
        // (キャンバス右端+三角形の最大サイズ)より右に、
        // 三角形が描画されたら、サイズ縮小&中央に
        if (this.coodinate.x < 0 - size.max * scaleMax || this.coodinate.x > p.width + size.max * scaleMax) {
          this.coodinate.x = p.width / 2;
          this.coodinate.y = p.height / 2;
          this.scale = 1;
        }

        // (キャンバス上端-三角形の最大サイズ)より上に、もしくは
        // (キャンバス下端+三角形の最大サイズ)より下に、
        // 三角形が描画されたら、サイズ縮小&中央に
        if (this.coodinate.y < 0 - size.max * scaleMax || this.coodinate.y > p.height + size.max * scaleMax) {
          this.coodinate.x = p.width / 2;
          this.coodinate.y = p.height / 2;
          this.scale = 1;
        }

      } //revival() 

    } // class Triangle

    // ---------------------------------------------------

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
