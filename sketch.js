let fluid;
let isPaused = -1;
let isCrazy = -1;

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
  
  if (isPaused === 1) {
    push();
    textAlign(CENTER, CENTER);
    textSize(150);
    fill('white');
    strokeWeight(6);
    stroke('black');
    text('Paused', windowWidth / 2, windowHeight / 2)
    pop();
  }

  
  
  if (isPaused === -1) {
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
  
  
  console.log(`isPaused is ${isPaused}`)
  console.log(`isCrazy is ${isCrazy}`)
}//END OF DRAW
  
  //pause/unpause switch feature

  function keyPressed() {
  if (key === 'p') {
    isPaused *= -1 //'p' changes -1 to 1, if its -1 simulation plays, if its 1 it does not play
  } else if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
    //fullscreen
  } else if (key === 'c') {
    if (isPaused === -1) { 
      //if is here so if c is pressed while paused dos nothing
      isCrazy *= -1
    }
  }
}



//CREDITS
// Fluid Simulation
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html
// https://youtu.be/alhpH6ECFvQ

// This would not be possible without:
// Real-Time Fluid Dynamics for Games by Jos Stam
// http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
// Fluid Simulation for Dummies by Mike Ash
// https://mikeash.com/pyblog/fluid-simulation-for-dummies.html
