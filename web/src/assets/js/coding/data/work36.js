export default {
  id: 36,
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

/**
 * 参考
 * https: //goworkship.com/magazine/interactive-effect-threejs/
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

  // ----------------------------------------------------------------------

  //親要素を取得
  let parent = document.getElementById("parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // グローバルでの変数定義
  var renderer, scene, camera, controls, ambientLight, spotLight, material;

  // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 65,
    z: 0
  }

  // 隣り合うmeshの距離間隔
  var gutter = 1;

  // 列と行
  var grid = {
    cols: 14,
    rows: 6
  };


  // ----------------------------------------------------------------------

  /**
   *  キャンバスの基本設定
   */
  function setup() {

    // シーンの定義
    createScene();

    // シーンにカメラを追加
    createCamera();

    // シーンにライトを追加
    createAmbient();
    createSpot();

    // グリッドレイアウトでオブジェクト描画
    createGrid();

    // アニメーション定義
    animate();


  } //setup()


  /**
   *  sceneを定義
   */
  function createScene() {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);
    renderer.setClearColor("#000", 1);

    // sceneインスタンス定義
    scene = new THREE.Scene();

  } //createScene()

  /**
   * cameraを定義
   */
  function createCamera() {
    camera = new THREE.PerspectiveCamera(20, cW / cH, 1);
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    scene.add(camera);

    // mousedragで、カメラ位置変更
    controls = new OrbitControls(camera, domElement);
  } //createCamera()

  /**
   * AmbientLightを定義
   */
  function createAmbient() {
    ambientLight = new THREE.AmbientLight('#2900af', 1);
    scene.add(ambientLight);
  } //createAmbient()

  /**
   * Spotlightを定義
   */
  function createSpot() {
    spotLight = new THREE.SpotLight('#e000ff', 1, 1000);
    spotLight.position.set(0, 200, -200);
    spotLight.intensity = 3;
    spotLight.castShadow = true;
    scene.add(spotLight);
  } //createSpot()

  /**
   * グリッドレイアウト作成
   */
  function createGrid() {

    // コンテナーを定義
    var container = new THREE.Object3D();

    // 並べながらループ生成
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {

        // メッシュを定義
        var mesh = getMesh();

        // メッシュの位置を定義
        mesh.position.set(col + (col * gutter), 0, row + (row * gutter));

        // コンテナーにメッシュ追加
        container.add(mesh);

      } //for
    } //for

    // コンテナーが中央に配置されるようにする
    const centerX = ((grid.cols - 1) + ((grid.cols - 1) * gutter)) * .5;
    const centerZ = ((grid.rows - 1) + ((grid.rows - 1) * gutter)) * .5;
    container.position.set(-centerX, 0, -centerZ);

    scene.add(container);

  } //createGrid()



  /**
   *  リサイズ関数
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
  } //onResize()



  /**
   * ヘルパー関数-----------------------------------------------------
   */

  /**
   * meshを定義する関数
   */
  const getMesh = () => {
    // マテリアルを定義
    var material = getMaterial();
    // ジェオメトリーを定義
    var geometry = getGeometry();
    // メッシュを作成
    var mesh = new THREE.Mesh(geometry.geom, material);
    mesh.rotation.x = geometry.rotationX;
    mesh.rotation.y = geometry.rotationY;
    mesh.rotation.z = geometry.rotationZ;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * ジェオメトリーを決定する関数
   */
  const getGeometry = () => {
    // 3種類のジェオメトリー
    var geometries = [
      new Box(),
      new Cone(),
      new Torus()
    ];
    // ジェオメトリーをランダムで決定
    return geometries[Math.floor(Math.random() * Math.floor(geometries.length))];
  }

  /**
   * マテリアルを決定する関数
   */
  const getMaterial = () => {
    const meshParams = {
      color: '#ff00ff',
      metalness: .58,
      emissive: '#000000',
      roughness: .18,
    };
    return new THREE.MeshPhysicalMaterial(meshParams);
  }

  /**
   * 角度をラジアンに変換する関数
   */
  const radians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  /**
   * オブジェクトクラス-----------------------------------------------------
   */

  class Box {
    constructor() {
      this.geom = new THREE.BoxGeometry(.5, .5, .5);
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
    }
  } //class Box


  class Cone {
    constructor() {
      this.geom = new THREE.ConeBufferGeometry(.3, .5, 32);
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
    }
  } // class Cone

  class Torus {
    constructor() {
      this.geom = new THREE.TorusBufferGeometry(.3, .12, 30, 200);
      this.rotationX = radians(90);
      this.rotationY = 0;
      this.rotationZ = 0;
    }
  } // class Torus

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

  } //animate()

} //func
