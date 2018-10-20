// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: screen.width,
        height: screen.height,
        pixelRatio: 1,
        background: 'transparent',
        wireframeBackground: '#222',
        hasBounds: false,
        enabled: true,
        wireframes: false,
        showSleeping: true,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: true,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false
    }

});

//create a Runner
//var runner = Runner.create();
//Runner.run(runner, engine);
// create two boxes
var boxA = Bodies.rectangle(40, 200, 80, 80);
var boxB = Bodies.rectangle(800, 50, 80, 80);

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
