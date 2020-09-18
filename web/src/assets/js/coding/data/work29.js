export default {
  id: 29,
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
 * js-------------------------------------------------------------
 */



function func() {

  // p5.jsをnode moduleから読み込み
  const p5 = require('p5');

  //親要素を取得
  const parent = document.getElementById("p5Parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  var x, y, ballR, vy, thread, ballCount, balls, ballV, fired, lightPower, colors, c;

  // -------------------------------------------------------------

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

      // 設定をリセット
      p.reset();

    } //p.setup()

    // ------------------------------------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {
      // 黒で塗りつぶし
      p.background(0, 50);

      // 火の玉のスピードが2以下の場合
      // 火花散らす
      if (vy < 2) {

        // 火花がまだ散っていない場合
        // 火花を描画&散らす
        if (fired === false) {
          lightPower = 0;
          for (var j = 0; j < thread; j++) {
            var r = ballV / thread * j;
            for (var i = 0; i < ballCount; i++) {
              balls[i + ballCount * j] = [
                x,
                y,
                r * p.cos(p.TWO_PI / ballCount * i + (p.PI / 10 * j)),
                r * p.sin(p.TWO_PI / ballCount * i + (p.PI / 10 * j))
              ];
            }
          }
          // 火花が散っている状態に
          fired = true;
        }
        // 火花がすでに散っている場合
        // 火花を徐々に透過させる
        else {
          lightPower += 2;
          p.drawFireFlower(255 - lightPower);
          if (lightPower > 255) {
            p.reset();
          }
        }
      }
      // 火の玉のスピードが2以上の場合
      // 火の玉を上昇&透過させる
      else {
        lightPower += 5;
        p.push();
        p.translate(x, y);
        p.drawFireBall(255 - lightPower);
        p.pop();
        y -= vy;
        vy -= 0.05;
      }
    } // p.draw()

    /**
     * 一連の描画初期値
     */
    p.reset = () => {
      x = p.random() * cW;
      if (p.width > 750) {
        y = cH * 2 / 3;
        ballR = 10;
        vy = 5 + p.random() * 1.5;
        thread = 10;
        ballCount = 10;
        ballV = 1.5;
      } else {
        y = cH;
        ballR = 4;
        vy = 3.5 + p.random() * 1.2;
        thread = 5;
        ballCount = 10;
        ballV = 1.5;
      }
      balls = new Array(ballCount * thread);
      fired = false;
      lightPower = 0;
      colors = ["red", "orange", "yellow", "pink"];
      c = p.random(colors);
    } // p.reset();

    /**
     * 火の玉の描画
     */
    p.drawFireBall = (l) => {
      p.noStroke();
      var rate = 255 / ballR;
      for (var i = 0; i < ballR; i++) {
        p.fill(rate * i, l);
        p.ellipse(0, 0, ballR - i + 1);
      }
    } // p.drawFireBall();

    /**
     * 火花の描画
     */
    p.drawFireFlower = (l) => {
      p.fill(p.red(c), p.green(c), p.blue(c), l);
      p.noStroke();
      for (var i = 0; i < ballCount * thread; i++) {
        p.ellipse(balls[i][0], balls[i][1], 3);
        balls[i] = [balls[i][0] + balls[i][2], balls[i][1] + balls[i][3], balls[i][2], balls[i][3] + 0.01];
      }
    } // p.drawFireFlower();

  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);

}
