export default {
  id: 31,
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
// orbitControls.jsをnode moduleから読み込み
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

function func() {

  /**
   *  createdのタイミングでinit()関数実行
   */
  window.addEventListener('load', init);

  // ----------------------------------------------------------------------

  //親要素を取得
  let parent = document.getElementById("parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // グローバルでの変数定義
  var renderer, scene, camera, controls, directionalLight, geometry, material, sphere, loader, texture;

  // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 1,
    y: 1,
    z: 500
  }

  // 光源位置
  var lightPos = {
    x: -.3,
    y: .7,
    z: .6
  }

  // ----------------------------------------------------------------------

  /**
   *  キャンバスの描画内容
   */
  function init() {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);
    renderer.setClearColor("rgb(0, 0, 30)", 1);

    // シーンを定義
    scene = new THREE.Scene();

    // シーンにカメラを定義
    camera = new THREE.PerspectiveCamera(45, cW / cH, 1, 30000);
    // mousedragで、カメラ位置変更
    controls = new OrbitControls(camera, domElement);
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    scene.add(camera);

    // シーンに光源(シーンを照らす光)を定義
    directionalLight = new THREE.DirectionalLight('#fff');
    directionalLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    directionalLight.intensity = 1.5;
    scene.add(directionalLight);

    // オブジェクトの形式を定義
    geometry = new THREE.SphereGeometry(100, 100, 100);

    // テクスチャ用の画像を読み込む
    loader = new THREE.TextureLoader();
    texture = loader.load('../../../assets/img/coding/page/kv/planet/earth.jpg');

    // オブジェクトの質感を定義
    material = new THREE.MeshStandardMaterial({
      map: texture
    });

    // 定義した形式とスタイルをもとに、オブジェクトを生成
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 常に連続的に描画するため、animate()関数実行
    animate();

  }

  // ----------------------------------------------------------------------

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
    // 球体の自転
    rotation()
    // mousedragでカメラ位置変更
    controls.update();
    // rendererインスタンスにシーンとカメラを渡し、レンダリング
    renderer.render(scene, camera);
    // animate()関数を連続実行
    requestAnimationFrame(animate);
  }

  /**
   * 球体を自転させる関数
   */
  function rotation() {
    sphere.rotation.set(
      0,
      sphere.rotation.y + 0.005,
      sphere.rotation.z + 0.005
    )
  }

}
