

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

import './style.css';

const scene = new THREE.Scene(); //scene is a container for all the objects in the scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#bg'),
  }
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color:0x00a1c9 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);



const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight,ambientLight);



const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color:'white' });
  const star = new THREE.Mesh(geometry, material);

  const[x ,y ,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
 
  star.position.set(x,y,z);
  scene.add(star);



}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('moon-landscape1.jpg');
scene.background = spaceTexture;


//Zenitsu

const zenTexture = new THREE.TextureLoader().load('galaxy-space.jpg');

const zen = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshStandardMaterial({ map:zenTexture })
)

scene.add(zen);


//moonlanding

const moonTexture = new THREE.TextureLoader().load('moon.png');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)

scene.add(moon);

moon.position.z = 32;
moon.position.setX(-10);

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  zen.rotation.y +=0.01;
  zen.rotation.z +=0.01;

  camera.position.z= t * -0.01;
  camera.position.x= t* -0.0002;
  camera.rotation.y= t* -0.0002;
}

document.body.onscroll = moveCamera



function animate(){
  requestAnimationFrame(animate);


  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.x += 0.01;

  controls.update();
   renderer.render(scene,camera);
}

animate();