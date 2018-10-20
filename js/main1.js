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
    Runner = Matter.Runner,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create(),
    world = engine.world;
    // world.gravity.x=0;
    // world.gravity.x=0;

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

  var boxB = Bodies.rectangle(300,200,80,80,{
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

var user = Bodies.circle(900,300,40,{
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

// ctx.arc(dets[i][1], dets[i][0], dets[i][2]/2, 0, 2*Math.PI, false);
var cuchara = Bodies.circle(300,300,80,
      {

          render: {
            // fillStyle: 'transparent'
          }}
);

// var cuchara = Bodies.ctx.arc(100, 100,20, 0, 2*Math.PI, false,
//       {
//
//           render: {
//             // fillStyle: 'transparent'
//           }}
// );



// add all of the bodies to the world
World.add(engine.world, boxA);
World.add(engine.world, boxB);
World.add(engine.world, user);
World.add(engine.world, cuchara);


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
  Body.setVelocity(boxB, {
      x: 0,
      y: 15
    });
    Body.setVelocity(user, {
        x: 0,
        y: 0
      });
      Body.setPosition(cuchara, {
          x: 300,
          y: 300
        });

  requestAnimationFrame(draw);
}
