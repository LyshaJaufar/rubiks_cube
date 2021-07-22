// colours of the faces
GREEN = new THREE.Color(0x2bb81c);
BLUE = new THREE.Color(0x2196f3);
RED = new THREE.Color(0xa10b0b);
ORANGE = new THREE.Color(0xe37602);
WHITE = new THREE.Color(0xd5e7e8);
YELLOW = new THREE.Color(0xf2eb0f);

// Various three.js global variables
const scene,
	  camera,
	  renderer;

function cube() {
	const geometry = new THREE.BoxGeometry(1,1,1);						// vertices & faces
	geometry.faces[0].color = new THREE.Color(GREEN);				// green
	geometry.faces[1].color = new THREE.Color(GREEN);

	geometry.faces[2].color = new THREE.Color(BLUE);				// blue
	geometry.faces[3].color = new THREE.Color(BLUE);

	geometry.faces[4].color = new THREE.Color(RED);					// red
	geometry.faces[5].color = new THREE.Color(RED);

	geometry.faces[6].color = new THREE.Color(ORANGE);				// orange
	geometry.faces[7].color = new THREE.Color(ORANGE);

	geometry.faces[8].color = new THREE.Color(WHITE);				// white
	geometry.faces[9].color = new THREE.Color(WHITE);

	geometry.faces[10].color = new THREE.Color(YELLOW);				// yellow
	geometry.faces[11].color = new THREE.Color(YELLOW);


	const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});		// colour
	const cube = new THREE.Mesh(geometry, material);					// applies material to a given geometry
	cube.position.set(0,0,0);

	scene.add(cube);
}

function init() {

	// Set up scene + renderer
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 5;

	scene.add(cube());
}

const animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

init();
animate();