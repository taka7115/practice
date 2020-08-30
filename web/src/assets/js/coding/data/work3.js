export default {
  id: 3,
  ttl: '<span>H</span>TML5のCanvasを<br class="u-sp">独学で勉強してみた②<br>【基本的なアニメーション】',
  txt: "HTML5のCanvasを<br>独学で勉強してみた②<br>【基本的なアニメーション】",
  alt: "HTML5のCanvasを独学で勉強してみた②【基本的なアニメーション】",
  p1: "<br class='u-sp'>アニメーションの仕組み",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>今回はオレンジ色の円をアニメーションさせます。大きさ、初期座標、スピードはランダム。ページをリロードすると、毎回異なる円が描画されることが分かります。<br>アニメーション処理の流れは下記です。<br><br>①<strong>ループ処理で円を継続的に描画させる</strong><br>(JavaScriptの47行目、50行目)<br><br>②<strong>描画させる円の座標を1回ずつ変える</strong><br>(JavaScriptの66、67行目)<br><br>③<strong>キャンバスをクリアにしてから円を描画する</strong><br>(JavaScriptの50行目)",
  p1_list2: "<span data='dot'>&#9642;</span>座標を少しずつズラしながら、円をループ描画していくイメージです。ただ、このままだと描画されたすべての円がキャンバス上に残ってしまい、1つの円が移動するというアニメーションになりません(太い直線が引かれるようなアニメーションになります)。なので、<a href='https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/clearRect' target='_blank'>.clearRectメソッド</a>を使用してループ処理一回ごとにキャンバスをクリアにする必要があります(JavaScriptの50行目)。",
  p2: '描画する円の値をランダムで決める',
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>JavaScriptの18～27行目。59行目のc.arcに入るそれぞれの値を変数化しておきます。今回は描画される円の大きさ、初期座標、アニメーションのスピードをランダムで決めたいので、Math.random()を使用します。",
  p2_list2: "<span data='dot'>&#9642;</span>JavaScriptの25行目。x軸、y軸でのスピードを決める式で、- 0.5と表記するのは、正だけでなく負の値も出力されるようにするためです。Math.random()で出力される値が-0.5未満の場合、-0.5が引かれて、最終的な値は負の値になります。(負の値が出力されるようにしないと、右下方向に進む円しか描画されません)",
  p3: '範囲の端に円がきたら折り返す',
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>JavaScriptの59～63行目。キャンバス内でのみ円をアニメーションさせるため、範囲の端に円がきたら、逆方向に折り返すようにします。座標を変化させる値(speedXとspeedY)が正であれば負、負であれば正に切り替わることで、円は逆方向に描画されていくので、円が範囲の端にきたら、正負を切り替える処理を記述します。",
  p3_list2: "<span data='dot'>&#9642;</span>この処理方法を応用させると、ブロック崩しやエアホッケーといった、簡単なゲームが作れそうです。",
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

    // 値を変数化しておく
    // 円の半径
    var radius = Math.random() * 50;
    // 円の初期x座標
    var x = Math.random() * canvas.width;
    // 円の初期y座標
    var y = Math.random() * canvas.height;
    // 円のx軸でのスピード
    var speedX = (Math.random() - 0.5) * 10;
    // 円のy軸でのスピード
    var speedY = (Math.random() - 0.5) * 10;

    // 円の直径を変数化
    var diameter = radius * 2;
    // 描画された円が画面からはみでるとき
    // はみでないように初期座標を修正
    if (x < diameter) {
      x = diameter;
    } else if (x > canvas.width - diameter) {
      x = canvas.width - diameter;
    } else if (y > canvas.height - diameter) {
      y = canvas.height - diameter;
    } else if (y < diameter) {
      y = diameter;
    }

    // 円を描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      // 指定した範囲の描画内容をリセットする
      c.clearRect(0, 0, canvas.width, canvas.height);

      // 円を描画する
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI * 2, false);
      c.fillStyle = 'orange';
      c.fill();

      // 範囲の端にきたら折り返す
      if (x + radius > canvas.width || x - radius < 0) {
        speedX = -speedX;
      } else if (y + radius > canvas.height || y - radius < 0) {
        speedY = -speedY;
      }

      // 座標の値を変えていく
      x += speedX;
      y += speedY;

    }

    // animate関数を実行する
    animate();

  }






}
