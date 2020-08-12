export default {
  id: 25,
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

  // -------------------------------

  /**
   * インスタンスモードで記述
   */
  const sketch = (p) => {

    let colorImg, bwImg, area;

    /**
     * 画像の事前読み込み
     */
    p.preload = () => {
      colorImg = p.loadImage("../../../assets/img/coding/page/kv/umbrella_color.jpg");
      bwImg = p.loadImage("../../../assets/img/coding/page/kv/umbrella_bw.jpg");
    } //p.preload()

    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      let canvas = p.createCanvas(cW, cH);

      // 画像のサイズをキャンバスのサイズに合わせる
      colorImg.resize(cW, cH);
      bwImg.resize(cW, cH);
      p.image(colorImg, 0, 0);
      p.image(bwImg, 0, 0);

      // スタイルを定義
      p.noCursor();
      p.cursor("../../../assets/img/coding/page/kv/eraser.png");

    } //p.setup()

    // ------------------------------

    /**
     * ドラッグしたときに実行される処理
     */
    p.mouseDragged = () => {

      // pcのとき
      if (window.innerWidth > 750) {
        area = 90;
        // .copy(コピー対象, コピーの始点座標, コピーのx軸範囲, コピーのy軸範囲,
        // ペーストの始点座標, ペーストのx軸範囲, ペーストのy軸範囲)
        p.copy(colorImg, p.mouseX, p.mouseY, area, area, p.mouseX, p.mouseY, area, area);
        // spのとき
      } else {
        area = 30;
        p.copy(colorImg, p.mouseX - (area / 2), p.mouseY - (area / 2), area, area, p.mouseX - (area / 2), p.mouseY - (area / 2), area, area);
        return false;

      }
    }


  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
