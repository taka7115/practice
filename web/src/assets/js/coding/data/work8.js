import {
  timers
} from "jquery";

export default {
  id: 8,
  ttl: "<span></span><br class='u-sp'>",
  txt: "8作品目の情報が入ります。",
  alt: "8作品目の情報が入ります。",
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

    // canvasのサイズを取得
    var canvasSize = canvas.getBoundingClientRect();
    // 画面左端からcanvasまでの距離を取得
    var canvasLeft = canvasSize.left;
    // 画面上端からcanvasまでの距離を取得
    var canvasTop = canvasSize.top;


    // Canvasに描画機能を付与
    let c = canvas.getContext('2d');

    // マウスの座標
    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }

    // カーソル移動があるたびにカーソル位置の値を格納する
    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.pageX - canvasLeft;
      mouse.y = event.pageY - canvasTop;
    })


    // ------------------------------------------------------------------

    // 点の描画&アニメーションに必要な値をオブジェクト化しておく
    let val = {
      quantity: 100,
      radius: 20,
      colorArray: [
        "#F27EBE",
        "#3DF2BF",
        "#05AFF2",
      ],
      velocityRange: 5,
      lineWidth: 2
    }

    // ------------------------------------------------------------------

    // ユーティリティー関数

    // // 点の描画座標出力
    function randomIntFromRange(area, radius) {
      return Math.floor(Math.random() * (area - radius + 1) + radius);
    }

    // ------------------------------------------------------------------

    //関数オブジェクトを設定
    function Particle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.velocity = 0.05;
      this.radius = radius;
      this.radians = Math.random() * Math.PI * 2;
      // colorArrayに格納された色をランダムに割り振る
      this.color = val.colorArray[Math.floor(Math.random() * val.colorArray.length)];
      this.distanceFromCenter = randomIntFromRange(50, 120);
      this.lastMouse = {
        x: x,
        y: y
      }


      this.lastMouse = {
        x: x,
        y: y
      };

      // 座標をズラしながら点を描画していく処理
      this.update = () => {


        const lastPoint = {
          x: this.x,
          y: this.y
        };

        // 繰り返し描画
        this.radians += this.velocity;

        //カーソルを移動させたときの慣性エフェクト
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        // 円形移動
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

      for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, "blue"));
      }

    }

    // ------------------------------------------------------------------

    // 点を描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      c.fillStyle = 'rgba(255,255,255,0.05)';

      // 指定した範囲の描画内容をリセットする
      c.fillRect(0, 0, canvas.width, canvas.height);

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
