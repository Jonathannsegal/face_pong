var e = Matter.Engine.create(document.body);
var a = Matter.Bodies.rectangle(400, 400, 100, 60);
var b = Matter.Bodies.rectangle(450, 100, 100, 60);

Matter.Events.on(e, 'collisonEnd', _ => {
    _.pairs.forEach(_ => {
        if(_.bodyA === a || _.bodyB === a)
            Matter.World.remove(e.world, a);
    });
});

Matter.World.add(e.world, [a, b]);
Matter.Engine.run(e);
