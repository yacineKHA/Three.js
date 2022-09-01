import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//scene
 const scene = new THREE.Scene()

//Object
const group = new THREE.Group()
group.position.y = 1
scene.add(group)



//Methode1
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// const mesh = new THREE.Mesh(geometry, material)

//Methode2
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:'green'})
)
group.add(cube2)



// mesh.position.x = -1
// mesh.position.z = 1
// mesh.position.y = 0.3
// scene.add(mesh)
//setPosition permet de régler position sur tous les axes.
// mesh.position.set(0, 0, 0)
cube2.position.x = -2
console.log()

//ROTATION
//Pi permet de faire (3.14159) une rotation droite
//Pi *0.5 ou * 0.25 des rotations par angles
//reorder permet d'empecher le gimbal lock a cause du XYZ ordre de base
//reorder doit etre fait avant les rotations
// mesh.rotation.reorder('YXZ') //surtt pour game FPS
// mesh.rotation.x = Math.PI*0.25
// mesh.rotation.y = Math.PI*0.25


//Axes helper
const axesHelper = new THREE.AxesHelper()
const gridHelper = new THREE.GridHelper()
scene.add(axesHelper)
scene.add(gridHelper)

//Sizes
const sizes = {
    width: 900,
    height: 700
}

//Scale
// mesh.scale.x = 2
// mesh.scale.Y = 1
// mesh.scale.z = 1
// mesh.scale.set(2, 0.5, 0.5)

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 4
camera.position.y = 1
scene.add(camera)
const control = new OrbitControls(camera, document.querySelector('canvas.webgl'))

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = ()=>{

    control.update()

    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();

//LookAt permet de fixer l'objet automatiquement.
// camera.lookAt(mesh.position)


//Renderer

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)