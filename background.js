/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/751983

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//Inspired by Felix Auer
//http://www.felixauer.com/javascript/difeqrk.html

// Fork by Manny Fluss
// If youre seeing this it means you are peeping into my website...
// hi...

var blobs = [];
var colors;
let variation = 0;
let xScale, yScale, centerX, centerY;

//auto change
let changeDuration = 3000;
let lastChange = 0;
let inFocus = true


function getRandomPastelColor() {
    // Generate a random color and mix it with white
    const mixWithWhite = (color) => Math.floor((color + 255) / 2);
    const red = mixWithWhite(Math.floor(Math.random() * 256));
    const green = mixWithWhite(Math.floor(Math.random() * 256));
    const blue = mixWithWhite(Math.floor(Math.random() * 256));

    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
}

function repeatFunction() {
    // Code to be executed repeatedly
    //max blob ct. 3000 seems reasonable, maybe if there is a way to determine performance
	if (blobs.length > 3000 || inFocus==false)
	{
		return; 
	}

	for(let i = 0; i < (xScale)/4; i++){
        let x = width * random() + random(-100, 100);
        let y = height * random() + random(-100, 100);
        var blob = {
            x : getXPos(x),
            y : getYPos(y),
            size : random(1, 5),
            lastX : x,
            lastY : y,
            color : colors[floor(random(colors.length))],
            direction : random(0.1, 1) * (random() > 0.5 ? 1 : -1)
        };
        blobs.push(blob);
    }

}

const xMilliseconds = 100; // Replace 2000 with the desired number of milliseconds
setInterval(repeatFunction, xMilliseconds);

function setup() {


	var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'absolute'); // Positioning the canvas
    canvas.style('z-index', '0'); // Placing the canvas behind other content
    canvas.parent('background-container'); // Setting the parent container for the canvas

	textAlign(CENTER, CENTER);
	
	xScale = width/20;
	yScale = height/20*(width/height);
	
	centerX = width/2;
	centerY = height/2;
	
	colors = [color(getRandomPastelColor()), color(getRandomPastelColor()), 
        color(getRandomPastelColor()), color(getRandomPastelColor()), color(getRandomPastelColor())];


	window.addEventListener('blur', function() {
		// noLoop();
		inFocus = false
	});

	// Resume sketch when the tab gains focus
	window.addEventListener('focus', function() {
		// loop();
		inFocus = true
	});
    
}
function draw() {
	/*
	//DEBUG
	textSize(20);
	noStroke();
	fill(255);
	ellipse(centerX, centerY, 60, 60);
	fill(0);
	text(variation, centerX, centerY-10);
	text(length, centerX, centerY+10);
	*/

	
	var length = blobs.length;
	if(length == 0){
		background("#1a0633");
		noStroke();
		fill(255);
		textSize(40);
		return;
	}
	
	noStroke();
	fill("#1a063310");
	rect(0, 0, width, height);
	
	//auto change
	let time = millis();
	if(time - lastChange > changeDuration) {
		lastChange = time;
		variation++;
		if(variation>11) variation = 0;
	}

	var stepsize = deltaTime*0.002;
	for(var i = length-1; i >= 0; i--){
		let blob = blobs[i];

		var x = getSlopeX(blob.x, blob.y);
		var y = getSlopeY(blob.x, blob.y);
		blob.x += blob.direction * x * stepsize;
		blob.y += blob.direction * y * stepsize;
		
		x = getXPrint(blob.x);
		y = getYPrint(blob.y);
		stroke(blob.color);
		strokeWeight(blob.size);
		line(x, y, blob.lastX, blob.lastY);
		blob.lastX = x;
		blob.lastY = y;
		
		const border = 200;
		if(x < -border || y < -border || x > width+border || y > height+border){
			blobs.splice(i,1);
		}
	}
}

function getSlopeY(x, y){
	switch(variation){
		case 0:return Math.sin(x);
		case 1:return Math.sin(x*5)*y*0.3;
		case 2:return Math.cos(x*y);
		case 3:return Math.sin(x)*Math.cos(y);
		case 4:return Math.cos(x)*y*y;
		case 5:return Math.log(Math.abs(x))*Math.log(Math.abs(y));
		case 6:return Math.tan(x)*Math.cos(y);
		case 7:return -Math.sin(x*0.1)*3;//orbit
		case 8:return (x-x*x*x)*0.01;//two orbits
		case 9:return -Math.sin(x);
		case 10:return -y-Math.sin(1.5*x) + 0.7;
		case 11:return Math.sin(x)*Math.cos(y);
	}
}
	
function getSlopeX(x,y){
	switch(variation){
		case 0:return Math.cos(y);
		case 1:return Math.cos(y*5)*x*0.3;
		case 2: 
		case 3: 
		case 4: 
		case 5: 
		case 6:return 1;
		case 7:return Math.sin(y*0.1)*3;//orbit
		case 8:return y/3;//two orbits
		case 9:return -y;		
		case 10:return -1.5*y;
		case 11:return Math.sin(y)*Math.cos(x);
	}
}

function getXPos(x){
	return (x-centerX)/xScale;
}
function getYPos(y){
	return (y-centerY)/yScale;
}

function getXPrint(x){
	return xScale*x+centerX;
}
function getYPrint(y){
	return yScale*y+centerY;
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Recalculate scales and centers if used in drawing
    xScale = width / 20;
    yScale = height / 20 * (width / height);
    centerX = width / 2;
    centerY = height / 2;

    // Additional recalculations if necessary
}
//window.addEventListener('resize', resizeCanvas);