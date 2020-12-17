/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let handpose;
let predictions = [];
let startTime;

function setup() {
  createCanvas(1640, 480);
  background(0);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();


handpose = ml5.handpose(video, modelReady);
handpose.on("predict", function(results) {
    predictions = results;
  });
//setTimeout (offPose, 180000);
}




function modelReady() {
  select("#status").html("Model Loaded");
  startTime = Date.now();
}



function draw() {
  translate(640,0);
  scale(-1, 1);
  image(video,0,0,640,480)
  translate(640,0);
  scale(-1, 1);
  //image(video, 0, 0, width, height);
  grphRD2();

}



  // A function to track vertical movements of thumb and index finger tip against frame
  function grphRD2(){
     for (let k = 0; k < predictions.length; k += 1) {
       const prediction = predictions[k];
       //console.log(prediction);
       const indexF = prediction.landmarks[8];
       const thumbF = prediction.landmarks[4];
       //console.log(indexF[1]/2, thumbF[1]/2);
        if (prediction.handInViewConfidence > 0.2) {
          newtime = Date.now() - startTime;
          fill(255,255,0);
  	noStroke();
          ellipse(newtime/10+640, indexF[1], 4, 4);
          fill(0,255,255);
  	noStroke();
          ellipse(newtime/10+640, thumbF[1], 4, 4);
          //console.log(indexF[1]/2, thumbF[1]/2);
          fill(255,0,0);
  	noStroke();
          ellipse(640-indexF[0], indexF[1], 4, 4);
          fill(0,255,0);
  	noStroke();
          ellipse(640-thumbF[0], thumbF[1], 4, 4);
        }
        if (Date.now() - startTime > 10000){
          startTime = Date.now();
          clear();
    background(0);
        }
      }
    }
