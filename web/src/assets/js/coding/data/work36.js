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

//  gsapをnode moduleから読み込み
import gsap from "gsap";
import {
  TimelineMax,
} from 'gsap/all';

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
  var renderer, scene, camera, controls, ambientLight, spotLight, mesh, domElement, canvas;

  // 隣り合うmeshの距離間隔
  var gutter = 1;

  // 列と行
  var grid = {
    cols: 14,
    rows: 6
  };

  // meshの情報を格納する配列
  var meshArray = [];

  // 描画内容を決める関数------------------------------------------------------

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

    // meshを弾ませる関数実行
    hopping();

  } //setup()


  /**
   *  sceneを定義
   */
  function createScene() {

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

  } //createScene()

  /**
   * cameraを定義
   */
  function createCamera() {
    camera = new THREE.PerspectiveCamera(20, cW / cH, 1);
    camera.position.set(0, 30, -50);
    scene.add(camera);

    // mousedragで、カメラ位置変更
    controls = new OrbitControls(camera, canvas);
  } //createCamera()

  /**
   * AmbientLightを定義
   */
  function createAmbient() {
    ambientLight = new THREE.AmbientLight('#2900af', 1);
    ambientLight.intensity = 3;
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

    // containerを定義
    var container = new THREE.Object3D();

    // 並べながらループ生成
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {

        // meshを定義
        var mesh = getMesh();

        // meshの位置を定義
        mesh.position.set(col + (col * gutter), 0, row + (row * gutter));

        // containerにmesh追加
        container.add(mesh);

        // 配列にmesh一つ一つの情報を格納
        meshArray.push(mesh);

      } //for
    } //for

    // containerが中央に配置されるようにする
    const centerX = ((grid.cols - 1) + ((grid.cols - 1) * gutter)) * .5;
    const centerZ = ((grid.rows - 1) + ((grid.rows - 1) * gutter)) * .5;
    container.position.set(-centerX, 0, -centerZ);

    // sceneにcontainerを追加
    scene.add(container);

  } //createGrid()

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

  /**
   * ヘルパー関数-----------------------------------------------------
   */

  /**
   * meshを定義する関数
   */
  const getMesh = () => {
    // materialを定義
    var material = getMaterial();
    // geometryを定義
    var geometry = getGeometry();
    // meshを作成
    mesh = new THREE.Mesh(geometry.geom, material);

    mesh.rotation.x = geometry.rotationX;
    mesh.rotation.y = geometry.rotationY;
    mesh.rotation.z = geometry.rotationZ;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // meshをオブジェクトとして返す
    return mesh;
  }

  /**
   * geometryを決定する関数
   */
  const getGeometry = () => {
    // 3種類のgeometry
    var geometries = [
      new Box(),
      new Cone(),
      new Torus()
    ];
    // ランダムで決定したgeometryをオブジェクトとして返す
    return geometries[Math.floor(Math.random() * Math.floor(geometries.length))];
  } // getGeometry()

  /**
   * materialを決定する関数
   */
  const getMaterial = () => {
    const meshParams = {
      color: '#ff00ff',
      metalness: .58,
      emissive: '#000000',
      roughness: .18,
    };
    // materialをオブジェクトとして返す
    return new THREE.MeshPhysicalMaterial(meshParams);
  } //getMaterial()

  /**
   * 角度をラジアンに変換する関数
   */
  const radians = (degrees) => {
    return degrees * Math.PI / 180;
  } //radians()

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
   * アニメーション関数-----------------------------------------------------
   */

  /**
   * meshを弾ませる関数
   */
  const hopping = () => {

    const tm = new TimelineMax();

    var randomMesh = meshArray[Math.floor(Math.random() * Math.floor(meshArray.length))];

    tm.add("scene1")
      .to(randomMesh.position, {
        y: 3,
      })
      .to(randomMesh.scale, {
        x: 2,
        y: 2,
        z: 2,
      }, "scene1")
      .add("scene2")
      .to(randomMesh.position, {
        y: 0,
        delay: .5
      })
      .to(randomMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        delay: .5
      }, "scene2")

    setTimeout(() => {
      hopping();
    }, Math.random() * 1000);

  } //hopping()

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
    // mousedragでカメラ位置変更
    controls.update();
    // sceneとcameraを常に更新
    renderer.render(scene, camera);
    // animate()関数を連続実行
    requestAnimationFrame(animate);

  } //animate()

} //func
