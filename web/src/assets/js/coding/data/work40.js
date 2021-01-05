export default {
  id: 40,
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
  p3: "",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>",
  p3_list2: "<span data='dot'>&#9642;</span>",
  func
}


//  インポート
import gsap from "gsap";
import {
  TweenMax,
  TweenLite,
  TimelineMax,
} from 'gsap/all';

/**
 * js--------------------------------------
 */



function func() {

  /**
   * キャンバス設定用のグローバル関数
   */
  // p5.jsをnode moduleから読み込み
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  let canvas;

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // -------------------------------

  /**
   * インスタンスモードで記述
   */
  const sketch = (p) => {

    /**
     * 描画内容用のグローバル関数
     */
    let circle = [];

    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      canvas = p.createCanvas(cW, cH);

      //キャンバスにclassを付与
      canvas.class('p5Canvas');

      p.noStroke();

      create_circle();


    } //p.setup()

    var create_circle = () => {
      circle = new Spring(0, cW / 2, cH / 2, 50, 50, "blue");
      console.log(circle);
    }


    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

      redraw_bg();

      drawing();

    } // p.draw()

    p.mouseClicked = () => {

    } // p.mouseClicked()

    var redraw_bg = () => {
      // drawingContextメソッドにより、素のcanvas API使用可能
      // ※素のAPIのオブジェクトとp5.jsのオブジェクトでは、
      // 記述の順番に関係なく素のAPIのオブジェクトが重ね順上にくる
      var gra = p.drawingContext.createLinearGradient(
        cW / 2,
        0,
        cW / 2,
        cH
      );
      gra.addColorStop(0, 'orange');
      gra.addColorStop(.5, 'yellow');
      gra.addColorStop(1, 'yellowgreen');
      p.drawingContext.fillStyle = gra;
      p.rect(0, 0, cW, cH);
    }


    /**
     * 描画内容の全関数
     */
    var drawing = () => {
      draw_circle();
    }



    var draw_circle = () => {
      circle.init();
    }

    var return_color = () => {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    }





    class Spring {
      constructor(id, x, y, w, h, c) {

        this.id = id;
        this.current_x = x;
        this.current_y = y;
        this.w = w;
        this.h = h;
        this.r = this.w / 2;
        this.color = c;

        this.over = false; // オブジェクトにマウスがのっているか
        this.move = false; // オブジェクトが動いているか
        this.scatter; // circle_scatter();実行中か


        this.vel_x = 5;
        this.vel_y = 5;
      }

      init() {
        this.update();
        this.draw();
      }

      update() {

        if (this.current_x > cW - this.r || this.current_x < 0 + this.r) {
          this.vel_x *= -1;
        }
        if (this.current_y > cH - this.r || this.current_y < 0 + this.r) {
          this.vel_y *= -1;
        }

        this.current_x = this.current_x + this.vel_x;
        this.current_y = this.current_y + this.vel_y;

      }

      draw() {
        this.wall_crush();
        this.circle_scatter();
        p.drawingContext.fillStyle = this.color;
        p.ellipse(this.current_x, this.current_y, this.w, this.h);
      }


      wall_crush() {
        if (this.current_x > cW - this.r || this.current_x < 0 + this.r) {
          this.pulse_anim(this.w, this.h);
        }
        if (this.current_y > cH - this.r || this.current_y < 0 + this.r) {
          this.pulse_anim(this.w, this.h);
        }
      }





      pulse_anim(w, h) {
        TweenMax.to(circle, .2, {
          w: w * 9 / 10,
          h: h * 9 / 10,
          color: return_color(),
          // ease: "bounce.out",
          onComplete: function () {

          }, // 処理後じ実行する関数を指定
        });

      }

      circle_scatter() {

        p.drawingContext.fillStyle = "#fff";
        p.ellipse(this.current_x - 5, this.current_y, this.w / 5, this.h / 5);
        p.ellipse(this.current_x - 10, this.current_y, this.w / 5, this.h / 5);
        p.ellipse(this.current_x + 5, this.current_y, this.w / 5, this.h / 5);
        p.ellipse(this.current_x + 5, this.current_y, this.w / 5, this.h / 5);

      }


    }




  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
