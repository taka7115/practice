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


    } //p.setup()

    // ------------------------------

    /**
     * 繰り返し実行される処理
     */
    p.draw = () => {

    } // p.draw()


  } // sketch()

  // sketch関数実行。第2引数は親要素指定。setup()の中に下記記述でも同義
  // canvas.parent(parent);
  new p5(sketch, parent);


}
