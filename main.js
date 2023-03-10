import * as THREE from "./three";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";

/* ==========================================================================
   Three.jsで必ず必要な3要素
   ========================================================================== */

/* シーンを追加
   ----------------------------------------------------------------- */
const scene = new THREE.Scene();

/* カメラを追加
   ----------------------------------------------------------------- */
const camera = new THREE.PerspectiveCamera(
  50, //視野角
  window.innerWidth / window.innerHeight, //アスペクト比
  0.1, //開始距離
  1000 //終了距離
);

camera.position.set(0, 0, +500); //カメラの位置を変更

/* レンダラーを追加
   ----------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ alpha: true }); //alphaオプションは透明度を表している
document.body.appendChild(renderer.domElement); //bodyの中に子要素として挿入する
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);//解像度を調整

/* ==========================================================================
   オブジェクトを作成
   ========================================================================== */

/* テクスチャを追加
   ----------------------------------------------------------------- */
const texture = new THREE.TextureLoader().load("./textures/earth.jpg");

/* ジオメトリを作成
   ----------------------------------------------------------------- */
const ballGeometry = new THREE.SphereGeometry(100, 64, 32);

/* マテリアルを作成
   ----------------------------------------------------------------- */
const ballMaterial = new THREE.MeshPhysicalMaterial({map: texture});

/* メッシュ化してみよう
   ----------------------------------------------------------------- */
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

/* ==========================================================================
   光源の追加
   ========================================================================== */

/* 平行光源の追加
   ----------------------------------------------------------------- */
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

/* ポイント光源の追加
   ----------------------------------------------------------------- */
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);

/* ポイント光源がどこにあるのかを特定する
   ----------------------------------------------------------------- */
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

/* ポイント光源を公転させる
   ----------------------------------------------------------------- */
function animete() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  renderer.render(scene, camera);
  requestAnimationFrame(animete);
}

animete();

/* ==========================================================================
   マウス操作を可能にする
   ========================================================================== */
const controls = new OrbitControls(camera, renderer.domElement);


/* ==========================================================================
   ブラウザにレンダリング
   ========================================================================== */
renderer.render(scene, camera);
