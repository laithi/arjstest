// Get references to the camera, model, and scene
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
