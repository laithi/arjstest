// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    70, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.getElementById('container').appendChild(renderer.domElement);

// Add a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 1, 0);
scene.add(light);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);

// Enter VR on button click
document.getElementById('enterVR').addEventListener('click', () => {
    renderer.xr.enabled = true;
    navigator.xr.requestSession('immersive-vr').then(session => {
        renderer.xr.setSession(session);
    }).catch(err => {
        alert('VR not supported: ' + err);
    });
});

// Rotate the cube
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Handle click to change cube color
window.addEventListener('click', () => {
    cube.material.color.setHex(Math.random() * 0xffffff);
});
