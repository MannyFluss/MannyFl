var cohesionStrength = 0.00001;
var alignmentStrength = 0.01;
var separationStrength = 0.0001;
var speedLimit = 1;
var boidSize = 25; // Adjust this to change the size of the boids


var gradientCanvas = document.getElementById('gradientCanvas');
var gradientCtx = gradientCanvas.getContext('2d');
var boidsCanvas = document.getElementById('boidsCanvas');
var boidsCtx = boidsCanvas.getContext('2d');

function resizeCanvas() {
    gradientCanvas.width = window.innerWidth;
    gradientCanvas.height = window.innerHeight;
    boidsCanvas.width = window.innerWidth;
    boidsCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

var boids = [];
for (var i = 0; i < 100; i++) {
    boids[i] = {
        x: Math.random() * boidsCanvas.width,
        y: Math.random() * boidsCanvas.height,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
        color: 'hsla(' + Math.random() * 360 + ', 100%, 80%, 1)'
    };
}

function drawBoid(boid) {
    return
    boidsCtx.fillStyle = boid.color;
    boidsCtx.beginPath();
    boidsCtx.moveTo(boid.x, boid.y);
    boidsCtx.lineTo(boid.x - boidSize * boid.dx - boidSize / 2 * boid.dy, boid.y - boidSize * boid.dy + boidSize / 2 * boid.dx);
    boidsCtx.lineTo(boid.x - boidSize * boid.dx + boidSize / 2 * boid.dy, boid.y - boidSize * boid.dy - boidSize / 2 * boid.dx);
    boidsCtx.closePath();
    boidsCtx.fill();
}

function moveBoid(boid) {
    var center = {x: 0, y: 0};
    var avoid = {x: 0, y: 0};
    var match = {dx: 0, dy: 0};

    for (var i = 0; i < boids.length; i++) {
        if (boid === boids[i]) continue;

        var dx = boids[i].x - boid.x;
        var dy = boids[i].y - boid.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 25) {
            avoid.x -= dx;
            avoid.y -= dy;
        }

        center.x += boids[i].x;
        center.y += boids[i].y;
        match.dx += boids[i].dx;
        match.dy += boids[i].dy;
    }

    center.x /= boids.length - 1;
    center.y /= boids.length - 1;
    match.dx /= boids.length - 1;
    match.dy /= boids.length - 1;

    boid.dx += (center.x - boid.x) * cohesionStrength + avoid.x * separationStrength + (match.dx - boid.dx) * alignmentStrength;
    boid.dy += (center.y - boid.y) * cohesionStrength + avoid.y * separationStrength + (match.dy - boid.dy) * alignmentStrength;

    var speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
    if (speed > speedLimit) {
        boid.dx /= speed / speedLimit;
        boid.dy /= speed / speedLimit;
    }

    boid.x += boid.dx;
    boid.y += boid.dy;
    if (boid.x < 0) boid.x += boidsCanvas.width;
    if (boid.y < 0) boid.y += boidsCanvas.height;
    if (boid.x > boidsCanvas.width) boid.x -= boidsCanvas.width;
    if (boid.y > boidsCanvas.height) boid.y -= boidsCanvas.height;
}

var hue1 = Math.random() * 360;
var hue2 = (hue1 + 180) % 360;
var hueSpeed = 0.1;

function updateGradient() {
    var gradient = gradientCtx.createLinearGradient(0, 0, gradientCanvas.width, gradientCanvas.height);
    gradient.addColorStop(0, 'hsla(' + hue1 + ', 100%, 80%, 1)');
    gradient.addColorStop(1, 'hsla(' + hue2 + ', 100%, 80%, 1)');
    gradientCtx.fillStyle = gradient;
    gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

    hue1 = (hue1 + hueSpeed) % 360;
    hue2 = (hue2 + hueSpeed) % 360;
}

var particles = [];

function createExplosion(x, y, color) {
    var numParticles = 10;
    var speed = 2;
    for (var i = 0; i < numParticles; i++) {
        particles.push({
            x: x,
            y: y,
            dx: speed * Math.cos(i * 2 * Math.PI / numParticles),
            dy: speed * Math.sin(i * 2 * Math.PI / numParticles),
            color: color
        });
    }
}

function drawParticle(particle) {
    boidsCtx.fillStyle = particle.color;
    boidsCtx.beginPath();
    boidsCtx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
    boidsCtx.fill();
}

function moveParticle(particle) {
    particle.x += particle.dx;
    particle.y += particle.dy;
}

boidsCanvas.addEventListener('click', function(event) {
    var rect = boidsCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var color = 'hsla(' + Math.random() * 360 + ', 100%, 80%, 1)';
    boids.push({
        x: x,
        y: y,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
        color: color
    });
    createExplosion(x, y, color);
});

function updateBoids() {
    boidsCtx.clearRect(0, 0, boidsCanvas.width, boidsCanvas.height);
    boids.forEach(drawBoid);
    boids.forEach(moveBoid);
    particles.forEach(drawParticle);
    particles.forEach(moveParticle);
    requestAnimationFrame(updateBoids);
}

setInterval(updateGradient, 1); // Update gradient every 1ms
updateGradient();
updateBoids();
