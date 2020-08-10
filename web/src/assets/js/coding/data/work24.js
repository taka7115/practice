export default {
  id: 24,
  ttl: "<span>p</span>5.jsを使って、<br class='u-sp'>ハルシュタットの風景を<br>モザイク風にしてみた【p5.js ③】",
  txt: "p5.jsを使って、<br>ハルシュタットの風景<br class='u-sp'>を<br class='u-pc'>モザイク風にして<br class='u-sp'>みた<br class='u-pc'>【p5.js ③】",
  alt: "p5.jsを使って、ハルシュタットの風景をモザイク風にしてみた【p5.js ③】",
  p1: ".loadImageメソッドを使って、画像を読み込み",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>p5.jsでは.loadImageメソッドを使って画像を読み込みます。画像だけでなく他にもloadJSON(JSONデータ)、loadFont(フォント)、loadSound(音楽や効果音)、といった読み込みメソッドが用意されています。<br><br>詳しくは<a href='https://p5js.org/reference/#/p5/preload' target='_blank'>p5.jsの公式リファレンス</a>を参照。",
  p1_list2: "<span data='dot'>&#9642;</span>画像の読み込みが完了する前にdraw()関数が動いてしまっては、思い通りのアニメーション表現ができません。そのためp5.jsでは、setup().draw()関数の実行を画像の読み込みが完了するまで保留にし、読み込みが完了したら、setup().draw()関数を実行する、という関数を持っています。それが、.preload()関数です。",
  p2: ".get()メソッドにより、座標の色を取得&取得した色の四角形を描画する",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>.get(x, y)メソッドは(x, y)座標の色相をrgbaの数値で返します。例えばハルシュタットの空。青い部分の座標を.get()で取得した場合、数値は[0, 0, 255, 255](青色)となります。",
  p2_list2: "<span data='dot'>&#9642;</span>ランダムに出力された座標の色を、pixという変数に格納。その色を四角形の塗りつぶし色として定義し、描画していくとモザイクのような表現が可能です。ちなみに四角形のサイズを1×1にすると、オリジナルの画像が描画されていきます。完全に描画されるまで、時間とメモリを喰いますが。。",
  p3: "画像読み込み中に表示される要素を指定する",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>p5.jsのpreload()を使用するとデフォルトでloadingというテキストがでてしまう。HTMLにp5_loadingという指定のidを付与すると、付与された要素がloading中に表示される要素となります。今回は空divにIDを付与して、loadingというテキストを非表示にしています。",
  p3_list2: "",
  func
}



/**
 * js--------------------------------------
 */



function func() {

  // p5.jsをnode moduleから読み込み
  // 今回p5.jsのjsファイルのみ、npm&gulpによりコンパイルしています。コンパイルしない開発環境の場合、
  // CDNや単一ファイルを読み込んでください。
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // 情報を変数化
  var img;
  var size, dotNum;

  /**
   * インスタンスモードで記述
   */
  const sketch = (p) => {

    // ---------------------------------------------------------------------------

    // 画像の事前読み込み
    p.preload = () => {
      img = p.loadImage("../../../assets/img/coding/page/hallstatt.jpg ");
      img.resize(cW, cH);
    } //p.preload()

    // ---------------------------------------------------------------------------

    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      let canvas = p.createCanvas(cW, cH);

      // 画像のサイズをキャンバスのサイズに合わせる
      img.resize(cW, cH);

      // スタイルを定義
      size = 5;
      dotNum = 500;
      p.noStroke();


    } //p.setup()

    // ---------------------------------------------------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {
      dotDraw();
    } // p.draw()

    // ---------------------------------------------------------------------------

    /**
     * 画像の色相を取得しながら、小さな四角形を描画する関数
     */
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

    // ---------------------------------------------------------------------------

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中にcanvas.parent(parent);を記述しても同義
  new p5(sketch, parent);

}
