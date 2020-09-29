export default {
  id: 33,
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
  var renderer, scene, camera, group, controls, pointLight, lightHelper, ambientLight, geometry, material, mesh;

  // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 500,
    z: 500
  }

  // 光源位置
  var lightPos = {
    x: 0,
    y: 0,
    z: 0
  }

  // オブジェクトの配色
  var colorArray = ["turquoise", "lime", "yellow", "blue", "pink", "purple", "red"]

  // ----------------------------------------------------------------------

  /**
   *  キャンバスの描画内容
   */
  function init() {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);
    renderer.setClearColor("grey", .2);

    // シーンを定義
    scene = new THREE.Scene();

    // シーンにfog効果設定
    scene.fog = new THREE.Fog(0x000000, 200, 1500);

    // カメラを定義
    camera = new THREE.PerspectiveCamera(
      45,
      cW / cH,
      1,
      10000
    );
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // mousedragで、カメラ位置変更
    controls = new OrbitControls(camera, domElement);

    // 点光源を定義
    pointLight = new THREE.PointLight("#fff", 3, 5000, .5);
    pointLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    scene.add(pointLight);
    // 環境光源を定義
    ambientLight = new THREE.AmbientLight("#999");
    ambientLight.intensity = .5;
    scene.add(ambientLight);

    // グループを定義
    group = new THREE.Group();
    scene.add(group);

    // オブジェクトを定義
    geometry = new THREE.BoxBufferGeometry(50, 50, 50);


    // グループにオブジェクトを複数定義
    for (var i = 0; i < 500; i++) {
      material = new THREE.MeshStandardMaterial({
        color: colorArray[Math.floor(Math.random() * colorArray.length)]
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 2000;
      mesh.position.y = (Math.random() - 0.5) * 2000;
      mesh.position.z = (Math.random() - 0.5) * 2000;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      // グループに格納する
      group.add(mesh);
    }

    // 常に連続的に描画するため、animate()関数実行
    animate();

  }

  // ----------------------------------------------------------------------

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
    // mousedragでカメラ位置変更
    controls.update();
    // rendererインスタンスにシーンとカメラを渡し、レンダリング
    renderer.render(scene, camera);
    // animate()関数を連続実行
    requestAnimationFrame(animate);
  }



}
