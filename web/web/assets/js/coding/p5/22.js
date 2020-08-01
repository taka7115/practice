// //親要素を取得
// let parent = document.getElementById("canvasParent");

// // 親要素の幅と高さを変数化
// const cW = parent.clientWidth;
// const cH = parent.clientHeight;

// // 粒子のx座標、y座標、半径を定義
// var ptc = {
//   x: undefined,
//   y: undefined,
//   r: undefined,
// }

// // 粒子の描画回数
// const quantity = Math.floor(window.innerWidth / 10);

// // クラスの情報変数
// let p;

// // 粒子の配列
// const ptcArray = [];

// // ---------------------------------------------------------------------

// /**
//  * 最初に1回だけ実行される処理
//  */
// function setup() {

//   // キャンバスの、親要素を指定&親要素にサイズを合わせる
//   let canvas = createCanvas(cW, cH);
//   canvas.parent(parent);

//   //キャンバスにclassを付与
//   canvas.class('p5Canvas');

//   // 変数pにクラスParticleを格納
//   for (let i = 0; i < quantity; i++) {
//     ptcArray.push(new Particle());
//   }

// } //初回実行関数

// // ---------------------------------------------------------------------

// /**
//  * 繰り返し実行される処理
//  */
// function draw() {

//   // スタイルをリセット
//   noStroke();
//   background('skyblue');

//   // 粒子の描画
//   ptcArray.forEach(function (p, index) {
//     p.update();
//     p.draw();
//   })


// } //繰返実行関数


// /**
//  * クラスの定義
//  */
// class Particle {
//   constructor() {
//     // 座標
//     this.pos = createVector(random(width), random(height));
//     // 大きさ
//     this.r = 10;
//     // 速さ
//     this.v = createVector(random(-2, 2), random(-2, 2));

//   }


//   // 粒子の移動操作関数
//   update() {
//     this.pos.add(this.v);
//     this.reflection();
//   }

//   // 描画関数
//   draw() {
//     // 粒子の色を定義
//     fill(255, 255, 255, random(30, 250));
//     // 粒子描画
//     ellipse(this.pos.x, this.pos.y, this.r, this.r);
//   }

//   // 粒子反射関数
//   reflection() {
//     if (this.pos.x < 0 || this.pos.x > width) {
//       this.v.x *= -1;
//     }
//     if (this.pos.y < 0 || this.pos.y > height) {
//       this.v.y *= -1;
//     }
//   }



// }


// // -以下、不要---------------------------------------------------



// // // 描画速度
// // var rate = 1;
// // // 描画回数をカウント
// // var loopCount = 0;
// // // カウントアップ
// // loopCount += 1;
