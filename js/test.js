

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



function cube(pstX=0, pstY=0, pstZ=0, sizeX=1, sizeY=1, sizeZ=1) {
	const geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);						// vertices & faces
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
	cube.position.set(pstX,pstY,pstZ);

	scene.add(cube); 
}

function pieces(n) {
    for (var i = -1.1; i < n-1; i+=1.1) {
        for (var j = -1.1; j < n-1; j+=1.1){
            for (var k = -1.1; k < n-1; k+=1.1){
                scene.add(cube(pstX=i, pstY=j, pstZ=k));
            }
        }
    }
}


function init() {

    // Set up scene + renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    // Create lights, add lights to scene
    var light1 = new THREE.DirectionalLight(0xDDEED3, 1);
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set( 0, 0, 1 );

    scene.add(light1);
    scene.add(light2);
	
    pieces(3);
    /**
    //scene.add(cube(pstX=0, pstY=0, pstZ=0, sizeX=3.2, sizeY=3.2, sizeZ=3.2));
	// mid
    scene.add(cube(pstX=0));
    scene.add(cube(pstX=-1.1));
    scene.add(cube(pstX=1.1));

    scene.add(cube(pstX=0, pstY=1.1));
    scene.add(cube(pstX=-1.1, pstY=1.1));
    scene.add(cube(pstX=1.1,pstY=1.1));

    scene.add(cube(pstX=0, pstY=-1.1));
    scene.add(cube(pstX=-1.1, pstY=-1.1));
    scene.add(cube(pstX=1.1,pstY=-1.1));

	// front 
    scene.add(cube(pstX=0, pstY=0, pstZ=1.1));
    scene.add(cube(pstX=0, pstY=-1.1, pstZ=1.1));
    scene.add(cube(pstX=0, pstY=1.1, pstZ=1.1));

    scene.add(cube(pstX=1.1, pstY=0, pstZ=1.1));
    scene.add(cube(pstX=-1.1, pstY=0, pstZ=1.1));
    scene.add(cube(pstX=1.1, pstY=1.1, pstZ=1.1));

    scene.add(cube(pstX=1.1, pstY=-1.1, pstZ=1.1));
    scene.add(cube(pstX=-1.1, pstY=1.1, pstZ=1.1));
    scene.add(cube(pstX=-1.1, pstY=-1.1, pstZ=1.1));

	// back
    scene.add(cube(pstX=0, pstY=0, pstZ=-1.1));
    scene.add(cube(pstX=0, pstY=-1.1, pstZ=-1.1));
    scene.add(cube(pstX=0, pstY=1.1, pstZ=-1.1));

    scene.add(cube(pstX=1.1, pstY=0, pstZ=-1.1));
    scene.add(cube(pstX=-1.1, pstY=0, pstZ=-1.1));
    scene.add(cube(pstX=1.1, pstY=1.1, pstZ=-1.1));

    scene.add(cube(pstX=1.1, pstY=-1.1, pstZ=-1.1));
    scene.add(cube(pstX=-1.1, pstY=1.1, pstZ=-1.1));
    scene.add(cube(pstX=-1.1, pstY=-1.1, pstZ=-1.1));
    **/


    // Orbital controls (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.autoRotate = true;
    controls.update();
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

init();
render();