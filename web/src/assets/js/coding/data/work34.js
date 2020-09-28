export default {
  id: 34,
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


  // ----------------------------------------------------------------------

  //親要素を取得
  let parent = document.getElementById("parent");

  // 親要素の幅と高さを変数化
  let cW = parent.clientWidth;
  let cH = parent.clientHeight;

  // グローバルでの変数定義
  var renderer, scene, camera, container, controls, hemisphereLight, directionalLight, ambientLight, geometryList, material, mesh;

  // OrbitControls用domElement変数
  let domElement = document.getElementById("myCanvas");

  // カメラ位置
  var cameraPos = {
    x: 0,
    y: 9,
    z: 16
  }

  // ----------------------------------------------------------------------


  /**
   *  キャンバスの描画内容
   */
  const init = () => {

    // rendererインスタンス定義(canvas要素にWebGL使用定義)
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(cW, cH);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap




    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEEEEEE, 0.015);
    camera = new THREE.PerspectiveCamera(
      75,
      cW / cH,
      0.1,
      1000
    );
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

    // ヘミスフィアライトを定義
    hemisphereLight = new THREE.HemisphereLight(0xF8FCFE, 1);
    scene.add(hemisphereLight);

    // mousedragで、カメラ位置変更
    controls = new OrbitControls(camera, domElement);

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



  const addPlane = () => {
    let geo = new THREE.PlaneBufferGeometry(200, 200, 1);
    let mat = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF
    });
    let mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.rotateX(THREE.Math.degToRad(-90))
    scene.add(mesh);
  }


  const boxAmount = 3
  const boxPos = [];
  const boxScale = [];
  let boxGroup = new THREE.Group();

  const addBoxes = () => {
    let geo = new THREE.BoxBufferGeometry(2, 2, 2);
    let mat = new THREE.MeshLambertMaterial({
      color: 0x2ccf6d
    })
    for (let i = 0; i < boxAmount; i++) {
      let mesh = new THREE.Mesh(geo, mat);
      boxPos.push(mesh.position);
      boxScale.push(mesh.scale);
      mesh.position.set(i * 4, 2, 0);
      mesh.castShadow = true;
      boxGroup.add(mesh);
    }
    scene.add(boxGroup);
    boxGroup.position.set(-4, -1, 0);
  }

  const addLights = () => {
    let light = new THREE.SpotLight(0xF3F8FD, 0.2);
    light.position.set(-10, 40, 50);
    light.castShadow = true
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;
    scene.add(light);

    let light2 = new THREE.SpotLight(0xF3F8FD, 0.4, 100);
    light2.position.set(0, 0, 30);
    scene.add(light2);
  }

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
          repeat: -1,
          repeatDelay: 0.25
        }
      }, 'in+=0.1')
      .to(boxPos, {
        y: 2,
        stagger: {
          amount: 0.1,
          repeat: -1,
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
          repeat: -1,
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
          repeat: -1,
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
          repeat: -1,
          repeatDelay: 0.3
        },
        duration: 0.1
      }, 'in+=0.2');
    return tl.timeScale(0.6);
  }

  window.addEventListener("load", () => {
    init();
    addPlane();
    addLights();
    addBoxes();
    animateBoxes();
    render();
  });

  window.addEventListener("resize", () => {
    resize();
  });






}
