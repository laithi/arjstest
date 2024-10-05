// Initialize video stream
const video = document.getElementById('video');

async function startVideo() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam:", err);
    }
}

startVideo();

// Initialize Three.js
let scene, camera, renderer, glasses;

function initThreeJS() {
    const canvas = document.getElementById('overlay');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(640, 480);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 640 / 480, 0.1, 1000);
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Load initial glasses model
    loadGlasses('style1.glb');

    animate();
}

function loadGlasses(modelPath) {
    const loader = new THREE.GLTFLoader();
    loader.load(`/models/${modelPath}`, function(gltf) {
        if (glasses) {
            scene.remove(glasses);
        }
        glasses = gltf.scene;
        glasses.scale.set(1, 1, 1);
        scene.add(glasses);
    }, undefined, function(error) {
        console.error("Error loading model:", error);
    });
}

function changeGlasses(modelName) {
    loadGlasses(modelName);
}

// Face-api.js setup
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models')
]).then(() => {
    console.log("Face-api models loaded");
    initThreeJS();
});

video.addEventListener('play', () => {
    const canvas = document.getElementById('overlay');
    const displaySize = { width: 640, height: 480 };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                                       .withFaceLandmarks(true);
        // You can draw detections if needed
        // faceapi.draw.drawFaceLandmarks(canvas, detections);

        if (detections.length > 0 && glasses) {
            const landmarks = detections[0].landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();

            // Calculate center between eyes
            const eyeCenter = {
                x: (leftEye[0].x + rightEye[3].x) / 2,
                y: (leftEye[0].y + rightEye[3].y) / 2
            };

            // Convert to normalized device coordinates
            const x = (eyeCenter.x / 640) * 2 - 1;
            const y = -(eyeCenter.y / 480) * 2 + 1;

            // Update glasses position
            glasses.position.x = x * 1.5;
            glasses.position.y = y * 1.5;
            glasses.rotation.z = 0; // Adjust rotation if needed
            glasses.scale.set(1, 1, 1); // Adjust scale based on face size
        }
    }, 100);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
