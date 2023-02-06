import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const duck = new URL('../assets/lela.glb', import.meta.url)
let model;
let ecena = window;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf1f);

const directionallight = new THREE.DirectionalLight(0xffffff, 1.2);
directionallight.position.y = 10;
directionallight.position.z = 10;
scene.add(directionallight)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)
//const lightHelper = new THREE.DirectionalLightHelper(directionallight);
//scene.add(lightHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0,0,5)

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;
orbit.enablePan = true;
orbit.enableDamping = true
orbit.maxDistance = 5;
orbit.minDistance = 4.5;
orbit.enableDamping= true;
orbit.rotateSpeed = 0.06;
orbit.panSpeed = 0.03;
orbit.update();

const assetLoader = new GLTFLoader();
assetLoader.load(duck.href, function(gltf){
    model = gltf.scene;
    scene.add(model);
    model.position.set(0,-1,0);
    model.scale.y = 12;
    model.scale.x = 12;
    model.scale.z = 12;
    model.position.y = .1;
    renderer.setAnimationLoop(()=> {animate(model,true)})
}, undefined, function(error) {
    console.error(error);
});


function animate (obj,val) {
    if (val) {
    obj.rotation.y += 0.000001;
    }
    renderer.render(scene, camera)
}


renderer.setAnimationLoop(()=> {animate(model,true)})

ecena.addEventListener('touchstart', () => {
    renderer.setAnimationLoop(()=> {animate(model,false)})
})
ecena.addEventListener('touchend', () => {
    renderer.setAnimationLoop(()=> {animate(model,true)})
})

