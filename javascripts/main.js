var globe = new Image();
globe.src = './img/globe.png'
var anneau = new Image();
anneau.src = './img/anneau.png'
var satellite1 = new Image();
satellite1.src = './img/satellite1.png'
var satellite2 = new Image();
satellite2.src = './img/satellite2.png'
var satellite3 = new Image();
satellite3.src = './img/satellite3.png'
var ariane = new Image();
ariane.src = './img/ariane.png'


//Rotate satellite around the center of canvas
document.body.onload = function() {
  requestAnimationFrame(mainLoop);
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawImageRotated(img, x, y, anchorPoint, scale, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.translate(img.width/2, anchorPoint);
  ctx.rotate(degtorad(rot));
  ctx.scale(scale, scale);
  ctx.translate(-(img.width/2), -(anchorPoint));
  ctx.drawImage(img, 0, 0);
  ctx.translate(-x, -y);
  ctx.restore();
}

function degtorad (deg) {
  rad = deg * Math.PI / 180;
  return rad;
}

// var rotation1 = 0;
// var rotation2 = 0;
// var rotation3 = 0;

//draw the images and turn in rotation
function mainLoop() {
  // rotation1+=1;
  // rotation1 = rotation1%360;
  // rotation2-=0.5;
  // rotation2 = rotation2%360;
  // rotation3+=0.5;
  // rotation3 = rotation3%360;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(globe, canvas.width/2 - globe.width/2, canvas.height/2 - globe.height/2);
  ctx.drawImage(anneau, canvas.width/2 - anneau.width/2, canvas.height/2 - anneau.height/2);
  // ctx.drawImage(ariane, canvas.width/2- ariane.width/2,canvas.height/2 - ariane.height/2, (90/310)*200, 200);

  // drawImageRotated(satellite1,423, 285, 165, 1, rotation1);
  // drawImageRotated(satellite2,423, 239, 211, 1, rotation2);
  // drawImageRotated(satellite3,423, 193, 257, 1, rotation3);

  // for (var i=0; i<rotations.length; i++) {
  //   rotations[i] += speed[i];
  //   rotations[i] = rotations[i]%360;
  // }

  for (var i=0; i<satellites.length; i++) {
    var cs = satellites[i]; // current satellite
    cs[6] += cs[5];
    cs[6] = cs[6]%360;
    drawImageRotated(cs[0],cs[1],cs[2], cs[3], cs[4],cs[6]); 
    // example : drawImageRotated([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]), 
    //which is (img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0)

  }

  for (var i=0; i<rockets.length; i++) {
    var cr = rockets[i]; // current rocket
    // cr[1] += cr[5];
    cr[2] -= cr[5]/2;
    if (cr[4]<0.9){
      // cr[4] = EasingFunctions.easeInOutQuad(0.003) * 1;
      cr[4] += 0.006;
    }
    
    drawImageRotated(cr[0],cr[1],cr[2], cr[3],cr[4],cr[6]); 
    // example : drawImageRotated([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]), 
    //which is (img, x, y, anchorPoint, scale, rotation speed randomly beetween 0.5-1, rot angle at 0)
    
  }
  requestAnimationFrame(mainLoop);
  
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// var rotations = [];
// var speed = [];
var satellites = [];
var rockets = [];

// var rotations = [0,0,0];
// var speed = [getRandomArbitrary(0.5, 1),getRandomArbitrary(0.5, 1),getRandomArbitrary(0.1, 0.5)];
//var satellites = [[satellite1,423, 285, 165, 1],[satellite2,423, 239, 211, 1],[satellite3],423, 193, 257, 1]];

var button1 = document.getElementById("button1")
button1.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.5, 1));    
  satellites.push([satellite1, 423, 285, 165, 1, getRandomArbitrary(0.5, 1), 0]);
  displayScore(satellites);
};

var button2 = document.getElementById("button2")
button2.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.5, 1));
  satellites.push([satellite2, 423, 239, 211, 1, getRandomArbitrary(0.5, 1), 0]);
  displayScore(satellites);
};
 
var button3 = document.getElementById("button3")
button3.onclick = function () {
  // rotations.push(0);
  // speed.push(getRandomArbitrary(0.1, 0.5));
  satellites.push([satellite3, 423, 193, 257, 1,getRandomArbitrary(0.1, 0.5), 0]);
  displayScore(satellites);
};
  
function displayScore (array) {
  document.getElementById('score').innerHTML = `${array.length} satellites running around the globe!`;
}

function deleteRandomSatellite (){
    var randomIndex = Math.floor(Math.random()*satellites.length);
    satellites.splice(randomIndex, 1);
    // rotations.splice(randomIndex, 1);
    // speed.splice(randomIndex, 1);
    console.log(satellites);
}

var deleteButton = document.getElementById("buttonDelete")
deleteButton.onclick = function () {
deleteRandomSatellite(satellites);
displayScore(satellites);
}

var positionButton = document.getElementById("buttonPosition")
positionButton.onclick = function () {
  var satellitesPositionArray = [];
  for (var i=0; i<satellites.length; i++) {
  var eachSatellitesPosition = satellites[i][6]; 
  satellitesPositionArray.push(eachSatellitesPosition);
}  
alert(satellitesPositionArray);
}

var positionRocketButton = document.getElementById("buttonRocketsPosition");
positionRocketButton.onclick = function () {
  var rocketsPositionArray = [];
  for (var i=0; i<rockets.length; i++) {
  // var eachRocketPositionX = rockets[i][[1]]
  // var eachRocketPositionY = rockets[i][[2]]
  var eachRocketPositionX = rockets[i][1]
  var eachRocketPositionY = rockets[i][2]
  rocketsPositionArray.push(`X=${eachRocketPositionX}`, `Y=${eachRocketPositionY}`);
  
}  

alert(rocketsPositionArray);
}

function addSatellite(position){
  var targetSatellite;
  var targetY;
  var targetAnchorpoint;
  var targetSpeed;
  if(position == 1){
    targetSatellite = satellite1;
    targetY = 285;
    targetAnchorpoint = 165;
    targetSpeed = getRandomArbitrary(0.5, 1);
  } else if(position == 2){
    targetSatellite = satellite2;
    targetY = 239;
    targetAnchorpoint = 211;
    targetSpeed = getRandomArbitrary(0.5, 1);
  } else if(position == 3){
    targetSatellite = satellite3;
    targetY = 193;
    targetAnchorpoint = 257;
    targetSpeed = getRandomArbitrary(0.1, 0.5);
  }
  satellites.push([targetSatellite, 423, targetY, targetAnchorpoint, 1, targetSpeed, 0]);
  displayScore(satellites);
}

function addRocket() {
  rockets.push([ariane, canvas.width/2- ariane.width/2,canvas.height/2 - ariane.height/2, 250, 0.05, 0.4, 0]);
}

var buttonAriane = document.getElementById("buttonAriane")
buttonAriane.onclick = function () {
  addRocket();
}

var nextspacebarFunction = "goaddRocket";

//make satellite appear when space bar is pressed
document.onkeydown = function (e) {
  console.log('keydown');
  if(e.keyCode === 32) {
    if (nextspacebarFunction == "goaddRocket") {
      addRocket();
      nextspacebarFunction = "goaddSatellite";
    } else if(nextspacebarFunction == "goaddSatellite") {
      var lastRocket = rockets[rockets.length-1];
      var lastRocketY = lastRocket[2];
      //alert(lastRocketY);
      checkaddSatellitevsRocketPosition(lastRocketY);
      //addSatellite();
      nextspacebarFunction = "goaddRocket";
    }
  }
}

function checkExistingSatellitesPositions(position) {
  //alert('checkExistingSatellitesPositions');
  var rotLeft = 350;
  var rotRight = 10;
  var willCrash = false;
  for (var i = 0; i<satellites.length; i++) {
    //if((position >= rotLeft) && (position <= rotRight)) {
    var testedSatellite = satellites[i];
    //alert(testedSatellite[6]);
    if ((testedSatellite[6] >= rotLeft) || (testedSatellite[6] <= rotRight)) {
       // dans zone a risque
       if ((testedSatellite[2] == 285) && (position == 1)) {
        alert('BOOM avec 1');
        willCrash = true;
       } else if ((testedSatellite[2] == 239) && (position == 2)) {
        alert('BOOM avec 2');
        willCrash = true;
       } else if ((testedSatellite[2] == 193) && (position == 3)) {
        alert('BOOM avec 3');
        willCrash = true;
       }


    }
  }
  if (willCrash == false) {
    addSatellite(position);
  }

}


function checkaddSatellitevsRocketPosition(y) {
//si la position Y de la fusée est = 250
// alors addSatellite(2);
  var rocketOffset = 50;
  y += rocketOffset;
  var borderBetween1And2 = 280;
  var borderBetween2And3 = 233;
  var borderLowest = 325;
  var borderHighest = 185;

  if ((y <= borderBetween2And3)&&(y >= borderHighest)) {
    checkExistingSatellitesPositions(3);
    //addSatellite(3);
  }
  else if ((y <= borderBetween1And2) && (y >= borderBetween2And3)) {
    checkExistingSatellitesPositions(2);
    //addSatellite(2);
  }
  else if ((y >= borderBetween1And2) && (y <= borderLowest)) {
    checkExistingSatellitesPositions(1);
    //addSatellite(1);
  } else if (y >= borderLowest) {
    alert("too early");
  } else {
    alert("too late");
  }
  //alert('y = ' + y);
}





// EasingFunctions = {
//   linear: function (t) {
//       return t
//   },
//   easeInQuad: function (t) {
//       return t * t
//   },
//   easeOutQuad: function (t) {
//       return t * (2 - t)
//   },
//   easeInOutQuad: function (t) {
//       return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
//   },
//   easeInCubic: function (t) {
//       return t * t * t
//   },
//   easeOutCubic: function (t) {
//       return (--t) * t * t + 1
//   },
//   easeInOutCubic: function (t) {
//       return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
//   },
//   easeInQuart: function (t) {
//       return t * t * t * t
//   },
//   easeOutQuart: function (t) {
//       return 1 - (--t) * t * t * t
//   },
//   easeInOutQuart: function (t) {
//       return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
//   },
//   easeInQuint: function (t) {
//       return t * t * t * t * t
//   },
//   easeOutQuint: function (t) {
//       return 1 + (--t) * t * t * t * t
//   },
//   easeInOutQuint: function (t) {
//       return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
//   }
// }
