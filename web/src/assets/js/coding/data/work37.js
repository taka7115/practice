export default {
  id: 37,
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
   * createdのタイミングでsetup() 関数実行
   */
  window.addEventListener('load', setup);

  /**
   * リサイズイベント発生時に実行
   */
  window.addEventListener('resize', onResize);





  //親要素を取得
  let parent = document.getElementById("parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // グローバルでの変数定義
  var renderer, scene, camera, controls, ambientLight, spotLight, material, geometry, mesh, domElement, canvas;

  let rot = 0;

  function setup() {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    // 親要素にレンダラーのcanvasを追加
    canvas = parent.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);
    renderer.setClearColor("#000", 1);

    // sceneインスタンス定義
    scene = new THREE.Scene();

    //cameraを作成
    camera = new THREE.PerspectiveCamera(45, cW / cH, 1, 2000);
    camera.position.set(0, 0, 1000);


    starField();

    //初回実行
    tick();

  } //setup


  function starField() {
    geometry = new THREE.SphereGeometry(100, 32, 32);
    const SIZE = 5000;
    const LENGTH = 20000;
    for (let i = 0; i < LENGTH; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5)
        )
      );
    }
    material = new THREE.PointsMaterial({
      color: '0xffffff',
      size: 5
    });
    mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }






  //実行するための関数
  function tick() {
    rot += 0.1;

    //アニメーション処理
    const radian = (rot * Math.PI) / 180;
    camera.position.x = Math.sin(radian) * 2000;
    camera.position.z = Math.cos(radian) * 1000;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //レンダリング
    renderer.render(scene, camera);

    //自分自身を呼び続ける
    requestAnimationFrame(tick);
  }



  /**
   *  リサイズ関数
   */
  function onResize() {
    // 親要素の幅と高さを変数化
    cW = parent.clientWidth;
    cH = parent.clientHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);

    // カメラのアスペクト比を正す
    camera.aspect = cW / cH;
    camera.updateProjectionMatrix();
  } //onResize()




} //func
