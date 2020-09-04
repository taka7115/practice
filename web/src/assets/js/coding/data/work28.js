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

  // 1列の描画される六角形の数(この数を調整することで全体の見た目を変えられる)
  let verticalNum = 25;
  // 横幅いっぱいに配置できる列の数
  let horizontalNum = cW / (cH / verticalNum);


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

      // 縦1列を横幅いっぱいになるまでループ
      for (let i = 0; i < horizontalNum + 1; i++) {
        // 六角形の情報を配列へ格納(縦1列の六角形)
        for (let j = 0; j < verticalNum + 1; j++) {
          hexArray.push(new Hexagon(i, j));
        }
      }

      // 六角形をそれぞれ描画
      hexArray.forEach(function (el) {
        el.draw();
      });

      console.log(hexArray)
    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {
      // スタイルをリセット
      // p.background("#fff");

      // 六角形をそれぞれ描画
      hexArray.forEach(function (el) {
        // el.update();
      });

    } // p.draw()

    // ------------------------------

    class Hexagon {
      constructor(row, num) {
        // 頂点の数(今回は6角形なので6つ)
        this.vertexNum = 6;
        // 六角形のperpendicular(垂線)の長さ
        this.p = p.height / verticalNum;
        // 六角形の1辺の長さ
        this.s = this.p / 2 / p.cos(30);

        this.x, this.y, this.theta;
        this.row = row;
        this.num = num;
        this.pos = {
          x: this.row * this.p,
          // 正六角形の高さを求める(六角形の順番×垂線の長さ)
          y: this.num * this.p
        }
      }

      draw() {

        // 六角形の作成
        p.push();
        p.fill('limegreen');
        p.beginShape();

        // 列が偶数の時、列の高さを六角形の高さの半分ズラす
        if (this.row % 2 == 0) {
          this.pos.y += this.p / 2
        }

        // 描画する座標へ移動
        p.translate(this.pos.x, this.pos.y);
        if (this.row == 1) {
          console.log(`x座標1は${this.pos.x}`)
          console.log(`垂線は${this.p}`)
        } else if (this.row == 2) {
          console.log(`x座標2は${this.pos.x}`)
        }


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
