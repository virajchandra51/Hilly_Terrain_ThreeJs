import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Texture Loader
const loader = new THREE.TextureLoader()
const texture = loader.load('./textures/texture.jpg')
const height = loader.load('./textures/height.png')
const alpha = loader.load('./textures/alpha.png')

// Debug


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const planeGeometry = new THREE.PlaneBufferGeometry(3 ,3 ,64 ,64 )

// Materials
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 'grey',
  map: texture,
  displacementMap: height,
  displacementScale: 1,
  alphaMap: alpha,
  transparent: true,
  depthTest: false
})

// Mesh
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.rotation.x = 181


// Lights

const pointLight = new THREE.PointLight('#00b3ff', 3)
pointLight.position.x = 0.2
pointLight.position.y = 10
pointLight.position.z = 4.4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth *.7,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth *.7
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
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', animateTerrain)

let mouseY = 0

function animateTerrain(event) {
    mouseY = event.clientY
}




const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    plane.rotation.z = .1 * elapsedTime
    plane.material.displacementScale = 0.5 + mouseY*.0008
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()