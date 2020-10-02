export default {
  id: 32,
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

  /**
   * リサイズイベント発生時に実行
   */
  window.addEventListener('resize', onResize);

  // ----------------------------------------------------------------------

  //親要素を取得
  let parent = document.getElementById("parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // グローバルでの変数定義
  var renderer, scene, camera, container, controls, directionalLight, ambientLight, geometryList, material, mesh;

  // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 800,
    z: 800
  }

  // 光源位置
  var lightPos = {
    x: -.3,
    y: .7,
    z: .6
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

    // 平行光源を定義
    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    scene.add(directionalLight);
    // 環境光源を定義
    ambientLight = new THREE.AmbientLight(0x999999);
    ambientLight.intensity = .5;
    scene.add(ambientLight);

    // コンテナー(7つのジオメトリを体系化したオブジェクト)を定義
    container = new THREE.Object3D();
    scene.add(container);

    // ジオメトリを定義
    geometryList = [
      new THREE.SphereGeometry(40, 40, 40), // 球体
      new THREE.BoxGeometry(75, 75, 75), // 直方体
      new THREE.PlaneGeometry(75, 75), // 平面
      new THREE.TetrahedronGeometry(75, 0), // カプセル形状
      new THREE.ConeGeometry(75, 75, 24), // 三角錐
      new THREE.CylinderGeometry(75, 75, 75, 24), // 円柱
      new THREE.TorusGeometry(75, 20, 12, 75) // ドーナツ形状
    ];

    // geometryList配列をもとにオブジェクトを定義していく
    geometryList.map((geometry, i) => {

      // マテリアルを定義
      material = new THREE.MeshStandardMaterial({
        color: colorArray[i]
      });

      // オブジェクトを定義
      mesh = new THREE.Mesh(geometry, material);

      // オブジェクトを円周上に配置
      mesh.position.x =
        300 * Math.sin((i / geometryList.length) * Math.PI * 2);
      mesh.position.z =
        300 * Math.cos((i / geometryList.length) * Math.PI * 2);

      // container空間にオブジェクトを定義
      container.add(mesh);

    });

    // 常に連続的に描画するため、animate()関数実行
    animate();

  }

  // ----------------------------------------------------------------------

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
    // ジオメトリのグループを自転
    rotation()
    // mousedragでカメラ位置変更
    controls.update();
    // rendererインスタンスにシーンとカメラを渡し、レンダリング
    renderer.render(scene, camera);
    // animate()関数を連続実行
    requestAnimationFrame(animate);
  }


  /**
   *  リサイズ時の調整関数
   */
  function onResize() {
    // 親要素の幅と高さを変数化
    let cW = parent.clientWidth;
    let cH = parent.clientHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);

    // カメラのアスペクト比を正す
    camera.aspect = cW / cH;
    camera.updateProjectionMatrix();
  }

  /**
   * ジオメトリのグループを自転させる関数
   */
  function rotation() {
    container.rotation.set(
      0,
      container.rotation.y + 0.005,
      0
    )
  }



}
