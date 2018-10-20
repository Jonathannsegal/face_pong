Matter.use(
  'matter-wrap'
)

/// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner;

// create an engine
var engine = Engine.create(),
    world = engine.world;

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
var runner = Runner.create();

// create two boxes

    var boxA = Bodies.rectangle(400,200,80,80,{
      friction: 0,
      frictionAir: 0,

      // set the body's wrapping bounds
      plugin: {
        wrap: {
          min: {
            x: 0,
            y: 0
          },
          max: {
            x: render.canvas.width,
            y: render.canvas.height
          }
        }
      }
    }
  );



// add all of the bodies to the world
World.add(engine.world, boxA);


// run the engine
//Engine.run(engine);

// run the renderer
Render.run(render);


draw();

function draw(){
  Runner.tick(runner, engine, 1000/60);
  Body.setVelocity(boxA, {
      x: 0,
      y: 10
    });

  requestAnimationFrame(draw);
}
