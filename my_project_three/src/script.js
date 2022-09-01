import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {MeshBasicMaterial, TextureLoader} from "three";


// Debug
const gui = new dat.GUI()


/*
* Textures loader
 */
const textureLoader = new TextureLoader()
const colorTexture = textureLoader.load( 'textures/wood_plank_wall_diff_4k.jpg')
const displacementTexture = textureLoader.load( 'textures/wood_plank_wall_disp_4k.png')
const normalTexture = textureLoader.load( "textures/wood_plank_wall_nor_gl_4k.exr")
const roughTexture = textureLoader.load( 'textures/wood_plank_wall_rough_4k.exr')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Materials
const material = new THREE.MeshStandardMaterial()
material.map = colorTexture
material.displacementMap = displacementTexture
material.displacementScale = .5
material.normalScale.set(-0.5, -0.5)
material.roughnessMap = roughTexture

gui.add(material, "metalness", 0, 1)
gui.add(material, "roughness", 0, 50)

//Points material
const mate = new THREE.PointsMaterial({
    size: 0.03,
    color: "white"
})

//Objects
const particleGeometry = new THREE.BufferGeometry()
const particlesCount = 5000;

//lenght = nombre de points ici 10, mulitplié par 3 car 3 points
const posArray= new Float32Array(particlesCount*3)

for (let i = 0; i< particlesCount*3; i ++){
    posArray[i] = (Math.random() - 0.5) *(Math.random()*100)
}
particleGeometry.addAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Mesh
const particlesMesh = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
        color: "white",
        size: 0.01
    })
)

particlesMesh.position.z = 2
scene.add(particlesMesh)

const mesh = new THREE.Points(
    new THREE.SphereBufferGeometry(1, 20, 20),
    mate
)
mesh.position.z = 1

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(8, 8, 40, 40),
    material
)
// scene.add(plane)
scene.add(mesh)


// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.7)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(lightHelper)
gui.add(pointLight, 'intensity').min(0).max(1)
gui.add(pointLight.position, 'x').min(-100).max(100)
gui.add(pointLight.position, 'z').min(-100).max(100)

//ambientLight
const ambientLight = new THREE.AmbientLight('white', 0.1)
scene.add(ambientLight)

/*
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#0b0b0b")


/**
 * Animate
 */

//Mouse
let mouseX = 0
let mouseY = 0

    document.addEventListener("mousemove", (event)=>{
        mouseX = event.clientX
        mouseY = event.clientY
    })

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = .15 * elapsedTime

    particlesMesh.rotation.y = -mouseX * (0.0001)
    particlesMesh.rotation.x = -mouseY * (0.0001)
    // Update Orbital Controls
    controls.update()



    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

