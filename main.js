import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' ;

//With every project we need 3 objects
//SCENE
//Camera
//Renderer

const scene = new THREE.Scene() ;
//scene its like container that holds cameras and light 
//to look into the scene we need cameras 
    /* Many types of cameras :
  ArrayCamera
  Camera
  CubeCamera
  OrthographicCamera
  PerspectiveCamera <=== The most Used
  StereoCamera
  */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000) ;
// the first argument is the field of vue 
// the second argument is the aspect ratio based on the user browser window
// the last arguments s view frustrum to control with objects are visible relative to camera 


const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg') ,
}) ;
// renderer where to maka magic happen 

renderer.setPixelRatio(window.devicePixelRatio) ;
renderer.setSize(window.innerWidth,window.innerHeight) ;
camera.position.setZ(30) ;


renderer.render(scene,camera) ;

// the result now from line 1 to 38 the screen is black 
// so we need an objects 
//First we need GEOMETRY !!important {x,y,z}


///TORUS///////////////////////

const geometry = new THREE.TorusGeometry(10,3,16,100) ;

//now material = color == the wrappin paper for an objct
//to create custom shaders like webgL

const material = new THREE.MeshStandardMaterial({color : 0xFF6347 }) ;
// wireframe to get better look at geometry 
//now MESH its Geometry + material 
const torus = new THREE.Mesh(geometry,material) ;
scene.add(torus)

///////////////////////////////////////


//LIGHT//////////////////////////////

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight,ambientLight)

////////////////////////////////////


const controls = new OrbitControls(camera,renderer.domElement) ;
// renderer dom element help us to controll element with mouse

//the object of the next function is to add more objects 

//STAR////////////
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24) ;
  //redius = 0.25 
  const material = new THREE.MeshStandardMaterial( {color : 0xffffff})

  const star = new THREE.Mesh(geometry,material) ; 

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) )
  // random postion of stars from -100 to 100

  star.position.set(x,y,z) ;
  scene.add(star)


}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('world.jpg')
scene.background = spaceTexture ;


//we can addd texture materials : texture mapping is the materials of 2D we can collect and mapping them to 3D 

/////////////////////////////////////////////



//now we get our object 
// now we need to do a loop 
//const lighthelper = new THREE.PointLightHelper(pointLight)
// lighthelper will shows positoin of point light 
//const gridHelper = new THREE.GridHelper(200,50)
//scene.add(lighthelper,gridHelper)


//Earth/////////////////////////

const earthTexture = new THREE.TextureLoader().load('earth.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture ,
  })
  
  )
  scene.add(earth) ;




////we need now to animated when the userrs scrolls   
function MoveCamera() {
  const t = document.body.getBoundingClientRect().top ; 
  //that will tell us how we are far from the web page 
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075 ;
  earth.rotation.z += 0.05 ;

  camera.position.z = t * -0.01 ;
  camera.position.x = t * -0.0002 ;
  camera.position.y = t * -0.0002 ;

}


document.body.onscroll = MoveCamera
MoveCamera() ;
/////////////////////////


///animatoin loop

function animate () {

  requestAnimationFrame(animate) ;
  torus.rotation.x += 0.01 ;
  torus.rotation.y += 0.002 ;
  torus.rotation.z += 0.01 ;


  controls.update() ;

  renderer.render(scene,camera)
}

animate() ;