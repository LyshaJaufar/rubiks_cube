const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();						// vertices & faces
const material = new THREE.MeshBasicMaterial({color: "red"});	// colour
const cube = new THREE.Mesh(geometry, material);				// applies material to a given geometry
scene.add(cube);
camera.position.z = 5;

const animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();