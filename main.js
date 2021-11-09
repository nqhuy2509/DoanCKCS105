// import * as THREE from './assets/lib/three'


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



function addMesh(number){
    var geometry;
    
    var material = new THREE.MeshBasicMaterial(
        {color: 0xffffff}
    );

    if (number ==1){
        geometry =  new THREE.BoxGeometry(7,7,7);
          
    }

    if (number ==2){
        geometry = new THREE.SphereGeometry(5,100,100);
    }

    if (number ==3){
        geometry = new THREE.ConeGeometry(4,7,100);
    }

    if (number ==4){
        geometry =  new THREE.CylinderGeometry(4,4,7,100);
    }

    if (number==5){
        geometry = new THREE.TorusGeometry(3, 1, 30, 100);
    }

    var mesh = new THREE.Mesh(geometry,material);
    scene.remove(scene.children[1])
    scene.add(mesh);
}

var camGUI = gui.addFolder('Camera');
camGUI.add(camera,'fov',0,175).name('FOV').onChange(updateCamera);
camGUI.add(camera,'near',0.1,50,0.1).name('near').onChange(updateCamera);
camGUI.add(camera,'far',1000,5000,10).name('far').onChange(updateCamera);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(75,75,75)');

document.getElementById('webgl').appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera,renderer.domElement);

update(renderer,scene,camera,controls);
renderer.render(scene,camera);



function update(renderer, scene, camera, controls){
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(function(){
        update(renderer,scene,camera,controls);
    })
}



