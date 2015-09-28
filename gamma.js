var c=document.getElementById("gamma");
c.style.background="#000";
var ctx=c.getContext("2d");
ctx.canvas.width=800;
ctx.canvas.height=600;
ctx.fillStyle="white";
ctx.strokeStyle="white";
ctx.font="25px quizma-thin";
noclear=0;
step=0

starttime=Date.now()

function updateclock(){

  step=(Date.now()-starttime)/33
}

function draw(){

  ctx.stroke()
}

function drawline(x1,y1,x2,y2){

  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  draw();
}

function intro(step){

  for (i=0;i<11;i++){
    if(i%2==0){drawline((i*80)-40,420,((i+1)*80)-40,380)}
    else      {drawline((i*80)-40,380,((i+1)*80)-40,420)}
  }
  
  if (step>45){
    sidedel=(step-45)*3
    if(sidedel>=200){sidedel=200}
    ctx.clearRect(0,0,sidedel,600)
    ctx.clearRect(800,0,-sidedel,600)
  }

  if (step>160){
    doublebond=step-160
    if (doublebond>20){doublebond=20}
    drawline(517,382,517,382-doublebond)
    drawline(523,382,523,382-doublebond)
  }

  if (step>180){
    h2nalpha=(step-180)/30
    oalpha=(step-185)/30
    ohalpha=(step-190)/30
    if (h2nalpha>1){h2nalpha=1}
    if (oalpha>1){oalpha=1}
    if (ohalpha>1){ohalpha=1}

    eval("ctx.fillStyle = 'rgba(255, 255, 255,"+h2nalpha+")'")
    ctx.fillText("H N",160,390)
    ctx.font="10px quizma-light";
    ctx.fillText("2",175,390)
    eval("ctx.fillStyle = 'rgba(255, 255, 255,"+oalpha+")'")
    ctx.font="25px quizma-thin";
    ctx.fillText("OH",605,427)
    eval("ctx.fillStyle = 'rgba(255, 255, 255,"+ohalpha+")'")
    ctx.fillText("O",513,360)
    ctx.fillStyle="white"
  }

  if (step>275){
    titlealpha=(step-275)/40
    if (titlealpha>1){titlealpha=1}
    eval("ctx.fillStyle = 'rgba(255, 255, 255,"+titlealpha+")'")
    ctx.font="100px quizma-thin";
    ctx.fillText("GAB A",265,100)
    ctx.font="40px quizma-light";
    ctx.fillText("2",435,100)
    ctx.font="25px quizma-thin";
    fillStyle = "white"
  }
}

function threedgaba(step){

  eval("ctx.drawImage(cube"+Math.floor(step%60)+","+(400+200*Math.sin(step/30))+",300)")
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

test=0
function main(){
  
  if(noclear==0){ctx.clearRect(0,0,800,600);}
  updateclock()
  ctx.fillStyle="white";
  ctx.strokeStyle="white";


  // intro(step)
  // threedgaba(step)

  if (test==0){

    if (step<670){
      intro(step)
    }
    else if (step<1000){
      ctx.fillText("blabal",400,300)
    }
  }

  ctx.fillText(step,10,580);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

items=[
"./models/cube0.gif",
"./models/cube4.gif",
"./models/cube5.gif",
"./models/cube13.gif",
"./models/cube17.gif",
"./models/cube20.gif",
"./models/cube24.gif",
"./models/cube28.gif",
"./models/cube31.gif",
"./models/cube35.gif",
"./models/cube39.gif",
"./models/cube42.gif",
"./models/cube46.gif",
"./models/cube53.gif",
"./models/cube57.gif",
"./models/cube6.gif",
"./models/cube10.gif",
"./models/cube14.gif",
"./models/cube18.gif",
"./models/cube21.gif",
"./models/cube25.gif",
"./models/cube29.gif",
"./models/cube32.gif",
"./models/cube36.gif",
"./models/cube3.gif",
"./models/cube43.gif",
"./models/cube47.gif",
"./models/cube50.gif",
"./models/cube54.gif",
"./models/cube58.gif",
"./models/cube7.gif",
"./models/cube11.gif",
"./models/cube15.gif",
"./models/cube19.gif",
"./models/cube22.gif",
"./models/cube26.gif",
"./models/cube2.gif",
"./models/cube33.gif",
"./models/cube37.gif",
"./models/cube40.gif",
"./models/cube44.gif",
"./models/cube48.gif",
"./models/cube51.gif",
"./models/cube55.gif",
"./models/cube59.gif",
"./models/cube8.gif",
"./models/cube12.gif",
"./models/cube16.gif",
"./models/cube1.gif",
"./models/cube23.gif",
"./models/cube27.gif",
"./models/cube30.gif",
"./models/cube34.gif",
"./models/cube38.gif",
"./models/cube41.gif",
"./models/cube45.gif",
"./models/cube49.gif",
"./models/cube52.gif",
"./models/cube56.gif",

"./models/cube9.gif"];

// Loader specification
spin=2*Math.PI;
itemincrement=spin/items.length;
ctx.lineWidth=5; ctx.strokeStyle="#FABADA";
x=400; y=300; decpath=false; startrad=3*(Math.PI/2);

function loader(items, allDone) {

  // Return nothing if the item list is empty
  if (!items) {return;}
  if ("undefined"===items.length) {items=[items];}
  // Action every time a image loads
    var count=items.length;
    var thingToDoCompleted=function (items, i) {
    count--;
    // If all items loaded, launch specified function
    if (count==0) {
      ctx.lineWidth=1; 
      ctx.strokeStyle="white";
      allDone();
    }
    // If not, draw loading bar+message
    else {
      ctx.clearRect(0,0,800,600);
      ctx.beginPath();
      ctx.arc(x,y,50,startrad,startrad+itemincrement*(items.length-count),false);
      ctx.stroke();
      ctx.fillText((items.length-count)+"/"+items.length,x-20,y+5);
    }};
  // Actual loading loop
  for (var i=0; i<items.length; i++){
    loadImage(items, i, thingToDoCompleted);}}

function loadImage(items, n, onComplete) {

  var onLoad=function (e) {
    e.target.removeEventListener("load", onLoad);
    onComplete(items, n);}

  // Defining variable name
  photoname=items[n].replace("./models/","").replace(".gif","");
  // Create object and specify source
  // No var is used to it's created as a global object attribute
  eval(photoname+"=new Image()");
  eval(photoname+".addEventListener('load', onLoad, false)");
  eval(photoname+".src=items[n]");
}

function demo(ev){
  last_click={"x":ev.clientX-c.offsetLeft+window.scrollX,"y":ev.clientY+window.scrollY-c.offsetTop};
  if (last_click.y>250 && last_click.y<350){
    c.removeEventListener("mousedown",demo);
    clearInterval();
    starttime=Date.now()
    if (test==0){track.play();}
    setInterval(main,1000/60);
  }
}

function menu(){

  menuc=0;
  done=0;
  ctx.fillText("LOADERING",250,310);
  track=new Audio("audio.mp3");
  track.src="./audio.mp3";
  
  track.addEventListener("canplaythrough",function(){
    ctx.clearRect(0,0,600,600);
    drawline(100,250,700,250);
    drawline(100,350,700,350);
    ctx.fillText("PLAY",325,310);
    done=1;
    c.addEventListener("mousedown",demo,false)
    },false
  );
  track.load();
}

function startanim(){
  setInterval(main,1000/60);
}

loader(items, menu);
menu()