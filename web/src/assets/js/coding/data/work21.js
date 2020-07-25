export default {
  id: 21,
  ttl: "<span>C</span>anvasで超簡単なサインウェーブを作成<br class='u-sp'>【HTML5】",
  txt: "Canvasで超簡単な<br>サインウェーブを作成<br>【HTML5】",
  alt: "Canvasで超簡単なサインウェーブを作成【HTML5】",
  p1: "サインウェーブを描画するための考え方",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>考え方は下記です。※青色部分を水と仮定します。<br><br>①<strong>水になる部分の外周にパスを置いていき、すべてのパスをつなぐ</strong><br><br>②<strong>パスの中を青色で塗りつぶす(静的な水と波ができる)</strong><br><br>③<strong>外周のパスの位置を変えながら、繰り返し描画していく(動的な水と波ができる)</strong><br>",
  p1_list2: "<span data='dot'>&#9642;</span>サインウェーブは、CSSのtransformといったオブジェクトの移動ではなく、パラパラ漫画のような連続的な描画によって、さも移動しているかのように表現します。そのため、for文やrequestAnimationFrame関数といったループ処理が必須となります。",
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
  let canvasParent = document.getElementById("canvasParent");
  let canvas = document.getElementById("canvas");

  // Canvas利用不可の環境では実行しないようにif文で囲む
  if (canvas.getContext) {

    // canvasの幅と高さを親要素のサイズに合わせる
    canvas.width = canvasParent.clientWidth;
    canvas.height = canvasParent.clientHeight;

    // update関数内で使用する値
    var info = {
      seconds: 0,
      time: 0
    }

    /**
     * 描画を更新するための関数
     */
    function update() {
      //波を描画
      drawWave('blue', .6, 10, 40, 0.02);
    }


    /**
     * drawWave(色, 不透明度, 波の滑らかさ(パスの分割数), 波の振幅, 波の速度)
     */
    function drawWave(color, alpha, period, amplitude, velocity) {

      // Canvasに描画機能を付与
      let c = canvas.getContext('2d');

      // Canvasをクリア
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = color;
      c.globalAlpha = alpha;

      // 描画開始
      c.beginPath();
      // サインウェーブ
      drawSine(info.time, period, amplitude);
      //パスをCanvasの右下へ
      c.lineTo(canvas.width, canvas.height);
      //パスをCanvasの左下へ
      c.lineTo(0, canvas.height);
      //パスを閉じる
      c.closePath();
      //パス内を塗りつぶす
      c.fill();

      // 連続的なサインウェーブの更新
      // info.timeはあとでラジアンを出力する際に使われるので、
      // Math.PIを乗算しておく
      info.seconds = info.seconds + velocity;
      info.time = info.seconds * Math.PI;
    }

    /**
     * サインウェーブ関数
     */
    function drawSine(time, period, amplitude) {

      var c = canvas.getContext('2d');

      // ウェーブラインを描画(横幅1px毎にパスを置き、線を繋ぐイメージ)
      for (let i = 0; i <= canvas.width; i += 1) {

        // パスを置くX座標
        // 横幅1pxずつにパスを置く
        const x = (i / (period - 1)) * canvas.width;

        // ラジアン(timeの値が毎回微加算されるので、パスのy座標も微加減する)
        const radian = (i / period) * Math.PI + time;

        // パスを置くY座標
        // Math.sin(radian)で出力した-1.0〜+1.0の範囲の値×振幅の値
        // によって出力された値を、基準となる上から2/3の値に加算する
        const y = amplitude * Math.sin(radian) + canvas.height * 2 / 3;

        // ループが始まっていなければmoveTo()でパスの初期位置を決める
        // ループが始まっていればlineTo()でパスを繋ぐ
        if (i === 0) {
          c.moveTo(x, y);
        } else {
          c.lineTo(x, y);
        }

      }

    }

    /**
     * アニメーションをループさせる
     */
    function animate() {
      requestAnimationFrame(animate);
      update();
    }
    animate();

  }






}
