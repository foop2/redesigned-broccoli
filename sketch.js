let fluid;
let isPaused = -1;

function setup() {
  createCanvas(600, 600);
  frameRate(5);
  fluid = new Fluid(0.2, 0, 0.0000001);
}


function draw() {
  stroke(51);
  strokeWeight(2);

  //makes text when paused
  if (isPaused === 1) {
    push();
    textAlign(CENTER, TOP);
    textSize(75);
    fill('white');
    strokeWeight(6);
    stroke('black');
    text('Paused', width / 2, height / 2)
    pop();
  }
  
  if (isPaused === -1) {
    //checks if its paused or not before doing things
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
}
  
  //pause/unpause detection feature

  function keyPressed() {
  if (key === 'p') {
    isPaused *= -1 //'p' changes -1 to 1, if its -1 simulation plays, if its 1 it does not play
  }
}

// Fluid Simulation
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html
// https://youtu.be/alhpH6ECFvQ

// This would not be possible without:
// Real-Time Fluid Dynamics for Games by Jos Stam
// http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
// Fluid Simulation for Dummies by Mike Ash
// https://mikeash.com/pyblog/fluid-simulation-for-dummies.html
