import * as BABYLON from 'babylonjs';
export const createScene = (canvas) => {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.9, 0.3, 0.3, 1);


    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // Enable mouse wheel inputs.
    camera.inputs.addMouseWheel();
    
    // Change the mouse wheel Y axis to controll the cameras height in the scene:
    //camera.inputs.attached["mousewheel"].wheelYMoveRelative = BABYLON.Coordinate.Y;
    
    // Revese the mouse wheel Y axis direction:
    // camera.inputs.attached["mousewheel"].wheelPrecisionY = -1;

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, -15), scene);
  light.intensity = 0.7;

  const material = new BABYLON.StandardMaterial("material", scene);
  material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
   const SPS = new BABYLON.SolidParticleSystem("SPS", scene, { isPickable: true });// scene is required
const sphere = BABYLON.MeshBuilder.CreateBox("cube", { height: 1, width: 1, depth: 1 }, scene);
const poly = BABYLON.MeshBuilder.CreatePolyhedron("p", { type: 2 }, scene);
SPS.addShape(sphere, 20); // 20 spheres
//SPS.addShape(poly, 120); // 120 polyhedrons
//SPS.addShape(sphere, 80); // 80 other spheres
sphere.dispose(); //free memory
poly.dispose(); //free memory

const mesh = SPS.buildMesh();
     // initiate particles function
    SPS.initParticles = () => {
        for (let p = 0; p < SPS.nbParticles; p++) {
            const particle = SPS.particles[p];
            SPS.particles[p].metadata = "roomTop";;
      	    particle.position.x = (Math.random() - 0.5) * 20;
            particle.position.y = (Math.random() - 0.5) * 20;
            particle.position.z = (Math.random() - 0.5) * 20;
        }
    };

 SPS.initParticles();		// compute particle initial status
  SPS.setParticles();		// updates the SPS mesh and draws it
  SPS.refreshVisibleSize(); // updates the BBox for pickability
  
  // Optimizers after first setParticles() call
  // This will be used only for the next setParticles() calls
  SPS.computeParticleTexture = false;
  const cube = BABYLON.MeshBuilder.CreateBox("cube", { height: 5, width: 5, depth: 5 }, scene);
  cube.material = material;

  
  
   scene.onPointerDown = function(evt, pickResult) {
    var faceId = pickResult.faceId;
    if (faceId == -1) {return;}
    var picked = SPS.pickedParticle(pickResult);
    var idx = picked.idx;
    var p = SPS.particles[idx];
    alert(SPS.particles[idx].metadata);
    p.color.r = 1;
    p.color.b = 0;
    p.color.g = 1;
    SPS.setParticles();
  };
    

  

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });

  return scene;
}