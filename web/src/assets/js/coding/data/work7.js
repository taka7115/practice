export default {
  id: 7,
  ttl: "<span></span><br class='u-sp'>",
  txt: "3作品目の情報が入ります。",
  alt: "3作品目の情報が入ります。",
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
    var canvasSize = canvas.getBoundingClientRect();
    // 画面左端からcanvasまでの距離を取得
    var canvasLeft = canvasSize.left;
    // 画面上端からcanvasまでの距離を取得
    var canvasTop = canvasSize.top;

    // canvas上でのカーソル位置の値を格納するための変数
    var mouse = {
      x: undefined,
      y: undefined
    }

    // カーソル移動があるたびにカーソル位置の値を格納する
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.pageX - canvasLeft;
      mouse.y = event.pageY - canvasTop;
    })

    canvas.addEventListener("touchmove", (event) => {
      // タッチの情報を含むオブジェクト
      var touchObject = event.changedTouches[0];
      // 位置座標を取得する
      mouse.x = touchObject.pageX - canvasLeft;
      mouse.y = touchObject.pageY - canvasTop;
      // タッチによる画面スクロールを止める
      event.preventDefault();
    })


    //  円の配色
    var colorArray = [
      '#092140',
      '#049DD9',
      '#F2B705',
      '#F29F05',
      '#F26835',
    ];

    // 描画する円の個数
    var quantity = 300;

    //関数オブジェクトを設定
    function Circle(x, y, speedX, speedY, radius) {
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.radius = radius;
      // 円の初期サイズ
      this.firstRadius = radius;
      // colorArrayに格納された色をランダムに割り振る
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

      // 円を描画する処理
      this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
      }

      // 座標をズラしながら円を描画していく処理
      this.update = () => {

        // 範囲の端にきたら折り返す処理
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.speedX = -this.speedX;
        } else if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.speedY = -this.speedY;
        }

        // 座標の値を変えていく
        this.x += this.speedX;
        this.y += this.speedY;


        // 円を描画する
        this.draw();
      }

    }

    // 円の値を格納する配列
    var circleArray = []

    // 円の値を円の個数分出力し、それぞれの円の値を配列に格納する
    for (let i = 0; i < quantity; i++) {
      // 円の半径
      var radius = Math.random() * 10 + 1;
      // 円の初期x座標
      var x = Math.random() * (canvas.width - radius * 2) + radius;
      // 円の初期y座標
      var y = Math.random() * (canvas.height - radius * 2) + radius;
      // 円のx軸でのスピード
      var speedX = (Math.random() - 0.5) * 4;
      // 円のy軸でのスピード
      var speedY = (Math.random() - 0.5) * 4;

      //ランダムで決められた値を配列に格納していく
      circleArray.push(new Circle(x, y, speedX, speedY, radius));
    }

    // 円を描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      // 指定した範囲の描画内容をリセットする
      c.clearRect(0, 0, canvas.width, canvas.height);

      //円をcircleArrayの数だけ描画する
      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }

    }

    // animate関数を実行する
    animate();

  }

}
