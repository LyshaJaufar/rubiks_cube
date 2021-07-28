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

var cube_pieces = [];
dimensions = 3;


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

function cubeLayout(dimensions) {
    for (let i = 0; i < dimensions; i+=1.07) {
        cube_pieces.push([]);
        for (let j = 0; j < dimensions; j+=1.07){
            cube_pieces[Math.floor(i)].push([]);
            for (let k = 0; k < dimensions; k+=1.07){
                cube_pieces[Math.floor(i)][Math.floor(j)].push(cube(pstX=i, pstY=j, pstZ=k));
            }
        }
    } 

};

function renderCube(){
    for (let i =  0; i < cube_pieces.length; i++){
        for (let j = 0; j < cube_pieces[i].length; j++){
            for (let k = 0; k < cube_pieces[i][j].length; k++){
                scene.add(cube_pieces[i][j][k]);
            }
        }
    }
}

function moveCube(event) {
    var keyCode = event.which;
    
    // back and front 
    for (let i = 0; i < dimensions; i++){
        if (keyCode == 65+i) {
            for (let j = 0; j < cube_pieces.length; j++){
                for (let k = 0; k < cube_pieces[i].length; k++){
                    cube_pieces[j][k][0+i].rotation.z += (Math.PI/2);
                    scene.add(cube_pieces[j]);
                }
            }
        }
    }

    // back and front counter-clockwise
    for (let i = 0; i < dimensions; i++){
        if (keyCode == dimensions+65+i) {
            for (let j = 0; j < cube_pieces.length; j++){
                for (let k = 0; k < cube_pieces[i].length; k++){
                    cube_pieces[j][k][0+i].rotation.z -= (Math.PI/2);
                    scene.add(cube_pieces[j]);
                }
            }
        }
    }

    // Up and down 
    for (let i = 0; i < dimensions; i++){
        if (keyCode == (dimensions*2)+65+i) {
            for (let j = 0; j < cube_pieces.length; j++){
                for (let k = 0; k < cube_pieces[i].length; k++){
                    cube_pieces[j][i][k].rotation.y -= (Math.PI/2);
                    scene.add(cube_pieces[j]);
                }
            }
        }
    }

    // Up and down counter-clockwise
    for (let i = 0; i < dimensions; i++){
        if (keyCode == (dimensions*3)+65+i) {
            for (let j = 0; j < cube_pieces.length; j++){
                for (let k = 0; k < cube_pieces[i].length; k++){
                    cube_pieces[j][i][k].rotation.y += (Math.PI/2);
                    scene.add(cube_pieces[j]);
                }
            }
        }
    }

    // Left and right 
    for (let i = 0; i < dimensions; i++){
        if (keyCode == (dimensions*4)+65+i) {
            for (let j = 0; j < cube_pieces.length; j++){
                for (let k = 0; k < cube_pieces[i].length; k++){
                    cube_pieces[i][j][k].rotation.x += (Math.PI/2);
                    scene.add(cube_pieces[j]);
                }
            }
        }
    }

    // Left and right counter-clockwise
    for (let i = 0; i < dimensions; i++){
        if (keyCode == (dimensions*5)+65+i) {
            for (let j = 0; j < cube_pieces.length; j++){
                for (let k = 0; k < cube_pieces[i].length; k++){
                    cube_pieces[i][j][k].rotation.x -= (Math.PI/2);
                    scene.add(cube_pieces[j]);
                }
            }
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
    camera.position.y = 4;
    camera.position.x = 7;

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

function removing(){
    for (let i = 0; i < top_face.length; i++){
        for (let j = 0; j < back_face.length; j++){
            scene.remove(front_face[i]);
            scene.remove(mid_face[i]);
            scene.remove(back_face[i]);

        }
    }
};


function render() {
    requestAnimationFrame(render); 
    controls.update();
    renderer.render(scene, camera);
};

init();
cubeLayout(dimensions);
renderCube();
render();