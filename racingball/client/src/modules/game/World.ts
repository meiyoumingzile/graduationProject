import tr = THREE;

class World extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.setupDistOffsetShader();
        this.createScene();
       
    }

    setupDistOffsetShader() {
        tr.ShaderChunk.meshbasic_vert = "uniform vec4 distOffset;\n" + tr.ShaderChunk.meshbasic_vert
        tr.ShaderChunk.meshphong_vert = "uniform vec4 distOffset;\n" + tr.ShaderChunk.meshphong_vert
        tr.ShaderChunk.project_vertex = `
vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
vec4 pvPosition = projectionMatrix * mvPosition;
float offset = pvPosition.z / 100.0;
pvPosition += distOffset * offset * offset;
gl_Position = pvPosition;
`
        tr.ShaderLib.basic.vertexShader = tr.ShaderChunk.meshbasic_vert
        tr.ShaderLib.phong.vertexShader = tr.ShaderChunk.meshphong_vert
        tr.ShaderLib.basic.uniforms["distOffset"] = { value: new tr.Vector4(0, 0, 0, 0) }
        tr.ShaderLib.phong.uniforms["distOffset"] = { value: new tr.Vector4(0, 0, 0, 0) }
    }

    public createScene() {
        this.initWebGLRender();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initObjects();
        this.initTools();
    }

    /**渲染器 */
    renderer: THREE.WebGLRenderer;
    private viewWidth: number;
    private viewHeight: number;
    private initWebGLRender() {
        let container = document.getElementById("WebGL-output");
        this.renderer = new THREE.WebGLRenderer({ antialias: true, devicePixelRatio: window.devicePixelRatio });

        this.viewWidth = window.innerWidth;
        this.viewHeight = window.innerHeight;
        // if (window.innerHeight / window.innerHeight > 640 / 1000) {
        //     this.viewWidth = this.viewHeight * 640 / 1136;
        // }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setViewport(window.innerWidth * .5 - this.viewWidth * .5, 0, this.viewWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        this.renderer.setClearColor(0x000000, 1.0);
    }
    
    setBgColor(c: number) {
        this.renderer.setClearColor(c, 1.0);
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    /**场景 */
    public scene: THREE.Scene;
    private initScene() {
        this.scene = new THREE.Scene();
    }
    /**相机 */
    camera: THREE.PerspectiveCamera;
    // cameraOffset_: tr.Vector3;
    private cameraHelper: THREE.CameraHelper;
    private initCamera() {
        // this.cameraOffset_ = new tr.Vector3(0, -15, 20);
        this.camera = new tr.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
        this.camera.position.set(0, 2, 10);
        // this.camera.lookAt(0, 0, 0);
        this.scene.add(this.camera);

        // this.cameraHelper = new THREE.CameraHelper( this.camera );
        // this.scene.add( this.cameraHelper );
        //创建坐标轴
        // let axes = new THREE.AxesHelper(100);
        // this.scene.add(axes);
    }
    private initLight() {
        var ambientLight = new THREE.AmbientLight(0xffffff, .6);
        this.scene.add(ambientLight);

        // let hLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        // hLight.position.set(0, -10, 100);
        // this.scene.add(hLight);

        let dLight = new tr.DirectionalLight(0xffffff, 1.8);
        dLight.position.set(0, 1, .4);
        this.scene.add(dLight);
    }

    stageMesh: tr.Mesh;
    public initObjects() {
        //GridHelper
        // let gridHelper = new THREE.GridHelper(100, 20);
        // gridHelper.rotateX(Math.PI * .5);
        // this.scene.add(gridHelper);

        //监听鼠标移动事件
    }

    private controls;
    private initTools() {
        /**OrbitControls */
        // this.controls = new THREE.OrbitControls(this.camera, document.getElementById("main"));
        // this.controls.update();

        // 创建dat.GUI，传递并设置属性
        // let gui = new window["dat"].GUI();
        // gui.add(Constant.guiParams, 'enableRotate');
        // gui.add(Constant.guiParams, 'following');
        // gui.add(Constant.guiParams, 'wireframe');
        // gui.add(Constant.guiParams, 'switchPlayer', 0, 1).step(1);

        // gui.close();
    }

    updateGUIStatus() {
        // guiControls
        // Context.player = Context.playersManager.players[Constant.guiParams.switchPlayer];

        // this.controls.enableRotate = Constant.guiParams.enableRotate;
        this.scene.getObjectByName("axes").visible = Constant.guiParams.wireframe;
        // if (Constant.guiParams.following) {
            // let target = Context.cameraTarget || Context.player;
            // this.controls.target.copy(target.group.position);
            // this.camera.position.copy(target.group.position.clone().add(this.cameraOffset_));
        //     this.controls.update();
        // }
        // (Context.player.tail.mesh.material as tr.MeshBasicMaterial).wireframe = Constant.guiParams.wireframe;
        // (Context.player.zone.plane.mesh.material as tr.MeshBasicMaterial).wireframe = Constant.guiParams.wireframe;
    }
}