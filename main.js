import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';
import { TransformControls } from './js/TransformControls.js';


var camera,scene,renderer,control,orbit;
var mesh,texture,raycaster;

var material = new THREE.MeshBasicMaterial({color: 0xf4efff});
material.needsUpdate = true;
var mouse = new THREE.Vector2();

// Geometry
var BoxG = new THREE.BoxGeometry(30,30,30,40,40,40);
var ShereG = new THREE.SphereGeometry(20,20,20);
var ConeG = new THREE.ConeGeometry(18,30,32,20);
var CylinderG = new THREE.CylinderGeometry(20,20,40,30,5);
var TorusG = new THREE.TorusGeometry(20,5,20,100);

init();
render();

function init(){

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x343a40);

    // Camera
    var camera_x = 1;
    var camera_y = 50;
    var camera_z = 100;
    camera = new THREE.PerspectiveCamera(75,
                                window.innerWidth/innerHeight,0.1,1000);
    camera.position.set(camera_x,camera_y,camera_z);
    camera.lookAt(new THREE.Vector3(0,0,0));

    // Grid
    var size = 300;
    var divisions = 50;
    var gridHelper = new THREE.GridHelper(size,divisions, 0x888888);
    scene.add(gridHelper);

    // Renderer
    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, innerHeight)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // document.getElementById('webgl').addEventListener('mousedown', onMouseDown, false);
    document.getElementById('webgl').appendChild(renderer.domElement);
    // window.addEventListener('resize', ()=> {
    //     var width = window.innerWidth
    //     var height = window.innerHeight
    //     renderer.setSize(width, height)
    //     camera.aspect = width / height
    //     camera.updateProjectionMatrix()
    //     render()
    // });
    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();
    orbit.addEventListener('change', render);
    control = new TransformControls(camera, renderer.domElement);
    console.log(control)
    control.addEventListener('change', render);
    control.addEventListener('dragging-changed', function(event) {
        orbit.enabled = !event.value;
    });
}

function animate(){

}

function render(){
    renderer.render(scene,camera);
}
function addMesh(id){
    mesh = scene.getObjectByName("mesh1");
    scene.remove(mesh);

    switch(id){
        case 1:
            mesh = new THREE.Mesh(BoxG,material);
            break;
        case 2:
            mesh = new THREE.Mesh(ShereG,material);
            break;
        case 3:
            mesh = new THREE.Mesh(ConeG,material);
            break;
        case 4:
            mesh = new THREE.Mesh(CylinderG,material);
            break;
        case 5:
            mesh = new THREE.Mesh(TorusG,material);
            break;
    }
    mesh.name = "mesh1";
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    render();
}
window.addMesh = addMesh;