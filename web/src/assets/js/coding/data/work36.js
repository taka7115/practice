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

//  gsapをimport
import gsap from "gsap";


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
  var renderer, scene, camera, raycaster, gutter, meshes, grid, mouse3D, geometries, directionalLight, ambientLight, geometryList, material, mesh;


  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 65,
    z: 0
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
   *  キャンバスの基本設定
   */
  function setup() {

    // handles mouse coordinates mapping from 2D canvas to 3D world
    raycaster = new THREE.Raycaster();

    gutter = {
      size: 1
    };
    meshes = [];
    grid = {
      cols: 14,
      rows: 6
    };

    mouse3D = new THREE.Vector2();
    geometries = [
      new Box(),
      new Torus(),
      new Cone()
    ];

    window.addEventListener('mousemove', onMouseMove.bind(), {
      passive: true
    });

    // we call this to simulate the initial position of the mouse cursor
    onMouseMove({
      clientX: 0,
      clientY: 0
    });




  }






  /**
   *  キャンバスの描画内容
   */
  function createScene() {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
      antialias: true,
      alpha: true
    });

    scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(cW, cH);
    renderer.setClearColor("grey", .2);


    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;



    // 常に連続的に描画するため、animate()関数実行
    animate();

  } //createScene



  function createCamera() {
    camera = new THREE.PerspectiveCamera(20, cW / cH, 1);

    // set the distance our camera will have from the grid
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

    // we rotate our camera so we can get a view from the top
    camera.rotation.x = -1.57;

    scene.add(camera);




  }

  // 平行光源を定義
  // directionalLight.position.set(lightPos.x, lightPos.y, lightPos.z);



  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  function animate() {
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
   * のオブジェクトクラス-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
   */

  class Box {
    constructor() {
      this.geom = new THREE.BoxGeometry(.5, .5, .5, .02, .2);
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
    }
  }


  /**
   * Coneのオブジェクトクラス-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
   */

  class Cone {
    constructor() {
      this.geom = new THREE.ConeBufferGeometry(.3, .5, 32);
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = radians(-180);
    }
  }





  /**
   * Torusのオブジェクトクラス-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
   */

  class Torus {
    constructor() {
      this.geom = new THREE.TorusBufferGeometry(.3, .12, 30, 200);
      this.rotationX = radians(90);
      this.rotationY = 0;
      this.rotationZ = 0;
    }
  }


  /**
   * ヘルパー関数-----------------------------------------------------
   */


  const onMouseMove = (clientX, clientY) => {
    mouse3D.x = (clientX / cW) * 2 - 1;
    mouse3D.y = -(clientY / cH) * 2 + 1;
  }

  /**
   * 角度をラジアンに変換する関数
   */
  const radians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  /**
   * 2点間の距離を求める関数
   */
  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  /**
   * マッピング関数
   */
  const map = (value, start1, stop1, start2, stop2) => {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
  }

  /**
   * オブジェクトをランダムに配置する関数
   */
  const getRandomGeometry = () => {
    return this.geometries[Math.floor(Math.random() * Math.floor(this.geometries.length))];
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
