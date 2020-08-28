export default {
  id: 28,
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
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  let quantity = 50;

  // 六角形の配列
  let hexArray = [];

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

      // スタイルの定義
      p.angleMode(p.DEGREES);
      p.stroke("green");
      p.strokeWeight(1);

      // Hexagon()によって出力された六角形の情報を、配列に格納
      for (let i = 0; i < quantity; i++) {
        hexArray.push(new Hexagon(i));
      }

    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {
      // スタイルをリセット
      p.background("#fff");

      // 六角形をそれぞれ描画
      hexArray.forEach(function (el) {
        el.draw();
        // el.update();
      });

    } // p.draw()

    // ------------------------------

    class Hexagon {
      constructor(n) {
        this.vertexNum = 6;
        this.s = 20;
        this.x, this.y, this.theta;
        this.num = n;
        this.pos = {
          x: 0,
          // 正六角形の高さを求める
          y: n * 2 * this.s * p.cos(30)
        }
      }

      draw() {

        // 六角形の作成
        p.push();
        p.fill('limegreen');
        p.beginShape();

        p.translate(this.pos.x, this.pos.y);
        // 360度を頂点の数で割り、三角関数で頂点の座標を求め、各頂点を線で結んでいくイメージ
        for (let i = 0; i < this.vertexNum; i++) {
          this.theta = i * 360 / this.vertexNum;
          this.x = this.s * p.cos(this.theta);
          this.y = this.s * p.sin(this.theta);
          p.vertex(this.x, this.y);
        }
        p.endShape(p.CLOSE);
        p.pop();
      } //draw()

    }


  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
