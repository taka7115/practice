export default {
  id: 6,
  ttl: "<span>H</span>TML5のCanvasを<br class='u-sp'>独学で勉強してみた⑤<br class='u-sp'><br>【重力加減速アニメーション】",
  txt: "HTML5のCanvasを<br>独学で勉強してみた⑤<br>【重力加減速アニメーション】",
  alt: "HTML5のCanvasを独学で勉強してみた⑤【重力加減速アニメーション】",
  p1: "<br class='u-sp'>アニメーション処理の流れ",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>今回は、クリックするたびにボールが弾むようなアニメーションをさせていきます。前回の内容を一部引き継いでいるので、<a href='./page5.html' target='_blank'>独学で勉強してみた④</a>のページから見ることをオススメします。<br>アニメーション処理の流れは下記です。<br><br>①<strong>ボールが弾む&徐々に弾みが少なくなる条件分岐</strong><br>(JavaScriptの65行目～70行目)<br><br>②<strong>ボールを弾ませる関数の定義</strong><br>(JavaScriptの53～56行目)<br><br>③<strong>クリックするたびにボールを弾ませるイベント処理</strong><br>(JavaScriptの124～129行目)",
  p1_list2: "",
  p2: "重力アニメーションの定義",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>今回のアニメーションで肝となるのが、どのようにして重力があるかのようにボールを弾ませるか。この重力アニメーションを定義しているのが、JavaScriptの65～70行目です。ここでの処理は3つ。<br><br>①<strong>キャンバスの底辺でボールの移動方向を反転</strong><br><br>②<strong>底辺に当たったとき、摩擦としてfrictionの値を乗算</strong><br><br>③<strong>ボールが弾んでいるとき、重力を弾むボールのスピードに加算</strong>",
  p2_list2: "<span data='dot'>&#9642;</span>③の「重力を弾むボールのスピードに加算」がイメージしづらいかもしれません。ボールのy軸の移動は、39行目のthis.vYの値によるものです(vYのvはvelocityのv)。なので<br><br><strong>負の値→0→正の値→底辺で正負を反転→0→正の値→底辺で正負を反転</strong><br><br>というようにthis.vYの値を調整すると、ボールはy軸上で上下に移動します。値が負のときは上に移動、0で下に折り返し、値が正のときは底辺に向かって移動。底辺で正負が反転し負の値になるので、再び上に移動。これを繰り返すイメージです。ちなみに重力は28行目、gravityで定義しています。",
  p3: "クリックでボールを弾ませるイベント処理",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>this.vYの値はいずれ0になります。0になるとボールは弾まなくなります。なので再び弾ませたい場合は、this.vYの値を更新させてあげましょう。",
  p3_list2: "<span data='dot'>&#9642;</span>この処理を定義しているのが、JavaScriptの53～56行目。this.firstVYは、ボールの初期this.vYの値です。37行目で変数化されています。この値をクリックのたびにthis.vYに代入することで、ボールは弾力を取り戻します。",
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

    // Canvasに描画機能を付与する
    let c = canvas.getContext('2d');

    // ボールの描画&アニメーションに必要な値をオブジェクト化しておく
    let val = {
      quantity: 50,
      maxRadius: 20,
      colorArray: [
        '#248EA6',
        '#84BFA4',
        '#F2E74B',
        '#F2D49B',
        '#D94141',
      ],
      gravity: 1,
      friction: .8,
    }

    //関数オブジェクトを設定
    function Ball(radius, x, y, vX, vY, color) {
      this.radius = radius;
      this.x = x;
      this.y = y;
      this.firstY = this.y;
      this.vX = vX;
      this.vY = vY;
      // ボール運動を調整(クリックしたとき、この値をthis.vYに代入(125行目))
      this.firstVY = this.vY * 2;
      // colorArrayに格納された色をランダムに割り振る
      this.color = color;

      // ボールを描画する処理
      this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
      }

      // 弾力をリセットする
      this.reset = () => {
        this.vY = this.firstVY;
      }

      // ボールのアニメーションの内容を定義する処理
      this.update = () => {

        // 座標の値を変えていく
        this.x += this.vX;
        this.y += this.vY;

        // 重力アニメーションを定義
        if (this.y + this.radius + this.vY > canvas.height) {
          this.vY = -this.vY * val.friction;
        } else {
          this.vY += val.gravity;
        }

        // x軸の端まできたら折り返す
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vX = -this.vX;
        }

        // ボールを描画する
        this.draw();
      }

    }

    // 配列を作っておく
    var ballArray = []

    for (let i = 0; i < val.quantity; i++) {
      // ボールの値をランダムで決める
      // ボールの半径
      var radius = Math.random() * val.maxRadius;
      // ボールの初期x座標
      var x = Math.random() * (canvas.width - radius * 2) + radius;
      // ボールの初期y座標(キャンバスの下半分のy座標にあるように制限)
      var y = Math.random() * (canvas.height / 2 - radius * 2) + radius;
      // ボールのx軸でのスピード(正負の値を出力)
      var vX = (Math.random() - 0.5) * 2;
      // ボールのy軸でのスピード(負の値のみ出力&10以上の値になるようにする)
      var vY = Math.random() * 10 + 10;
      // ボールの色をランダムに決める
      var color = val.colorArray[Math.floor(Math.random() * val.colorArray.length)];

      //ランダムで決められた値を配列にいれていく
      ballArray.push(new Ball(radius, x, y, vX, vY, color));
    }

    // ボールを描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      // 指定した範囲の描画内容をリセットする
      c.clearRect(0, 0, canvas.width, canvas.height);

      //ballArrayの数だけボールを描画する
      for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
      }

    }

    // animate関数を実行する
    animate();

    // クリックしたときにボールが弾む処理
    canvas.addEventListener("click", (event) => {
      for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].reset();
      }
    })

  }






}
