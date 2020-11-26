/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let startTime;

function setup() {
  createCanvas(1000, 320);
  background(0);
  video = createCapture(VIDEO);
  video.size(width, height);

poseNet = ml5.poseNet(video, modelReady);
poseNet.on("pose", function(results) {
    poses = results;
  });
}


function modelReady() {
  select("#status").html("Model Loaded");
  startTime = Date.now();
}



function draw() {
  //image(video, 0, 0, width, height);
  grphRWristVert();
}


// A function to track vertical movements of R wrist against time
function grphRWristVert(){
   for (let i = 0; i < poses.length; i += 1) {
     const pose = poses[i].pose;
      if (pose.rightWrist.confidence > 0.2) {
        newtime = Date.now() - startTime;
        fill(255,255,0);
	noStroke();
        ellipse(newtime/10, pose.rightWrist.y/2, 4, 4);
        fill(0,255,255);
	noStroke();
        ellipse(newtime/10, pose.rightWrist.x/2, 4, 4); 
      }
      if (Date.now() - startTime > 10000){
        startTime = Date.now();
        clear();
	background(0);
      }
    }
  }