
//scene
const scene = new THREE.Scene();

//red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red'});
const mesh = new THREE.Mesh(geometry, material);
//add mesh to the scene
scene.add(mesh);

//camera
//perspective camera is default camera
const sizes = {
    width: 1000,
    height: 800
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height )
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)