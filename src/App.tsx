import './App.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Content from './Content'

function App() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#BG'),
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const pointLight = new THREE.PointLight(0xFFFFFF)
  pointLight.position.set(20, 20, 20)

  const ambientLight = new THREE.AmbientLight(0xFFFFFF)
  scene.add(pointLight, ambientLight)

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill(null).map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
  }

  Array(200).fill(null).forEach(addStar)

  const spaceTexture = new THREE.TextureLoader().load('/src/space4k.jpg')
  scene.background = spaceTexture

  const planetTexture = new THREE.TextureLoader().load("/src/planetexture.png")

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
      map: planetTexture
    } )
  )

  scene.add(planet)

  planet.position.z = 4
  planet.position.x = 10

  function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    planet.rotation.x += 0.05
    planet.rotation.y += 0.05

    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002
    camera.position.z = t * -0.01
  }

  document.body.onscroll = moveCamera

  function animate() {
    requestAnimationFrame( animate )

    renderer.render(scene, camera)
  }

  animate()

  return (
    <div style={{"position": "absolute", "top": "50%", "paddingLeft": "10rem", "paddingRight": "10rem", "color":"#FFF"}}>
      <Content />
    </div>
  )
}

export default App
