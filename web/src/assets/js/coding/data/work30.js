export default {
  id: 30,
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


// three.jsをnode moduleから読み込み
import * as THREE from 'three';

function func() {

  /**
   *  createdのタイミングでinit()関数実行
   */
  window.addEventListener('load', init);

  // ---------------------------------------------------------------------------------------------------

  //親要素を取得
  let parent = document.getElementById("parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // 変数のグローバル定義
  let scene, camera, directionalLight, geometry, material, box;

  // rendererインスタンス定義(canvas要素にWebGL使用定義)
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });

  // rendererインスタンスにキャンバスのプロパティを定義
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(cW, cH);
  renderer.setClearColor("rgb(255, 255, 200)", 1);

  // ---------------------------------------------------------------------------------------------------

  /**
   *  キャンバスの描画内容
   */
  function init() {

    // sceneはこれから描画していく3D世界
    scene = new THREE.Scene();

    // シーンの状態を撮影するカメラ。 カメラに写った内容が最終的にブラウザ上で表示される
    // THREE.PerspectiveCamera(fov, aspect, near, far);
    // fov:カメラの画角
    // aspect:撮影結果の縦横比。別段指定がなければ、キャンバスの幅 / キャンバスの高さ
    // near:ニアークリップの距離。nearより近い領域は非表示
    // far:ファークリップの距離。farより遠い領域は非表示
    camera = new THREE.PerspectiveCamera(45, cW / cH, 1, 30000);

    // カメラの位置。camera.position.set(x, y, z);
    // 中心から手前に1000の位置にカメラを置く。
    camera.position.set(1, 1, 500);

    // シーンにカメラを定義
    scene.add(camera);

    // 光源(シーンを照らす光)
    directionalLight = new THREE.DirectionalLight('#fff');
    // (0, .7, .7)であれば上方向と手前方向、つまり斜め上前からの光
    directionalLight.position.set(0, .7, .7);
    // シーンに光源を定義
    scene.add(directionalLight);

    // オブジェクトの形式を定義。GeometryにはBoxの他にもCube、Sphere、
    // Plane、Cone、Cylinder、Torusがある
    geometry = new THREE.BoxGeometry(50, 50, 50);

    // オブジェクトの表面のスタイルの定義
    material = new THREE.MeshPhongMaterial({
      color: 'lime'
    });

    // 定義した形式とスタイルをもとに、オブジェクトを生成
    box = new THREE.Mesh(geometry, material);
    scene.add(box);

    // 常に連続的に描画するため、animate()関数実行
    animate();

  }

  // ---------------------------------------------------------------------------------------------------

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
    requestAnimationFrame(animate);
    // rendererインスタンスにシーンとカメラを渡し、レンダリング
    renderer.render(scene, camera);
    rotation();
  }

  /**
   *  オブジェクトを回転させる関数
   */
  function rotation() {
    box.rotation.set(
      0,
      box.rotation.y + 0.01,
      box.rotation.z + 0.01
    )
  }

}
