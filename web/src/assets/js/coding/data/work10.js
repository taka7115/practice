export default {
  id: 10,
  ttl: "<span></span><br class='u-sp'>",
  txt: "10作品目の情報が入ります。",
  alt: "10作品目の情報が入ります。",
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

  //親要素とcanvas要素を取得
  const canvasParent = document.getElementById("canvasParent");
  const canvas = document.getElementById("canvas");

  // Canvas利用不可の環境では実行しないようにif文で囲む
  if (canvas.getContext) {

    // canvasの幅と高さを親要素のサイズに合わせる
    canvas.width = canvasParent.clientWidth;
    canvas.height = canvasParent.clientHeight;

    // Canvasに描画機能を付与
    let c = canvas.getContext('2d');

    // canvasのサイズを取得
    let canvasSize = canvas.getBoundingClientRect();
    // 画面左端からcanvasまでの距離を取得
    let canvasLeft = canvasSize.left;
    // 画面上端からcanvasまでの距離を取得
    let canvasTop = canvasSize.top;
    // 画面の初期スクロール量を取得
    const windowFirstS = window.scrollY;

    //マウスの初期値を設定
    let e = {
      clientX: undefined,
      clientY: undefined
    }

    // 描画するか、しないかの真偽を定めた変数
    let painting = false;

    // 描画実行関数
    function startPosition() {
      painting = true;
      draw(e);
    }

    // 描画不実行関数
    function endPosition() {
      painting = false;
      c.beginPath();
    }

    /**
     * 線を描画する関数
     */
    function draw(e) {

      // 変数paintingがfalseの場合は、下記の記述を読み込まない
      if (!painting) return;

      // 画面のスクロール量を取得
      let windowS = window.scrollY;

      // 線のスタイルを設定
      c.clientWidth = 10;
      c.lineCap = "round";

      // カーソルの正しい位置を変数化
      let x = e.clientX - canvasLeft;
      let y = e.clientY - canvasTop - windowFirstS + windowS;

      // 線を引く
      c.lineTo(x, y);
      c.stroke();
      c.beginPath();
      c.moveTo(x, y);

    }

    /**
     * 線の描画を操作するイベント処理
     */
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

  }

}
