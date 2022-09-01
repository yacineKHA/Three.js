import './style.css'
import * as THREE from 'three'
import  gsap from "gsap";
import {euclideanModulo} from "three/src/math/MathUtils";


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

//times
const clock = new THREE.Clock(true)

document.addEventListener('keydown', (event)=>{
    let name = event.key;
    if (name === 'x'){
        gsap.to(mesh.position, {duration:1, delay:0, x: 2})
        gsap.to(mesh.position, {duration:1, delay:0.4, x: 0})
    }

})



const frame = ()=>{
    // //current Time
    // const currentTime = Date.now()
    //
    // //delta = diff entre time et current time
    // const deltaTime = currentTime - time
    // time = currentTime
    // clock
    //Clock.getElapsedTime est a utiliser à la place de Date et currentTime
    //permet de régler l'animation de la meme manière peu
    //importe le framerate de l'écran
    // const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime)
    // mesh.position.x =  Math.sin(elapsedTime)
    // mesh.position.y =  Math.cos(elapsedTime)
    renderer.render(scene, camera)
    //sert a rappeler à chaque fois la meme fonction, ce qui
    //crée l'effet d'animation
    window.requestAnimationFrame(frame)
}

frame();

