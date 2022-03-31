// Various three.js global variables
var scene,
    camera,
    renderer,
    controls,
    group;

// Colours of the faces
GREEN = new THREE.Color(0x2bb81c);
BLUE = new THREE.Color(0x2196f3);
RED = new THREE.Color(0xa10b0b);
ORANGE = new THREE.Color(0xe37602);
WHITE = new THREE.Color(0xd5e7e8);
YELLOW = new THREE.Color(0xf2eb0f);
const colours = [GREEN, BLUE, RED, ORANGE, WHITE, YELLOW];

// Cube parts
var cube_pieces = [];
var dimensions = 3;

window.addEventListener("keydown", moveCube);
window.addEventListener("touchstart", moveCube);


function init() {

    // Set up scene + renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Correct camera positioning to center the cube & adjust to rotation
    camera.position.z = 7;
    camera.position.y = 6;
    camera.position.x = 7;

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create lights, add lights to scene
    var light1 = new THREE.DirectionalLight(0xDDEED3, 1);
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set(0, 0, 1);

    scene.add(light1);
    scene.add(light2);

    // Orbital controls (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();

    // Initialise the rubik's cube to be a 3x3
    cubeLayout();
    renderCube();
};

// Generate individual pieces for the rubik's cube
function cube(pstX=0, pstY=0, pstZ=0, sizeX=1, sizeY=1, sizeZ=1) {
    // vertices & faces
	const geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);  						                 
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

    // colour
	const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});  

    // applies material to a given geometry
	const cube = new THREE.Mesh(geometry, material);	                 
	cube.position.set(pstX,pstY,pstZ);

	return cube;
}

// Retrieve user input for the rubik's cube dimensions + update when appropriate
function getUserInput(){
    $(document).on("keypress", "input", function(e){
        if(e.which == 13){
            // Clear previous scene to render the new rubik's cube
            removePieces();

            // Given user input, store pieces + their info in an array to account for cube turning / movement
            cube_pieces = [];
            var inputVal = $(this).val();
                for (let i = 0; i < inputVal; i+=1.07) {
                    cube_pieces.push([]);
                    for (let j = 0; j < inputVal; j+=1.07){
                        cube_pieces[Math.floor(i)].push([]);
                        for (let k = 0; k < inputVal; k+=1.07){
                            cube_pieces[Math.floor(i)][Math.floor(j)].push(cube(pstX=i, pstY=j, pstZ=k));
                        }
                    }
                }

                // Add n dimensions to scene 
                dimensions = inputVal;
                renderCube();
        }
    });
};

// Initially stores pieces for a 3x3 in a 3-dimensional array
function cubeLayout() {
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

// Generate a simple rubik's cube, composed of smaller identical cubes
//      NOTE: Cube interior is not solid white or black. Coloured. May fix in the future.
function renderCube(){
    console.log('current', cube_pieces)
    for (let i =  0; i < cube_pieces.length; i++){
        for (let j = 0; j < cube_pieces[i].length; j++){
            for (let k = 0; k < cube_pieces[i][j].length; k++){
                scene.add(cube_pieces[i][j][k]);
            }
        }
    }
}

function removePieces() {
    for (let i =  0; i < cube_pieces.length; i++){
        for (let j = 0; j < cube_pieces[i].length; j++){
            for (let k = 0; k < cube_pieces[i][j].length; k++){
                scene.remove(cube_pieces[i][j][k]);
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
        if (keyCode == parseInt(dimensions)+(65+i)) {
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

function render() {
    requestAnimationFrame(render); 
    controls.update();
    renderer.render(scene, camera);
};

init();
getUserInput();
render();