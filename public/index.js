import * as THREE from './threejs/three.module.js';
import {STLLoader} from './threejs/STLLoader.js';
import{ OrbitControls} from './threejs/OrbitControls.js'
let scene, camera, renderer, object, newCamera;

function init(){
    scene = new THREE.Scene();
    let loader = new THREE.TextureLoader();
    loader.load("./space-bg.jpg", (texture)=>{
        scene.background = texture;
    })

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        10,
        2000
    );
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    scene.add(object);
    
    let control = new OrbitControls(camera,renderer.domElement);

    control.enableDamping = true;
    control.dampingFactor= 0.5;
    
    let light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-8,-5,1);
    scene.add(light);


    let light3 = new THREE.DirectionalLight(0xffffff)
    light3.position.set(0,10,10);
    scene.add(light3);

    addEventListener('resize', ()=>{
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.render(scene,camera);
    })

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);

    object.rotation.z += 0.01;
}

let loader = new STLLoader();
loader.load('/3dmodels/falcon.stl', (model)=>{
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({
            color: 0Xbbbbbbb
        })
    );
    object.scale.set(0.1,0.1,0.1);
    object.position.set(-10,0,0);
    object.rotation.y = Math.PI/2;

    init();
});