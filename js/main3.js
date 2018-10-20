// Matter.use(
//   'matter-wrap'
// )
//
// /// module aliases
// var Engine = Matter.Engine,
//     Render = Matter.Render,
//     World = Matter.World,
//     Composite = Matter.Composite,
//     Composites = Matter.Composites,
//     Common = Matter.Common,
//     Bodies = Matter.Bodies,
//     Body = Matter.Body,
//     Runner = Matter.Runner,
//     Bodies = Matter.Bodies;
//
// // create an engine
// var engine = Engine.create(),
//     world = engine.world;
//     // world.gravity.x=0;
//     // world.gravity.x=0;
//
// // create a renderer
// var render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         width: screen.width,
//         height: screen.height,
//         pixelRatio: 1,
//         background: 'transparent',
//         wireframeBackground: '#222',
//         hasBounds: false,
//         enabled: true,
//         wireframes: false,
//         showSleeping: true,
//         showDebug: false,
//         showBroadphase: false,
//         showBounds: false,
//         showVelocity: false,
//         showCollisions: false,
//         showSeparations: false,
//         showAxes: false,
//         showPositions: true,
//         showAngleIndicator: false,
//         showIds: false,
//         showShadows: false,
//         showVertexNumbers: false,
//         showConvexHulls: false,
//         showInternalEdges: false,
//         showMousePosition: false
//     }
//
// });
//
// //create a Runner
// var runner = Runner.create();
//
// // create two boxes
//
//     var boxA = Bodies.rectangle(400,200,80,80,{
//       friction: 0,
//       frictionAir: 0,
//
//       // set the body's wrapping bounds
//       plugin: {
//         wrap: {
//           min: {
//             x: 0,
//             y: 0
//           },
//           max: {
//             x: render.canvas.width,
//             y: render.canvas.height
//           }
//         }
//       }
//     }
//   );
//
//   var boxB = Bodies.rectangle(300,200,80,80,{
//     friction: 0,
//     frictionAir: 0,
//
//     // set the body's wrapping bounds
//     plugin: {
//       wrap: {
//         min: {
//           x: 0,
//           y: 0
//         },
//         max: {
//           x: render.canvas.width,
//           y: render.canvas.height
//         }
//       }
//     }
//   }
// );
//
// var user = Bodies.circle(900,300,40,{
//   friction: 0,
//   frictionAir: 0,
//
//   // set the body's wrapping bounds
//   plugin: {
//     wrap: {
//       min: {
//         x: 0,
//         y: 0
//       },
//       max: {
//         x: render.canvas.width,
//         y: render.canvas.height
//       }
//     }
//   }
// }
// );
//
//
//
// // add all of the bodies to the world
// World.add(engine.world, boxA);
// World.add(engine.world, boxB);
// World.add(engine.world, user);
//
//
// // run the engine
// //Engine.run(engine);
//
// // run the renderer
// Render.run(render);
//
//
// draw();
//
// function draw(){
//   Runner.tick(runner, engine, 1000/60);
//   Body.setVelocity(boxA, {
//       x: 0,
//       y: 10
//     });
//   Body.setVelocity(boxB, {
//       x: 0,
//       y: 15
//     });
//     Body.setVelocity(user, {
//         x: 0,
//         y: 0
//       });
//
//   requestAnimationFrame(draw);
// }



var Zopa = Zopa || {};

Zopa.sprites = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    var engine = Engine.create(),
        world = engine.world;
				world.gravity.x=0;
				world.gravity.y=0;

    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            background: '#000000',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

	var cuchara = Bodies.rectangle(300,300,60,60,
				{

						render: {
              // fillStyle: 'transparent'
            }}
	);

    var offset = 10,
        options = {
            isStatic: true,
            render: {
              fillStyle: 'transparent'
            }
        };

    world.bodies = [];

    // paredes
    World.add(world, [
        Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
        Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options),
			  cuchara
    ]);

    var stack = Composites.stack(20, 20, 10, 4, 0, 0, function(x, y) {
        if (Common.random() > 0.5) {
            return Bodies.rectangle(x, y, 16, 64, {
                render: {
                    strokeStyle: '#ffffff',
                    fillStyle: '#ffffff'
                }
            });
        } else {
            return Bodies.circle(x, y, 32-8, {
                density: 0.0005,
                frictionAir: 0.06,
                restitution: 0.3,
                friction: 0.01,
                render: {
									lineWidth: 16,
                    strokeStyle: '#ffffff',
                    fillStyle: 'transparent'
                }
            });
        }
    });

    World.add(world, stack);

/*
				var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);
    render.mouse = mouse;
*/
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

		document.body.onmousemove=function(e){
			Matter.Body.setVelocity(cuchara, { x: 0, y: 0 });
			Matter.Body.setAngularVelocity(cuchara, 0.5)
			Matter.Body.setPosition(cuchara, { x: e.pageX, y: e.pageY });


		}

};

Zopa.sprites();
