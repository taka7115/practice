export default {
  id: 9,
  ttl: "<span>C</span>anvasでサインウェーブを<br class='u-sp'>表現してみた<br>【PCの待機画面でよく見るアレ】",
  txt: "Canvasでサインウェーブ<br>を表現してみた<br>【PC待機画面でよく見るアレ】",
  alt: "Canvasでサインウェーブを表現してみた【PCの待機画面でよく見るアレ】",
  p1: "<br class='u-sp'>波打つような線を描画する",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>JavaScriptの64～68行目。描画開始座標であるx='0'、y='高さの1/2'(62行目で定義)から、for文でcanvas.widthのpx数だけ、つまりキャンバスのx軸1pxずつに対して、Math.sin()式によりそれぞれのy座標を求め、パスを置いていきます。",
  p1_list2: "<span data='dot'>&#9642;</span>置いたパスを線で繋いでいくことで波打つような線を表現します。",
  p2: "<br class='u-sp'>ラインの残像を表現",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>JavaScriptの53～58行目。c.fillRectにより、キャンバスを黒色(透明度0.01)で継続的に塗りつぶすことで、ラインの残像を表現します。",
  p2_list2: "<span data='dot'>&#9642;</span>しかし、この方法ではページロード直後、キャンバスの背景が白色から黒色に変色するというアニメーションが発生してしまう。最初から黒色にしてほしいと言われた場合、いかに対象すべきか。あと、完全な黒色にはならないし。。解決方法模索中。",
  p3: "色相調整により、ライン色を変えていく",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>JavaScriptの70～72行目。色相(hsl)のhを0&lt;h&lt;200の間で変動させることにより、ラインの色を継続的に変えていきます。",
  p3_list2: "<span data='dot'>&#9642;</span>Math.sin()によって出力した値を、そのまま色相のhに乗算すると、出力される値には負の値も含まれます。hには正の値(絶対値)のみ代入したいので、Math.abs()式を用いて、代入される値を正の値のみとします。<br><br>→<a href='https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/abs' target='_blank'>Math.abs()の使い方</a>",
  func
}


/**
 * js--------------------------------------
 */

function func() {

  //親要素とcanvas要素を取得
  let canvasParent = document.getElementById("canvasParent");
  let canvas = document.getElementById("canvas");

  // Canvas利用不可の環境では実行しないようにif文で囲む
  if (canvas.getContext) {

    // canvasの幅と高さを親要素のサイズに合わせる
    canvas.width = canvasParent.clientWidth;
    canvas.height = canvasParent.clientHeight;

    // Canvasに描画機能を付与
    let c = canvas.getContext('2d');

    // ウェーブラインの値
    const wave = {
      y: canvas.height / 2,
      // ウェーブの間隔
      length: 0.01,
      // ウェーブの振幅
      amplitude: 100,
      // ウェーブの速さ
      frequency: 0.01
    }

    // ウェーブラインの色相
    const strokeColor = {
      h: 200,
      s: 50,
      l: 50
    }

    // キャンバスの背景色
    const backgroundColor = {
      r: 0,
      g: 0,
      b: 0,
      a: 0.01
    }

    // 変数化
    let increment = wave.frequency;

    // アニメーション関数
    function animate() {

      // アニメーションをループさせる
      requestAnimationFrame(animate)

      // キャンバスの背景色を設定
      c.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},
        ${backgroundColor.b},${backgroundColor.a})`;
      c.fillRect(0, 0, canvas.width, canvas.height);

      // ウェーブラインの描画
      c.beginPath();
      c.moveTo(0, canvas.height / 2);

      // ラインをウェーブがかるように描画
      for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, wave.y +
          Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment))
      }

      // ライン色を変えるため、色相(hsl)のhを0<h<200で変動させる
      c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))},${strokeColor.s}%,${strokeColor.l}%)`
      c.stroke();
      increment += wave.frequency;
    }

    // 関数実行
    animate()

  }

}
