// import * as THREE from './assets/lib/three'

function init(){
    var scene = new THREE.Scene()
    var gui = new dat.GUI();
    gui.domElement.id = 'gui';
    var renderer = new THREE.WebGLRenderer()
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    var grid = new THREE.GridHelper(100, 100);
    scene.add(grid);

    camera.position.x = 10;
    camera.position.y = 5;
    camera.position.z = 10;

    function updateCamera(){
        camera.updateProjectionMatrix();
    }

    var camGUI = gui.addFolder('Camera');
    camGUI.add(camera,'fov',0,175).name('FOV').onChange(updateCamera);
    camGUI.add(camera,'near',0,50,0.1).name('near').onChange(updateCamera);
    camGUI.add(camera,'far',0,50,0.1).name('far').onChange(updateCamera);

    var axeHelper = new THREE.AxesHelper(1);
    var box = getBox(1,1,1)
    box.add(axeHelper);
    scene.add(box);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(120,120,120)');
    document.getElementById('webgl').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera,renderer.domElement);

    update(renderer,scene,camera,controls);
    renderer.render(scene,camera);
}

function updateCamera(camera){
    camera.updateProjectionMatrix();
}


function update(renderer, scene, camera, controls){
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(function(){
        update(renderer,scene,camera,controls);
    })
}

function getBox (w,h,d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh
}


init()

