export default {
  id: 4,
  ttl: '<span>H</span>TML5のCanvasを<br class="u-sp">独学で勉強してみた③<br>【簡単なアニメーション】',
  txt: "HTML5のCanvasを<br>独学で勉強してみた③<br>【簡単なアニメーション】",
  alt: "HTML5のCanvasを独学で勉強してみた③【簡単なアニメーション】",
  p1: "<br class='u-sp'>アニメーション処理の流れ",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>今回は100個の円をランダムの大きさ、ランダムのスピードでアニメーションさせていきます。前回の内容を一部引き継いでいるので、<a href='./page3.html' target='_blank'>独学で勉強してみた②</a>のページから見ることをオススメします。<br>アニメーション処理の流れは下記です。<br><br>①<strong>円を描画する関数オブジェクトを作成する</strong><br>(JavaScriptの17行目、50行目)<br><br>②<strong>100個の円のそれぞれの値を配列に格納する</strong><br>(JavaScriptの52、70行目)<br><br>③<strong>100個の配列をもとに、それぞれの円を描画していく</strong><br>(JavaScriptの72～89行目)",
  p1_list2: "",
  p2: "100個の円それぞれの値を、配列に格納する",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>まずは描画される100個の円の値を、配列に格納することを考えましょう。JavaScriptの53行目でcircleArray配列を事前に用意。55行目のfor文によってランダム生成された円100個分の値をそれぞれ格納していきます。格納する際は.pushメソッドによって格納するのですが、格納する値は17行目～50行目のCircle関数オブジェクト内で定義された値です。",
  p2_list2: "<span data='dot'>&#9642;</span>PCであれば検証ツール(F12キーを押す)のConsoleをみてみると、格納された100個すべての値を確認することができます。",
  p3: "描画&アニメーションを定義している関数を、それぞれの円で呼び出す",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>円を描画するうえで重要となる関数がJavaScriptの34行目、update()です。この関数は生成されたランダムの値をもとに、円が範囲内で描画され、一定スピードで移動し、範囲端で折り返すという、アニメーションのすべてを定義しています。",
  p3_list2: "<span data='dot'>&#9642;</span>このupdate()が描画された円すべてで呼び出されることで、円はそれぞれ独自のアニメーションをしていきます。なので、for文によって配列の数だけ(JavaScriptの82行目)、それぞれの配列からupdate()を呼び出す(83行目)という処理を記述してあげる必要があります。",
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

    //関数オブジェクトを設定
    function Circle(x, y, speedX, speedY, radius) {
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.radius = radius;

      // 円を描画する処理
      this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'turquoise';
        c.stroke();
      }

      // 座標をズラしながら円を描画していく処理
      this.update = () => {

        // 範囲の端にきたら折り返す
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

    // 配列を作っておく
    var circleArray = []

    for (let i = 0; i < 100; i++) {
      // 円の値をランダムで決める
      // 円の半径
      var radius = Math.random() * 50;
      // 円の初期x座標
      var x = Math.random() * (canvas.width - radius * 2) + radius;
      // 円の初期y座標
      var y = Math.random() * (canvas.height - radius * 2) + radius;
      // 円のx軸でのスピード
      var speedX = (Math.random() - 0.5) * 10;
      // 円のy軸でのスピード
      var speedY = (Math.random() - 0.5) * 10;

      //ランダムで決められた値を配列にいれていく
      circleArray.push(new Circle(x, y, speedX, speedY, radius));
    }

    console.log(circleArray);

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
