export default {
  id: 38,
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




    var redraw_bg = () => {
      // drawingContextメソッドにより、素のcanvas API使用可能
      // ※素のAPIのオブジェクトとp5.jsのオブジェクトでは、
      // 記述の順番に関係なく素のAPIのオブジェクトが重ね順上にくる
      var gra = p.drawingContext.createLinearGradient(
        0,
        0,
        cW,
        cH
      );
      gra.addColorStop(0, 'green');
      gra.addColorStop(1, 'yellow');
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


    class Spring {
      constructor(id, x, y, w, h, c) {

        this.id = id;
        this.current_x = x;
        this.current_y = y;
        this.w = w;
        this.h = h;
        this.color = c;

        this.over = false; // オブジェクトにマウスがのっているか
        this.move = false; // オブジェクトが動いているか
        this.anim = false; // オブジェクトがアニメーションしているか

        this.repos_x = x; // 更新されたx座標
        this.repos_y = y; // 更新されたy座標

        // Spring simulation constants
        this.mass = 9;
        this.k = .1;
        this.damp = 10;
        this.vel_x = 0;
        this.vel_y = 0;
        this.accel = 0;
        this.force = 0;

        this.change = 1;
      }

      init() {
        this.update();
        this.draw();
      }

      update() {
        this.repos_y = p.mouseY;
        this.repos_x = p.mouseX;
        this.current_x = return_current_pos(this.k, this.current_x, this.repos_x, this.mass, this.damp, this.vel_x);
        this.current_y = return_current_pos(this.k, this.current_y, this.repos_y, this.mass, this.damp, this.vel_y);
      }

      draw() {
        p.drawingContext.fillStyle = this.color;
        p.ellipse(this.current_x, this.current_y, this.w, this.h);
      }


    }

    var return_current_pos = (k, pos, repos, mass, damp, vel) => {
      var force, accel, velocity, position;

      force = -k * (pos - repos);
      accel = force / mass;
      velocity = damp * (vel + accel);
      position = pos + velocity;

      return position;
    }






  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
