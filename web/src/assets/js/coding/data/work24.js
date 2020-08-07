export default {
  id: 24,
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
  p3: "画像読み込み中に表示される要素を指定する",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>p5.jsのpreload()を使用するとデフォルトでloadingというテキストがでてしまう。HTMLにp5_loadingという指定のidを付与すると、付与された要素がloading中に表示される要素となる。今回は空divにIDを付与して、loadingというテキストを非表示にする。",
  p3_list2: "<span data='dot'>&#9642;</span>preload()関数では、loadImage(画像)、loadJSON(JSONデータ)、loadFont(フォント)、などなど。<br><br>詳しくは<a href='https://p5js.org/reference/' target='_blank'>p5.jsの公式リファレンス</a>を確認。",
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

  // 情報を変数化
  var img;
  var size, dotNum;

  // -------------------------------

  /**
   * インスタンスモードで記述
   */
  const imgSketch = (p) => {

    // 画像の読み込み
    p.preload = () => {
      img = p.loadImage("../../../assets/img/coding/page/hallstatt.jpg ");
    }

    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      let canvas = p.createCanvas(cW, cH);

      //キャンバスにclassを付与
      canvas.class('p5Canvas');

      // スタイルを定義
      size = 5;
      dotNum = 500;
      p.noStroke();
      // ?
      img.loadPixels();


    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {
      dotDraw();
    } // p.draw()

    // ------------------------------

    var dotDraw = () => {
      // dotNumの数値でrectの描画量(キャンバス内の塗りつぶされるスピード)を指定
      for (let i = 0; i < dotNum; i++) {
        // 画像上の特定の座標を出力
        var x = p.floor(p.random(p.width));
        var y = p.floor(p.random(p.height));
        // 出力された特定の座標の色を取得
        var pix = img.get(x, y);
        // 取得した色で四角形を描画
        p.fill(pix);
        p.rect(x, y, size, size);
      }
    } // dotDraw()

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(imgSketch, parent);


}
