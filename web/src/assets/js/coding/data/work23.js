import {
  Line
} from 'chartist';

export default {
  id: 23,
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



/**
 * js--------------------------------------
 */



function func() {

  // p5.jsをnode moduleから読み込み
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // 粒子の数(canvasサイズをもとに調整)
  let quantity = Math.floor(window.innerWidth / 10);

  // 粒子情報の配列
  let ptcArray = [];

  // -------------------------------

  /**
   * インスタンスモードで記述
   */
  const sketch = (p) => {

    /**
     * 最初に1回だけ実行される処理
     */
    p.setup = () => {

      // キャンバスを親要素のサイズに合わせて作成
      let canvas = p.createCanvas(cW, cH);

      //キャンバスにclassを付与
      canvas.class('p5Canvas');

      // スタイルを指定
      p.noStroke();

      // Particle()によって出力された粒子の情報を、配列に格納
      for (let i = 0; i < quantity; i++) {
        ptcArray.push(new Particle());
      }

      console.log(ptcArray)

    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

      // スタイルをリセット
      p.background('#002049');

      // 粒子をそれぞれ描画
      ptcArray.forEach(function (el, index) {
        el.update();
        el.draw();
      });

    } // p.draw()

    // ------------------------------

    /**
     * クラスの定義
     */
    class Particle {
      constructor() {
        // 座標
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        // 大きさ
        this.r = 5;
        // 速さ
        this.v = p.createVector(p.random(-1, 1), p.random(-1, 1));
      }

      // 粒子の移動操作関数
      update() {
        this.pos.add(this.v);
        this.reflection();
        this.connection();
      }

      // 描画関数
      draw() {
        // 粒子の色
        p.fill(255, 255, 255);

        // 粒子描画
        p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
      }

      // 粒子反射関数
      reflection() {
        if (this.pos.x < 0 || this.pos.x > p.width) {
          this.v.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > p.height) {
          this.v.y *= -1;
        }
      }


      // 粒子接続関数
      connection() {

        // 粒子一つ一つの座標を他の粒子の座標と比較
        // 80より近ければ線で結ぶ
        for (let i = 0; i < ptcArray.length; i++) {

          const d = p.dist(this.pos.x, this.pos.y, ptcArray[i].pos.x, ptcArray[i].pos.y)

          if (d < 80) {
            p.stroke('#fff');
            p.line(this.pos.x, this.pos.y, ptcArray[i].pos.x, ptcArray[i].pos.y)
          }

        }



      }



    } // class Particle

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);

}
