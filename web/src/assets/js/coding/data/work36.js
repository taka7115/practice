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
  var renderer, scene, camera,controls,mouse3D, geometry, geometries, ambientLight, spotLight, rectAreaLight, pointLight, groupMesh, floor, material, mesh;

    // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 65,
    z: 0
  }


      var gutter = {
      size: 1
    };

  var meshes = [];

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
    createRectArea();
    createPoint();

    // シャドーフロアを追加
    addFloor()

    mouse3D = new THREE.Vector2();

        // グリッドレイアウト作成
    createGrid();

    // 繰返し描画関数
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

    scene = new THREE.Scene();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);
    renderer.setClearColor("#000", 1);


    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  } //createScene()

  /**
   * cameraを定義
   */
  function createCamera() {
    camera = new THREE.PerspectiveCamera(20, cW / cH, 1);

    // set the distance our camera will have from the grid
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

    // we rotate our camera so we can get a view from the top
    camera.rotation.x = -1.57;

    scene.add(camera);

    // mousedragで、カメラ位置変更
controls = new OrbitControls(camera, domElement);

  } //createCamera()

  /**
   * AmbientLightを定義
   */
  function createAmbient() {
    ambientLight = new THREE.AmbientLight('#2900af', 1);
    // ambientLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    scene.add(ambientLight);
  } //createAmbient()

  /**
   * Spotlightを定義
   */
  function createSpot() {
    spotLight = new THREE.SpotLight('#e000ff ', 1, 1000);
    spotLight.position.set(0, 200, -200);
    spotLight.intensity = 3;
    spotLight.castShadow = true;
    scene.add(spotLight);
  } //createSpot()

  /**
   * RectAreaLightを定義
   */
  function createRectArea() {
    rectAreaLight = new THREE.RectAreaLight('#0077ff', 1, 2000, 2000);
    rectAreaLight.position.set(5, 50, 50);
    rectAreaLight.lookAt(0, 0, 0);
    scene.add(rectAreaLight);
  } //createRectArea()

  /**
   * createPointを定義
   */
  function createPoint() {
    pointLight = new THREE.PointLight('#fff', 1, 1000, 1);
    pointLight.position.set(0, 0, -500);
    scene.add(pointLight);
  } //createPoint()


  /**
   * グリッドレイアウト作成
   */
  function createGrid() {

    // コンテナーとしてグループ作成
    groupMesh = new THREE.Object3D();
    const meshParams = {
      color: '#ff00ff',
      metalness: .58,
      emissive: '#000000',
      roughness: .18,
    };

    // メッシュを作成
    material = new THREE.MeshPhysicalMaterial(meshParams);

    // 並べながらループ生成
    for (let row = 0; row < grid.rows; row++) {
      meshes[row] = [];

      for (let col = 0; col < grid.cols; col++) {
        geometry = getRandomGeometry();
        mesh = getMesh(geometry.geom, material);

        mesh.position.set(col + (col * gutter.size), 0, row + (row * gutter.size));
        mesh.rotation.x = geometry.rotationX;
        mesh.rotation.y = geometry.rotationY;
        mesh.rotation.z = geometry.rotationZ;

        // store the initial rotation values of each element so we can animate back
        mesh.initialRotation = {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        };

        groupMesh.add(mesh);

        // store the element inside our array so we can get back when need to animate
        meshes[row][col] = mesh;
      }
    }

    //center on the X and Z our group mesh containing all the grid elements
    const centerX = ((grid.cols - 1) + ((grid.cols - 1) * gutter.size)) * .5;
    const centerZ = ((grid.rows - 1) + ((grid.rows - 1) * gutter.size)) * .5;
    groupMesh.position.set(-centerX, 0, -centerZ);

    scene.add(groupMesh);

  } //createGrid()


  /**
   * シャドーフロア作成
   */
  function addFloor() {
    geometry = new THREE.PlaneGeometry(100, 100);
    material = new THREE.ShadowMaterial({ opacity: .3 });

    floor = new THREE.Mesh(geometry, material);
    floor.position.y = 0;
    floor.receiveShadow = true;
    floor.rotateX(- Math.PI / 2);

    scene.add(floor);
  }

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
    // rendererインスタンスにシーンとカメラを渡し、レンダリング
    renderer.render(scene, camera);
    // animate()関数を連続実行
    requestAnimationFrame(animate);
  } //animate()


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
  } //onResize()



  /**
   * オブジェクトクラス-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
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
      this.rotationZ = radians(-180);
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
   * ヘルパー関数-----------------------------------------------------
   */

  /**
   * 角度をラジアンに変換する関数
   */
  const radians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  /**
   * 形状の違うオブジェクトをランダムに出力する関数
   */
  const getRandomGeometry = () => {
        geometries = [
      new Box(),
      new Cone(),
      new Torus()
     ];
    return geometries[Math.floor(Math.random() * Math.floor(geometries.length))];
  }

  /**
   * ジオメトリとマテリアルをもとにメッシュを作成する関数
   */
  const getMesh = (geometry, material) => {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

}
