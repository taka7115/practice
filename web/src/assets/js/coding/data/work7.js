export default {
  id: 7,
  ttl: "<span>C</span>anvasで<br class='u-sp'>円の反射運動を表現する<br>【アークタンジェントの活用】",
  txt: "Canvasで<br>美しい円形運動を<br>描画する【アークタンジェントの活用】",
  alt: "Canvasで美しい円形運動を描画する【アークタンジェントの活用】",
  p1: "Math.atan2()を使って反射角を求める。",
  p1_color: "js-yellow",
  p1_list1: "JavaScriptの59行目。Math.atan2()により、衝突する2つの円の反射角を求めます。",
  p1_list2: "<span data='dot'>&#9642;</span><a href='https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2' target='_blank'>Math.atan2()の使い方</a>",
  p2: "",
  p2_color: "",
  p2_list1: "",
  p2_list2: "",
  p3: "",
  p3_color: "",
  p3_list1: "",
  p3_list2: "",
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

    // ------------------------------------------------------------------

    // 円の描画&アニメーションに必要な値をオブジェクト化しておく
    let val = {
      quantity: 50,
      radius: 20,
      colorArray: [
        ["#F27EBE", "#fff5fa"],
        ["#3DF2BF", "#e6fff8"],
        ["#05AFF2", "#def6ff"],
        ["#F2E085", "#fffae0"],
        ["#F24822", "#ffd1c7"],
      ],
      velocityRange: 5,
      strokeWidth: 2
    }

    // ------------------------------------------------------------------

    // ユーティリティー関数

    //円のスピードの反転
    function rotate(velocity, angle) {
      const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
      }
      return rotatedVelocities;
    }

    //円の反射
    function resolveCollision(particle, otherParticle) {
      const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
      const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

      const xDist = otherParticle.x - particle.x;
      const yDist = otherParticle.y - particle.y;

      // Prevent accidental overlap of particles
      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        //Grab angle between the Two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)

        //Store mass invar for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        //Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);


        //Velocity after 1d collision equation
        const v1 = {
          x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
          y: u1.y
        };
        const v2 = {
          x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
          y: u2.y
        };


        //Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        //Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
      }
    }

    // 円の描画座標出力
    function randomIntFromRange(area, radius) {
      return Math.floor(Math.random() * (area - radius + 1) + radius);
    }

    // 円と円の距離を測る
    function distance(x1, y1, x2, y2) {
      const xDist = x2 - x1;
      const yDist = y2 - y1;
      return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }

    // ------------------------------------------------------------------

    //関数オブジェクトを設定
    function Particle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.velocity = {
        x: (Math.random() - 0.5) * val.velocityRange,
        y: (Math.random() - 0.5) * val.velocityRange
      }
      this.radius = radius;
      this.mass = 1;
      // colorArrayに格納された色をランダムに割り振る
      this.color = val.colorArray[Math.floor(Math.random() * val.colorArray.length)];
      this.stroke = this.color[0];
      this.fill = this.color[1];

      // 円を描画する処理
      this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.fill;
        c.fill();
        c.lineWidth = val.strokeWidth;
        c.strokeStyle = this.stroke;
        c.stroke();
      }

      // 座標をズラしながら円を描画していく処理
      this.update = particles => {

        // 円を描画する
        this.draw();

        //円と円がぶつかったら円を反転させる
        for (let i = 0; i < particles.length; i++) {
          if (this === particles[i]) continue;
          if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
            resolveCollision(this, particles[i]);
          }
        }

        // 範囲の端にきたら折り返す処理
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        } else if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }

        // 座標の値を変えていく
        this.x += this.velocity.x;
        this.y += this.velocity.y;

      }

    }

    // ------------------------------------------------------------------

    // 変数をグローバルに置いておく
    let particles;

    // 円それぞれの値を配列に格納する関数
    function init() {

      // 格納する配列
      particles = []

      // 円の値を円の個数分出力し、それぞれの円の値を配列に格納する
      for (let i = 0; i < val.quantity; i++) {
        // 円の半径
        const radius = val.radius;
        // 円の初期x座標
        let x = randomIntFromRange(canvas.width, radius);
        // 円の初期y座標
        let y = randomIntFromRange(canvas.height, radius);

        // 円が重ならないか確認
        if (i !== 0) {
          for (let j = 0; j < particles.length; j++) {
            if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
              // 重なってたら、再度円の座標を生成
              x = randomIntFromRange(canvas.width, radius);
              y = randomIntFromRange(canvas.height, radius);

              // もう一度jの処理を行うため、jを1減算
              j = -1;
            }
          }
        }

        //値を配列に格納していく
        particles.push(new Particle(x, y, radius));
      }

    }

    // ------------------------------------------------------------------

    // 円を描画&アニメーションさせる関数
    function animate() {

      // animate関数をループさせる関数
      requestAnimationFrame(animate);

      // 指定した範囲の描画内容をリセットする
      c.clearRect(0, 0, canvas.width, canvas.height);

      // update関数をそれぞれの円で実行
      particles.forEach(particle => {
        particle.update(particles);
      });

    }

    // ------------------------------------------------------------------

    // init関数の実行
    init();
    // animate関数の実行
    animate();

  }

}
