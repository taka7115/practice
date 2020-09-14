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
  let verticalNum = 18;

  // 頂点の数(今回は6角形なので6つ)
  var vertexNum = 6;

  // 六角形のperpendicular(垂線)の長さ
  var per = cH / verticalNum;

  // 六角形の1辺の長さ
  var s = per / 2 / Math.cos(Math.PI / 6);

  // 横幅いっぱいに配置できる列の数
  let horizontalNum = cW / (per / 2 + s / 2);

  // 六角形の配列
  let hexArray = [];

  // 六角形のfillの配色
  let fillArray = ["#f5ae01", "#fcd923", "#ff7a00", "#ffeb00"];

  // 六角形のstrokeの配色
  let strokeArray = ["#a87700 "];


  // -------------------------------

  /**
   * インスタンスモードで記述
   */
  const sketch = (p) => {


    /**
     * 画像の事前読み込み
     */
    let bgImg
    p.preload = () => {
      bgImg = p.loadImage("../../../assets/img/coding/page/kv/dubrovnik.jpg");
    } //p.preload()


    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      let canvas = p.createCanvas(cW, cH);

      // 画像のサイズをキャンバスのサイズに合わせる
      bgImg.resize(cW, cH);
      p.background(bgImg, 0, 0);

      // スタイルの定義
      p.angleMode(p.DEGREES);

      // 縦1列を横幅いっぱいになるまでループ
      for (let i = 0; i < horizontalNum + 1; i++) {
        // 六角形の情報を配列へ格納(縦1列の六角形)
        for (let j = 0; j < verticalNum + 1; j++) {
          hexArray.push(new Hexagon(i, j));
        }
      }

      // 六角形をそれぞれ描画
      hexArray.forEach(function (el) {
        el.setup();
      });

      console.log(hexArray)
    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

      // スタイルをリセット
      p.image(bgImg, 0, 0);

      // 落ちる六角形が、落ちない六角形の上を、
      // 落ちるように、描画される順番を調整

      // 落ちない六角形を描画
      hexArray.forEach(function (el) {
        if (el.fallState == false) {
          el.draw();
        }
      });
      // 落ちる六角形を描画
      hexArray.forEach(function (el) {
        if (el.fallState == true) {
          el.draw();
        }
      });

      /**
       * クリックしたら実行される処理
       */
      p.mouseClicked = () => {
        // 六角形をそれぞれ描画
        hexArray.forEach(function (el) {
          el.fall();
        });
        // デバイスのデフォルト挙動防止
        return false
      } // p.mouseClicked()

      /**
       * ドラッグしたら実行される処理
       * 
       */
      p.mouseDragged = () => {
        // 六角形をそれぞれ描画
        hexArray.forEach(function (el) {
          el.fall();
        });
        // デバイスのデフォルト挙動防止
        return false
      } // p.mouseDragged()

    } // p.draw()


    // ------------------------------




    // ------------------------------

    /**
     * クラスの定義
     */
    class Hexagon {
      constructor(row, num) {
        // 頂点の数(今回は6角形なので6つ)
        this.vertexNum = vertexNum;
        // 六角形のperpendicular(垂線)の長さ
        this.per = per;
        // 六角形の1辺の長さ
        this.s = s;
        // 六角形の列ごとに座標をズラす値
        this.move = {
          x: s / 2 * 3,
          y: per / 2
        }
        // 六角形を落とすかの真偽
        this.fallState = false;

        this.x, this.y, this.theta;
        this.row = row;
        this.num = num;

        // 六角形の座標を定義
        this.pos = {
          x: this.row * this.move.x,
          y: this.num * this.per
        }

        this.fill = fillArray[Math.floor(p.random(0, fillArray.length))];
        this.stroke = strokeArray[Math.floor(p.random(0, strokeArray.length))];

        // 列が偶数の時、列の高さを六角形の高さの半分ズラす
        if (this.row % 2 == 0) {
          this.pos.y = this.pos.y + this.move.y;
        }

      } //constructor(row, num) 

      /**
       * 六角形の描画
       */
      setup() {

        p.push();
        p.fill(this.fill);
        p.stroke(this.stroke);
        p.beginShape();

        // 描画する座標へ移動
        p.translate(this.pos.x, this.pos.y);

        // createHex関数
        this.createHex()

        p.endShape(p.CLOSE);
        p.pop();
      } //setup()

      /**
       * 六角形の描画
       */
      draw() {

        p.push();
        p.fill(this.fill);
        p.stroke(this.stroke);
        p.beginShape();

        if (this.fallState == true) {
          // クリックされてfallStateがtrueになったら、y座標を下にズラしていく
          this.pos.y += 10;
        }

        // 描画する座標へ移動
        p.translate(this.pos.x, this.pos.y);

        // createHex関数
        this.createHex()

        p.endShape(p.CLOSE);
        p.pop();
      } //draw()

      // 360度を頂点の数で割り、三角関数で頂点の座標を求め、各頂点を線で結んでいくイメージ
      createHex() {
        for (let i = 0; i < this.vertexNum; i++) {
          this.theta = i * 360 / this.vertexNum;
          this.x = this.s * p.cos(this.theta);
          this.y = this.s * p.sin(this.theta);
          p.vertex(this.x, this.y);
        }
      }

      // 六角形の移動
      fall() {
        if (this.pos.x - this.per / 2 < p.mouseX && this.pos.x + this.per / 2 > p.mouseX) {
          if (this.pos.y - this.per / 2 < p.mouseY && this.pos.y + this.per / 2 > p.mouseY) {
            this.fallState = true;
          }
        }
      } //fall()

    } //class Hexagon


  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
