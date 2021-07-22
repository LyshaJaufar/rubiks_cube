const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);						// vertices & faces

geometry.faces[0].color = new THREE.Color(0x2bb81c);				// green
geometry.faces[1].color = new THREE.Color(0x2bb81c);
//
geometry.faces[2].color = new THREE.Color(0x2196f3);				// blue
geometry.faces[3].color = new THREE.Color(0x2196f3);

geometry.faces[4].color = new THREE.Color(0xa10b0b);				// red
geometry.faces[5].color = new THREE.Color(0xa10b0b);

geometry.faces[6].color = new THREE.Color(0xe37602);				// orange
geometry.faces[7].color = new THREE.Color(0xe37602);

geometry.faces[8].color = new THREE.Color(0xd5e7e8);				// white
geometry.faces[9].color = new THREE.Color(0xd5e7e8);

geometry.faces[10].color = new THREE.Color(0xf2eb0f);				// yellow
geometry.faces[11].color = new THREE.Color(0xf2eb0f);


const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});		// colour
const cube = new THREE.Mesh(geometry, material);					// applies material to a given geometry
cube.position.set(-1.3,0,0);
cube.scale.set(0.5,0.5,0.5);

scene.add(cube);
camera.position.z = 5;

const animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();