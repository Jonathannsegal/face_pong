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
        showPositions: false,
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


// ctx.arc(dets[i][1], dets[i][0], dets[i][2]/2, 0, 2*Math.PI, false);
var cuchara = Bodies.circle(-300,-300,100,
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

var shapes = new Array();
//shapes.push(boxA);
//shapes.push(boxB);



// add all of the bodies to the world
World.add(engine.world, cuchara);


// run the engine
//Engine.run(engine);

// run the renderer
Render.run(render);
engine.world.gravity.y = 0;

draw();

function draw(){
  Runner.tick(runner, engine, 1000/60);

  Body.setPosition(cuchara, {
      x: -300,
      y: -300
  });



  if(shapes.length <= 9){
    var newBox = Bodies.rectangle(Common.random(220,render.canvas.width-40),0,80,80)
    /*var newBox = Bodies.rectangle(Common.random(0,1000),200,80,80,{
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
  );*/
  newBox.collisionFilter = -1;
  shapes.push(newBox);
  World.add(engine.world, shapes);
  }

  for(var i = 0; i < shapes.length; i++){
    Body.setVelocity(shapes[i], {
      x:0,
      y:1
    });
  }


  for(var i = shapes.length-1; i >= 0; i--){
    if(shapes[i].position.y > render.canvas.height){
      World.remove(engine.world, shapes[i]);
      shapes.splice(i,1);
    }
  }
  requestAnimationFrame(draw);
}
