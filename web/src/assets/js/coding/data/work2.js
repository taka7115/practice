export default {
  id: 2,
  ttl: '<span>H</span>TML5のCanvasを<br class="u-sp">独学で勉強してみた①<br class="u-sp">【基本的な描画】',
  txt: "HTML5のCanvasを<br>独学で勉強してみた①<br>【基本的な描画】",
  alt: "HTML5のCanvasを独学で勉強してみた①【基本的な描画】",
  p1: "Canvasに描画機能を付与する",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>JavaScriptの15行目。.getContext('2d')オブジェクトは、線、四角形、円などを描画するメソッドを持っています。HTML5のCanvasタグ単体では図形を描画する能力を持っていません。つまり、Canvas要素に.getContext('2d')と指定することで初めて、図形の描画が可能になります。",
  p1_list2: "<span data='dot'>&#9642;</span>今回の場合、変数cに描画機能を持った(リアルな意味の)キャンバスを格納します。この変数c(キャンバス)にメソッドを追加していき、図形を描いたり色を塗ったりしていきます。",
  p2: '新しく図形を描くときは<br class="u-sp">.beginPath()で描画内容を初期化する',
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>四角形は例外ですが、基本的に図形を描く際は.beginPath()で描画内容を初期化する必要があります。図形は座標を指定しながらパスをつないでいくので、直前のパスの終了座標が、次のパスの開始地点として認識されます。beginPath()と記述することで直前のパスとの関係性を断ち切ることができるのです。",
  p2_list2: "<span data='dot'>&#9642;</span>図形や色を描画する各メソッドは、<a href='https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D' target='_blank'>MDN</a>から使用方法を確認することができます。",
  p3: 'ループ処理で図形を複数描画する',
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>JavaScriptの46行目。図形を複数作成する場合は、for文でループ処理します。上の例では変数iの上限を8に指定しているため、三角形が8つ描画されています。",
  p3_list2: "<span data='dot'>&#9642;</span>JavaScriptの65行目。x = x + 100;と記述することで、三角形のパスの開始x座標が処理1回毎に100pxずつ増えます。そのため、三角形は右にズレながら作成されていきます。",
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

    // 四角形
    c.fillStyle = "rgb(0, 0, 255)";
    c.fillRect(50, 50, 50, 50);
    c.fillStyle = "#ffff00";
    c.fillRect(150, 50, 50, 50);
    c.fillStyle = "green";
    c.fillRect(250, 50, 50, 50);

    // 線
    if (window.innerWidth > 750) {
      var line1 = {
        x: 50,
        y: 200,
      };
      var line2 = {
        x: 100,
        y: 250,
      };
      var line3 = {
        x: 150,
        y: 200,
      };
      var line4 = {
        x: 200,
        y: 250,
      };
      var line5 = {
        x: 250,
        y: 200,
      };
    } else {
      var line1 = {
        x: 50,
        y: 150,
      };
      var line2 = {
        x: 100,
        y: 200,
      };
      var line3 = {
        x: 150,
        y: 150,
      };
      var line4 = {
        x: 200,
        y: 200,
      };
      var line5 = {
        x: 250,
        y: 150,
      };
    }
    c.beginPath();
    c.moveTo(line1.x, line1.y);
    c.lineTo(line2.x, line2.y);
    c.lineTo(line3.x, line3.y);
    c.lineTo(line4.x, line4.y);
    c.lineTo(line5.x, line5.y);
    c.strokeStyle = 'red';
    c.stroke();

    // 円
    if (window.innerWidth > 750) {
      var circle = {
        x: 100,
        y: 380,
        radius: 30,
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false
      }
    } else {
      var circle = {
        x: 80,
        y: 270,
        radius: 30,
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false
      }
    }
    c.beginPath();
    c.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle, circle.anticlockwise, );
    c.fillStyle = "skyblue";
    c.fill();
    c.strokeStyle = "rgb(70, 0, 128)";
    c.stroke();

    // ループ処理で三角形を複数作成
    if (window.innerWidth > 750) {
      var triangle = {
        x: 100,
        y: 550,
        diffX: 30,
        diffY: 50,
        space: 100
      }
    } else {
      var triangle = {
        x: 40,
        y: 360,
        diffX: 15,
        diffY: 25,
        space: 40
      }
    }
    for (var i = 0; i < 8; i++) {
      c.beginPath();
      c.moveTo(triangle.x, triangle.y - triangle.diffY);
      c.lineTo(triangle.x - triangle.diffX, triangle.y);
      c.lineTo(triangle.x + triangle.diffX, triangle.y);
      c.lineTo(triangle.x, triangle.y - triangle.diffY);
      c.fillStyle = 'turquoise';
      c.fill();
      triangle.x = triangle.x + triangle.space;
    }

  }

}
