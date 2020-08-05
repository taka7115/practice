export default {
  id: 8,
  ttl: "<span>C</span>anvasで<br class='u-sp'>美しい円形運動を描画する<br class='u-sp'>【ラジアンの活用】",
  txt: "Canvasで<br>美しい円形運動を<br>描画する【ラジアンの活用】",
  alt: "Canvasで美しい円形運動を描画する【ラジアンの活用】",
  p1: "Math.cos(sin)とradiansによる計算で点を円形運動させる",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>サイン、コサイン、タンジェントといった三角関数と、円の弧度を表すラジアンによる計算式で、点の描画座標を決めていきます(JavaScriptの72行目、99～100行目)。",
  p1_list2: "<span data='dot'>&#9642;</span><a href='https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/cos' target='_blank'>Math.cos()の使い方</a>",
  p2: "<br class='u-sp'>点の残像を表現する",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>JavaScriptの145行目。点の残像を表現するために、点1描画毎にキャンバスを白色で塗りつぶします。このとき、白色の透明度(今回は0.05)を設定することで残像の加減を調整できます。",
  p2_list2: "",
  p3: "",
  p3_color: "",
  p3_list1: "",
  p3_list2: "",
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

    // canvasのサイズを取得
    const canvasSize = canvas.getBoundingClientRect();
    // 画面左端からcanvasまでの距離を取得
    const canvasLeft = canvasSize.left;
    // 画面上端からcanvasまでの距離を取得
    const canvasTop = canvasSize.top;
    // 画面のスクロール量を取得
    const windowS = window.scrollY;

    // ページ読み込み時のマウス座標は、キャンバスの中央に設定
    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }

    // カーソル移動があるたびにカーソル位置の値を格納する
    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.pageX - canvasLeft;
      mouse.y = event.pageY - canvasTop - windowS;
    })


    // ------------------------------------------------------------------

    // 点の描画&アニメーションに必要な値をオブジェクト化しておく
    let val = {
      quantity: 60,
      maxRadius: 4,
      velocity: 0.05,
      inertia: 0.05,
      colorArray: [
        "#00E1FF",
        "#FFFB00",
        "#FFB700",
        "#FF8800",
        "#FF510D",
      ]
    }

    // ------------------------------------------------------------------

    // ユーティリティー関数

    // // 点の描画座標出力
    function randomIntFromRange(area, radius) {
      return Math.floor(Math.random() * (area - radius + 1) + radius);
    }

    // ------------------------------------------------------------------

    // 関数オブジェクトを設定

    function Particle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.velocity = val.velocity;
      this.radius = radius;
      // 円における、2つの半径の中心角度(360までの値をランダムに出力)
      this.radians = Math.random() * Math.PI * 2;
      // colorArrayに格納された色をランダムに割り振る
      this.color = val.colorArray[Math.floor(Math.random() * val.colorArray.length)];
      // 円の中心と点の距離を調整
      if (window.innerWidth > 750) {
        this.distanceFromCenter = randomIntFromRange(50, 130);
      } else {
        this.distanceFromCenter = randomIntFromRange(20, 60);
      }

      // 直前のマウス位置を設定
      this.lastMouse = {
        x: x,
        y: y
      }

      // 点を描画していく処理
      this.update = () => {

        const lastPoint = {
          x: this.x,
          y: this.y
        };

        // 中心角度を変えていく(velocityの値だけ点は円形運動)
        this.radians += this.velocity;

        //カーソルを移動させたときの慣性エフェクト
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * val.inertia;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * val.inertia;

        // 円形運動
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

        // 点を描画する
        this.draw(lastPoint);

      }

      // 点を描画する処理
      this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
      }

    }


    // ------------------------------------------------------------------

    // 変数設定
    let particles;

    // 点それぞれの値を配列に格納する関数
    function init() {
      particles = [];

      for (let i = 0; i < val.quantity; i++) {
        const radius = (Math.random() * val.maxRadius) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius));
      }

    }

    // ------------------------------------------------------------------

    // 点を描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      // 指定した範囲の描画内容をリセットする
      c.fillRect(0, 0, canvas.width, canvas.height);

      //点の残像を表現する
      c.fillStyle = 'rgba(255, 255, 255, 0.05)';

      particles.forEach(particle => {
        particle.update();
      });

    }

    // ------------------------------------------------------------------

    // init関数の実行
    init();
    // animate関数の実行
    animate();

  }

}
