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

    // Canvasに描画機能を付与
    let c = canvas.getContext('2d');

    // ------------------------------------------------------------------

    // 円の描画&アニメーションに必要な値をオブジェクト化しておく
    let val = {
      quantity: 100,
      radius: 20,
      colorArray: [
        "#F27EBE",
        "#3DF2BF",
        "#05AFF2",
        "#F2E085",
        "#F24822"
      ],
      velocityRange: 5,
      lineWidth: 2
    }

    // ------------------------------------------------------------------

    // ユーティリティー関数

    // // 円の描画座標出力
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
      // this.velocity = {
      //   x: (Math.random() - 0.5) * val.velocityRange,
      //   y: (Math.random() - 0.5) * val.velocityRange
      // }
      this.radians = Math.random() * Math.PI * 2;
      // colorArrayに格納された色をランダムに割り振る
      this.color = val.colorArray[Math.floor(Math.random() * val.colorArray.length)];
      this.distanceFromCenter = randomIntFromRange(50, 120);

      // 円を描画する処理
      this.draw = () => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo();
        c.lineTo();
        c.stroke();
        c.closePath();
      }

      this.lastMouse = {
        x: x,
        y: y
      };

      // 座標をズラしながら円を描画していく処理
      this.update = () => {

        // move points over timers
        this.radians += this.velocity;

        // 円形移動
        this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = y + Math.sin(this.radians) * this.distanceFromCenter;


        // // 範囲の端にきたら折り返す処理
        // if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        //   this.velocity.x = -this.velocity.x;
        // } else if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        //   this.velocity.y = -this.velocity.y;
        // }

        // 座標の値を変えていく
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // 円を描画する
        this.draw();

      }

    }


    // ------------------------------------------------------------------

    let particles;

    // 円それぞれの値を配列に格納する関数
    function init() {
      particles = [];

      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, "blue"))
      }



    }

    // ------------------------------------------------------------------

    // 円を描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      c.fillStyle = 'rgba(255,255,255,0.05)';

      // 指定した範囲の描画内容をリセットする
      c.clearRect(0, 0, canvas.width, canvas.height);

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
