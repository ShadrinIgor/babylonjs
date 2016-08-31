// get the canvas DOM element
var canvas = document.getElementById('renderCanvas');

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true);

// call the createScene function
var scene = createScene();

// Собственно это весь блок загрузки модели
BABYLON.SceneLoader.ImportMesh(
    '', // пустая строка, если хотим загрузить все объекты, либо массив имен ['normal4_planet', 'normal4_sky'], в продакшене будет пустая строка, чтобы ты не думал о именовании
    "assets/",
    "object.json",
    scene,
    function (newMeshes) {
        // newMeshes - массив всех объектов, каждый по отдельности, объекты уже готовы и вставлены в сцену, можно даже убрать эту функци

        // make a parent object...
        var group = new BABYLON.Mesh.CreateBox("group", 1, scene);

        // Перебираем все
        newMeshes.forEach(function (mesh) {

            // смотрим какие объекты пришли (лишний экспорт)
            console.log(mesh.name + ' на коордиантах ' + mesh.position.to)

            // Устанавливаем родителя каждому объекту
            mesh.parent = group;

            // Располагаем всех сразу
            group.position = new BABYLON.Vector3(120, -50 , 50);

        });
    });

// run the render loop
engine.runRenderLoop(function () {
    scene.render();
});

function createScene() {
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = 'black';


    var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/1", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;


    var skyfog4 = BABYLON.Mesh.CreateSphere("skyfog4", 0, 400.0, scene);
    var materialSkyfog4 = new BABYLON.StandardMaterial("texture5", scene);
    materialSkyfog4.diffuseTexture = new BABYLON.Texture("assets/stars_3(red).png", scene);
    materialSkyfog4.diffuseTexture.uScale = 15;
    materialSkyfog4.diffuseTexture.vScale = 15;
    materialSkyfog4.diffuseTexture.hasAlpha = true;
    materialSkyfog4.backFaceCulling = false;
    materialSkyfog4.useAlphaFromDiffuseTexture = true;
    skyfog4.material = materialSkyfog4;

    var skyfog3 = BABYLON.Mesh.CreateSphere("skyfog3", 0, 800.0, scene);
    var materialSkyfog3 = new BABYLON.StandardMaterial("texture5", scene);
    materialSkyfog3.diffuseTexture = new BABYLON.Texture("assets/stars_3(red).png", scene);
    materialSkyfog3.diffuseTexture.uScale = 9;
    materialSkyfog3.diffuseTexture.vScale = 9;
    materialSkyfog3.diffuseTexture.hasAlpha = true;
    materialSkyfog3.backFaceCulling = false;
    materialSkyfog3.useAlphaFromDiffuseTexture = true;
    skyfog3.material = materialSkyfog3;

    var skyfog = BABYLON.Mesh.CreateSphere("skyfog", 0, 1500.0, scene);
    var materialSkyfog = new BABYLON.StandardMaterial("texture5", scene);
    materialSkyfog.diffuseTexture = new BABYLON.Texture("assets/stars_3(red).png", scene);
    materialSkyfog.diffuseTexture.uScale = 6;
    materialSkyfog.diffuseTexture.vScale = 6;
    materialSkyfog.diffuseTexture.hasAlpha = true;
    materialSkyfog.backFaceCulling = false;
    materialSkyfog.useAlphaFromDiffuseTexture = true;
    skyfog.material = materialSkyfog;

    var skyfog2 = BABYLON.Mesh.CreateSphere("skyfog2", 0, 1900.0, scene);
    var materialSkyfog2 = new BABYLON.StandardMaterial("texture5", scene);
    materialSkyfog2.diffuseTexture = new BABYLON.Texture("assets/stars_3(red).png", scene);
    materialSkyfog2.diffuseTexture.uScale = 12;
    materialSkyfog2.diffuseTexture.vScale = 12;
    materialSkyfog2.diffuseTexture.hasAlpha = true;
    materialSkyfog2.backFaceCulling = false;
    materialSkyfog2.useAlphaFromDiffuseTexture = true;
    skyfog2.material = materialSkyfog2;

    scene.registerBeforeRender(function () {
        scene.getMeshByName("skyfog4").rotation.y += -0.00005;
        scene.getMeshByName("skyfog3").rotation.y += -0.00015;
        scene.getMeshByName("skyfog3").rotation.x += 0.0001;
        scene.getMeshByName("skyfog").rotation.y += 0.0001;
        scene.getMeshByName("skyfog2").rotation.y += 0.00005;
    });


    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -300), scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });

    // return the created scene
    return scene;
}
