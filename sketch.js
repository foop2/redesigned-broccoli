let fluid;
let isPaused = false;
let isCrazy = false;
let menuScreen = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(24);
  fluid = new Fluid(0.2, 0, 0.0000001);
}
//resizes canvas to fit window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  stroke(51);
  strokeWeight(2);
  
  //menu
  if (menuScreen === true) {
      fill('gray')
      rect(0, 0, width, height)
  }
  
  if (isPaused) {
    push();
    textAlign(CENTER, CENTER);
    textSize(150);
    fill('white');
    strokeWeight(6);
    stroke('black');
    text('Paused', windowWidth / 2, windowHeight / 2)
    pop();
  }
  
  if (!isPaused) {
    //checks if its not paused before doing things
    let cx = int((0.5 * width) / SCALE);
    let cy = int((0.5 * height) / SCALE);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        fluid.addDensity(cx + i, cy + j, random(50, 150));
      }
    }
    for (let i = 0; i < 2; i++) {
      let angle = noise(t) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.mult(0.2);
      t += 0.01;
     fluid.addVelocity(cx, cy, v.x, v.y);
    }
    fluid.step();
    fluid.renderD();
  }  
  //increments crazy by one so it can cycle through
  crazyVarR += 10 
  if (crazyVarR >= 195) {
    crazyVarR = 73
  }
  crazyVarG += 10 
  if (crazyVarG >= 195) {
    crazyVarG = 69
  }
  crazyVarB += 10 
  if (crazyVarB >= 195) {
    crazyVarB = 57
  }
}//END OF DRAW
 
function keyPressed() {
  if (key === 'p') {
    isPaused = !isPaused;  // toggle paused
  } else if (key === 'f') {
    fullscreen(!fullscreen());  // toggle fullscreen
  } else if (key === 'c' && isPaused === false) {
    isCrazy = !isCrazy;  // toggle crazy but only if unpaused
  } else if (key === 'd') {
    console.log(`isPaused is ${isPaused}`)
    console.log(`isCrazy is ${isCrazy}`)
    console.log(`menuScreen is ${menuScreen}`)
  } else if (key === 'm') {
    menuScreen = !menuScreen;  // toggle menu
  }
} 



/*
CREDITS
 Fluid Simulation
 Daniel Shiffman
 https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html
 https://youtu.be/alhpH6ECFvQ
 This would not be possible without:
 Real-Time Fluid Dynamics for Games by Jos Stam
 http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
 Fluid Simulation for Dummies by Mike Ash
 https://mikeash.com/pyblog/fluid-simulation-for-dummies.html
 */