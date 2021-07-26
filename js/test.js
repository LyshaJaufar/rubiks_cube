// Various three.js global variables
var scene,
    camera,
    renderer,
    controls,
    group;

// colours of the faces
GREEN = new THREE.Color(0x2bb81c);
BLUE = new THREE.Color(0x2196f3);
RED = new THREE.Color(0xa10b0b);
ORANGE = new THREE.Color(0xe37602);
WHITE = new THREE.Color(0xd5e7e8);
YELLOW = new THREE.Color(0xf2eb0f);
const colours = [GREEN, BLUE, RED, ORANGE, WHITE, YELLOW];

var back_face = [];       // B slice
var mid_face = [];        // S slice
var front_face = [];      // F slice

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function cube(pstX=0, pstY=0, pstZ=0, sizeX=1, sizeY=1, sizeZ=1) {
	const geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);						                 // vertices & faces
	geometry.faces[0].color = RED;				
	geometry.faces[1].color = RED;

	geometry.faces[2].color = ORANGE;				
	geometry.faces[3].color = ORANGE;

	geometry.faces[4].color = WHITE;				
	geometry.faces[5].color = WHITE;

	geometry.faces[6].color = YELLOW;			
	geometry.faces[7].color = YELLOW;

	geometry.faces[8].color = GREEN; 	
	geometry.faces[9].color = GREEN;

	geometry.faces[10].color = BLUE;	
	geometry.faces[11].color = BLUE;

	const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});   // colour
	const cube = new THREE.Mesh(geometry, material);	                 // applies material to a given geometry
	cube.position.set(pstX,pstY,pstZ);

	return cube;
}

function pieces(dimensions) {
    for (let i = -1.07; i < dimensions-1; i+=1.07) {
        for (let j = -1.07; j < dimensions-1; j+=1.07){
            for (let k = -1.07; k < dimensions-1; k+=1.07){

                if (k == -1.07){
                    back_face.push(cube(pstX=i, pstY=j, pstZ=k));
                }
                if (k == 0){
                    mid_face.push(cube(pstX=i, pstY=j, pstZ=k));
                }
                if (k == 1.07){
                    front_face.push(cube(pstX=i, pstY=j, pstZ=k));
                }

            }
        }
    } 
};
var xSpeed = 0.0001;
var ySpeed = 0.0001;


function moveCube(event) {
    var keyCode = event.which;
    if (keyCode == 82) {
        for (let i = 0; i < back_face.length; i++){
            back_face[i].rotation.z += (Math.PI/2);
            scene.add(back_face[i]);
        }
    }
};

window.addEventListener("keydown", moveCube);
window.addEventListener("touchstart", moveCube);


function init() {

    // Set up scene + renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = 2;

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create lights, add lights to scene
    var light1 = new THREE.DirectionalLight(0xDDEED3, 1);
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set(0, 0, 1);

    // Orbital controls (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.autoRotate = true;
    controls.update();
};

function render() {
    requestAnimationFrame(render);
    
     for (let i = 0; i < back_face.length; i++){
        scene.add(front_face[i]);
        scene.add(mid_face[i]);
        scene.add(back_face[i]);
    }
    controls.update();
    renderer.render(scene, camera);
}


init();
pieces(3);
render();