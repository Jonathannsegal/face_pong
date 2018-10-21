Matter.use(
  'matter-wrap'
)

/// module aliases
var Engine = Matter.Engine,
    Events = Matter.Events,
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

//create a ball
var ball = Bodies.circle(render.canvas.width/2, render.canvas.height/2, 40, {
  frictionAir:0,
  friction:0
});


var topWall = Bodies.rectangle(render.canvas.width/2, 0, render.canvas.width, 10, {isStatic:true});
var bottomWall = Bodies.rectangle(render.canvas.width/2, render.canvas.height, render.canvas.width, 10, {isStatic:true});
var rightWall = Bodies.rectangle(210, render.canvas.height/2, 10, render.canvas.height, {isStatic:true});
var leftWall = Bodies.rectangle(render.canvas.width, render.canvas.height/2, 10, render.canvas.height, {isStatic:true});
// ctx.arc(dets[i][1], dets[i][0], dets[i][2]/2, 0, 2*Math.PI, false);

// add all of the bodies to the world
World.add(engine.world, [topWall, bottomWall, leftWall, rightWall, ball])

Body.setVelocity(ball, {
  x:0,
  y:0
});

var score = 0;
// run the engine
// Engine.run(engine);

// run the renderer
Render.run(render);

var cuchara = Bodies.rectangle(-300,-300,100,300,
      {
          isStatic : true,
          render: {
            // fillStyle: 'transparent'
          }}
);
var cuchara2 = Bodies.rectangle(-300,-300,100,300,
      {
          isStatic : true,
          render: {
            // fillStyle: 'transparent'
          }}
);

World.add(engine.world, cuchara);
World.add(engine.world, cuchara2);

engine.world.gravity.y = 0;
engine.world.gravity.x = 0;

var collisionTopWall = Matter.Pair.id(ball,topWall);
var collisionBottomWall = Matter.Pair.id(ball, bottomWall);
var collisionPointP1 = Matter.Pair.id(ball, rightWall);
var collisionPointP2 = Matter.Pair.id(ball, leftWall);
var collisionPlayer1 = Matter.Pair.id(ball, cuchara);
var collisionPlayer2 = Matter.Pair.id(ball, cuchara2);
var scorePlayer1 = 0;
var scorePlayer2 = 0;

Events.on(engine, "collisionStart", function(event){
    var pairs = event.pairs;
    for(var i = pairs.length - 1; i >= 0; i--){
        var pair = pairs[i];

        if(pair.id == collisionTopWall){
          Body.setVelocity(ball, {x:ball.velocity.x, y:-ball.velocity.y});
        }

        if(pair.id == collisionBottomWall){
          Body.setVelocity(ball, {x:ball.velocity.x, y:-ball.velocity.y});
        }

        if(pair.id == collisionPointP1){
          scorePlayer1++;
          checkOver();
          document.getElementById('score1').innerHTML = "Player 1: " + scorePlayer1;
          resetBall();
        }

        if(pair.id == collisionPointP2){
          scorePlayer2++;
          checkOver();
          document.getElementById('score2').innerHTML = "Player 2: " + scorePlayer2;
          resetBall();
        }

        if(pair.id == collisionPlayer1){
          Body.setVelocity(ball, {x:-ball.velocity.x, y:ball.velocity.y});
        }

        if(pair.id == collisionPlayer2){
          Body.setVelocity(ball, {x:-ball.velocity.x, y:ball.velocity.y});
        }
    }
});

function checkOver(){
  if(scorePlayer1 >= 5){
    localStorage.setItem("winner","Player 1 Wins");
    window.location.pathname = 'C:/Users/jonat/Documents/GitHub/hungryhungryhacker/GameOverScreen2.html';
  }
  if (scorePlayer2 >= 5){
    localStorage.setItem("winner","Player 2 Wins");
    window.location.pathname = 'C:/Users/jonat/Documents/GitHub/hungryhungryhacker/GameOverScreen2.html';
  }
}

function resetBall(){
  Body.setVelocity(ball, {x:0,y:0});
  Body.setPosition(ball, {x:render.canvas.width/2,y:render.canvas.width/2});
}

/*$(window).keypress(function(e) {
    if (e.which === 32) {

        Body.setVelocity(ball, {x:3, y:3});

    }
});*/

document.onkeypress = function (e) {
    if(e.keyCode == 32){
    Body.setVelocity(ball,{x:3,y:3});
  }
};

draw();

function draw(){
  Runner.tick(runner, engine, 1000/60);




  Engine.update(engine);
  requestAnimationFrame(draw);
}
