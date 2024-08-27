// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smoother rotation

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Objects
// 1. Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x4CC3D9 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-1, 0.5, -3);
box.rotation.y = THREE.MathUtils.degToRad(45);
scene.add(box);

// 2. Sphere
const sphereGeometry = new THREE.SphereGeometry(1.25, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xEF2D5E });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1.25, -5);
scene.add(sphere);

// 3. Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xFFC65D });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(1, 0.75, -3);
scene.add(cylinder);

// 4. Plane
const planeGeometry = new THREE.PlaneGeometry(4, 4);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x7BC8A4, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
plane.position.set(0, 0, -4);
scene.add(plane);

// 5. Sky
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0xECECEC, side: THREE.BackSide });
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// Camera Positioning
camera.position.z = 5;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();// Get references to the camera, model, and scene
const camera = document.querySelector('#myCamera');
const model = document.querySelector('#myModel');
const scene = document.querySelector('a-scene');

// Initialize the camera controls
camera.setAttribute('camera-controls', '');

// Add an event listener to the scene
scene.addEventListener('loaded', () => {
  // Once the scene is loaded, start the animation loop
  animate();
});

// Animation loop
function animate() {
  // Request the next animation frame
  requestAnimationFrame(animate);

  // Update the camera controls
  camera.components['camera-controls'].update();
}
