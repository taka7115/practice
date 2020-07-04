export default {
  id: 5,
  ttl: '<span>H</span>TML5のCanvasを<br class="u-sp">独学で勉強してみた④<br class="u-sp">【アニメーションのイベント処理】',
  txt: "HTML5のCanvasを<br>独学で勉強してみた④<br>【アニメーションのイベント処理】",
  alt: "HTML5のCanvasを独学で勉強してみた④【アニメーションのイベント処理】",
  p1: "<br class='u-sp'>アニメーション処理の流れ",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>今回は<span class='u-pcin'>マウスムーブ</span><span class='u-spin'>タッチムーブ</span>することで、<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>周りの円が大きくなっていくアニメーションを紹介します。前回の内容を一部引き継いでいるので、<a href='./page4.html' target='_blank'>独学で勉強してみた③</a>のページから見ることをオススメします。<br>アニメーション処理の流れは下記です。<br><br>①<b><span class='u-pcin'>カーソルの</span><span class='u-spin'>タッチした</span>座標を取得する</b><br>(JavaScriptの24行目～34行目)<br><br>②<b><span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>と円が指定距離以内のとき、円を大きくする</b><br>(JavaScriptの85～92行目)<br><br>③<b>指定距離以内にないとき、もとのサイズに戻していく</b><br>(JavaScriptの93～95行目)",
  p1_list2: "",
  p2: "<br class='u-sp'><span class='u-pcin'>カーソルの</span><span class='u-spin'>タッチした</span>座標を取得する",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span><span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>周りの円のみサイズを大きくするためには、<span class='u-pcin'>カーソルの</span><span class='u-spin'>タッチした</span>座標と円の座標を比較し、位置関係を追跡する必要があります。なのでまずはJavaScriptの32～33行目、.pageXと.pageYによって<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>の座標を取得します。注意すべきは、.pageXと.pageYは水平、垂直距離(つまり、画面端から<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>までの距離)を取得するのに対し、円の座標はキャンバスの(0, 0)を原点とした座標(つまり、キャンバス端から円までの距離)を取得すること。このままでは、<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>座標と円座標を比較することはできません。",
  p2_list2: "<span data='dot'>&#9642;</span>ということで、キャンバス端から<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>までの距離を取得します。17～22行目でキャンバスの、画面からの距離を取得し、その値を.pageXと.pageYで取得した値から差し引きます。これにより、円座標と同じく、<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>座標もキャンバス端からの値を取得できるようになります。",
  p3: "条件によって円を拡大、縮小",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>JavaScriptの85～95行目。<span class='u-pcin'>カーソル</span><span class='u-spin'>タッチ</span>と円の座標を比較し、条件によって円を拡大、縮小させます。<span class='u-pcin'>カーソルの</span><span class='u-spin'>タッチした</span>座標から円座標を差し引いた値が<span class='u-pcin'>100px</span><span class='u-spin'>50px</span>以下であれば、円の半径の値であるradiusに1pxずつ加算していくという処理です。",
  p3_list2: "<span data='dot'>&#9642;</span>反対に<span class='u-pcin'>100px</span><span class='u-spin'>50px</span>以下でなければ、radiusを1pxずつ減算していき、円をもとの大きさまで縮小させます。円のもとの大きさは、予め変数に格納しておきます(JavaScriptの59行目)。",
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
    if (window.innerWidth > 750) {
      window.addEventListener("mousemove", (event) => {
        mouse.x = event.pageX - canvasLeft;
        mouse.y = event.pageY - canvasTop;
      })
    } else {
      canvas.addEventListener("touchmove", (event) => {
        // タッチの情報を含むオブジェクト
        var touchObject = event.changedTouches[0];
        // 位置座標を取得する
        mouse.x = touchObject.pageX - canvasLeft;
        mouse.y = touchObject.pageY - canvasTop;
        // タッチによる画面スクロールを止める
        event.preventDefault();
      })
    }

    //  円の最大半径
    var maxRadius = 40;

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

        //円から100px以内にカーソルがあるとき、円は最大40pxまで大きくなる
        //円から100px以内にカーソルがないとき、円は初期描画サイズまで小さくなる
        if (window.innerWidth > 750) {
          var range = 100;
        } else {
          var range = 50;
        }
        if (mouse.x - this.x < range && mouse.x - this.x > -range && mouse.y - this.y < range && mouse.y - this.y > -range) {
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
        } else if (this.radius > this.firstRadius) {
          this.radius -= 1;
        }


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
