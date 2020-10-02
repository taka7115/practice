export default {
  id: 35,
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

//  gsapをインポート
import gsap from "gsap";

function func() {

  // ----------------------------------------------------------------------

  //親要素を取得
  let parent = document.getElementById("parent");

  // キャンバス要素の取得
  let canvas = document.querySelector('#myCanvas');

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // グローバルでの変数定義
  var renderer, scene, camera, controls, hemisphereLight, spotLight, geo, mat, plane, box;

  // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 9,
    z: 16
  }

  // ----------------------------------------------------------------------

  // createdのタイミングで関数実行
  window.addEventListener("load", () => {
    init();
    addPlane();
    addBoxes();
  });

  // リサイズのタイミングで関数実行
  window.addEventListener("resize", () => {
    resize();
  });

  // キャンバス内をクリックしたらボックスのアニメーション開始
  canvas.addEventListener("click", () => {
    animateBoxes();
  });

  // ----------------------------------------------------------------------

  /**
   *  キャンバスの描画内容
   */
  const init = () => {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas
    });
    renderer.setSize(cW, cH);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("black");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // シーンを定義
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEEEEEE, 0.015);

    // カメラを定義
    camera = new THREE.PerspectiveCamera(
      75,
      cW / cH,
      0.1,
      1000
    );
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

    // mousedragで、カメラ位置変更
    controls = new OrbitControls(camera, domElement);

    // ヘミスフィアライトを定義(空の色, 地の色, 光の強さ)
    hemisphereLight = new THREE.HemisphereLight("#fff", "#000");
    hemisphereLight.position.set(0, 100, 0);
    hemisphereLight.intensity = .2;
    scene.add(hemisphereLight);

    // スポットライトを定義(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
    spotLight = new THREE.SpotLight("#fff");
    spotLight.castShadow = true;
    spotLight.intensity = 1;
    spotLight.position.set(0, 30, 30);
    scene.add(spotLight);

    // 常に連続的に描画するため、animate()関数実行
    animate();

  };

  // ----------------------------------------------------------------------

  /**
   *  常に連続的に描画するためのアニメーション関数
   */
  const animate = () => {
    // mousedragでカメラ位置変更
    controls.update();
    // rendererインスタンスにシーンとカメラを渡し、レンダリング
    renderer.render(scene, camera);
    // animate()関数を連続実行
    requestAnimationFrame(animate);
  };

  /**
   *  リサイズ時の調整関数
   */
  const resize = () => {
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

  // ボックスが弾む紺色がかった平面を作成
  const addPlane = () => {
    geo = new THREE.PlaneBufferGeometry(50, 50, 1);
    mat = new THREE.MeshLambertMaterial({
      color: "#01314f"
    });
    plane = new THREE.Mesh(geo, mat);
    plane.receiveShadow = true;
    plane.rotateX(THREE.Math.degToRad(-90));
    scene.add(plane);
  }

  /**
   * ボックスの定義
   */
  const boxAmount = 3;
  const boxPos = [];
  const boxScale = [];
  let boxGroup = new THREE.Group();

  const addBoxes = () => {
    geo = new THREE.BoxBufferGeometry(2, 2, 2);
    mat = new THREE.MeshLambertMaterial({
      color: 0x2ccf6d
    });
    for (let i = 0; i < boxAmount; i++) {
      box = new THREE.Mesh(geo, mat);
      boxPos.push(box.position);
      boxScale.push(box.scale);
      box.position.set(i * 4, 2, 0);
      box.castShadow = true;
      boxGroup.add(box);
    }
    scene.add(boxGroup);
    boxGroup.position.set(-4, -1, 0);
  }

  /**
   * ボックスのアニメーション関数
   * ※ボックスのアニメーションをループさせたいときは
   * repeat: -1,にする
   */
  const animateBoxes = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.15,
        ease: "sine.inOut"
      }
    })
    tl.to(boxPos, {
        y: 5.2,
        stagger: {
          amount: 0.12,
          repeat: 2,
          repeatDelay: 0.25
        }
      }, 'in+=0.1')
      .to(boxPos, {
        y: 2,
        stagger: {
          amount: 0.1,
          repeat: 2,
          repeatDelay: 0.25
        },
        ease: "sine.in"
      }, 'in+=0.25')
      .to(boxScale, {
        y: 0.8,
        x: 1.24,
        z: 1.24,
        stagger: {
          amount: 0.1,
          repeat: 2,
          repeatDelay: 0.3
        },
        duration: 0.1,
        ease: "circ.out"
      }, 'in')
      .to(boxScale, {
        y: 1.2,
        x: 1,
        z: 1,
        stagger: {
          amount: 0.1,
          repeat: 2,
          repeatDelay: 0.3
        },
        duration: 0.1,
        ease: "power1.in"
      }, 'in+=0.1')
      .to(boxScale, {
        y: 1,
        x: 1,
        z: 1,
        stagger: {
          amount: 0.1,
          repeat: 2,
          repeatDelay: 0.3
        },
        duration: 0.1
      }, 'in+=0.2');
    return tl.timeScale(0.6);
  }
}
