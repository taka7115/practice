// three.jsをnode moduleから読み込み
import * as THREE from 'three';
// orbitControls.jsをnode moduleから読み込み
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";


export default class Canvas {
  constructor() {
    this.parent;
    this.cW;
    this.cH;
  }
  init() {

    this.setting();
    this.top_kv();

  }

  setting() {
    //親要素を取得
    this.parent = document.getElementById("parent");
    // 親要素の幅と高さを変数化
    this.cW = this.parent.clientWidth;
    this.cH = this.parent.clientHeight;
  }

  top_kv() {

    let c_pos = {
      angle: 45,
      range: this.cW / this.cH,
      near: 10,
      far: 5000
    }

    let r_size = 1000;

    // OrbitControls用domElement変数
    let domElement = document.getElementById("myCanvas");

    // グローバルでの変数定義
    var renderer, scene, camera, room, controls, directionalLight, ambientLight, geometryList, material, mesh;

    setting(this);
    init(this);
    animate(this);









    function setting(e) {
      // rendererインスタンス定義(canvas要素にWebGL使用定義)
      renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: true
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(e.cW, e.cH);
      renderer.setClearColor("blue", .2);
    };


    function init(e) {

      // シーンを定義
      scene = new THREE.Scene();

      // カメラを定義
      camera = new THREE.PerspectiveCamera(
        c_pos.angle, //カメラの画角
        c_pos.range, //撮影結果の縦横比。別段指定がなければ、キャンバスの幅 / キャンバスの高さ
        c_pos.near, //ニアークリップの距離。nearより近い領域は非表示
        c_pos.far //ファークリップの距離。farより遠い領域は非表示
      );
      camera.position.set(1, 1, r_size / 2);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);

      // mousedragで、カメラ位置変更
      controls = new OrbitControls(camera, domElement);

      // 平行光源を定義
      directionalLight = new THREE.DirectionalLight("#fff");
      directionalLight.position.set(-10, 10, 10);
      scene.add(directionalLight);
      // 環境光源を定義
      ambientLight = new THREE.AmbientLight("#fff");
      ambientLight.position.set(-10, 10, 10);
      ambientLight.intensity = .5;
      scene.add(ambientLight);

      // 部屋
      var room = new THREE.Object3D();
      scene.add(room);

      // 壁
      function create_wall(sx, sy, px, py, pz) {
        var geometry = new THREE.PlaneGeometry(sx, sy); // 平面
        var material = new THREE.MeshPhongMaterial({
          color: 'blue'
        });
        var wall = new THREE.Mesh(geometry, material);
        wall.position.set(px, py, pz);
        wall.rotation.set(
          0,
          45,
          0
        )
        return wall;
      }

      // モニター
      function create_monitor(sx, sy, sz, px, py, pz) {
        var geometry = new THREE.BoxGeometry(sx, sy, sz); // 平面
        var material = new THREE.MeshPhongMaterial({
          color: 'lime'
        });
        var monitor = new THREE.Mesh(geometry, material);
        monitor.position.set(px, py, pz);
        return monitor;
      }

      room.add(create_wall(e.cW, e.cH, -e.cW / 2, 0, 0));
      room.add(create_monitor(100, 100, 5, 0, 0, 0));

      animate();

      console.log(room)
      console.log(room.monitor)
      console.log(scene)

    };


    /**
     *  常に連続的に描画するためのアニメーション関数
     */
    function animate(e) {
      // mousedragでカメラ位置変更
      controls.update();
      // rendererインスタンスにシーンとカメラを渡し、レンダリング
      renderer.render(scene, camera);
      // animate()関数を連続実行
      requestAnimationFrame(animate);
    }




  }



};
