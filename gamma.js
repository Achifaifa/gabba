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
beat=0

starttime=Date.now()

function updateclock(){

  deltat=Date.now()-starttime
  step=Math.floor(deltat/33)
  beat=Math.floor(deltat/344.8276)
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

function normscroll(y,text,step){

  for (i=0; i<text.length; i++){
    xpos=800-5*step+i*25;
    ctx.fillText(text[i],xpos,y)
  }
}

function shaketext(x,y,text){
  /*
  Generates a title screen that breaks over time
  x,y: Text position
  text: String to be shown
  step: clock signal
  */

  //if (step>70 && step<130) {step=97+(step/50)}
  for (i=0; i<text.length; i++){
    ctx.fillText(
      text[i],
      x-(6*Math.random()-3)+(20*i),
      y-(6*Math.random()-3)
    );
  }
}

function intro(step){

  if (step>400){
    gabaalphastep=1-((step-400)/350)
    ctx.drawImage(gaba0,0,0)
    eval("ctx.fillStyle = 'rgba(0, 0, 0,"+gabaalphastep+")'")
    ctx.fillRect(0,0,800,600)
    ctx.fillStyle="white"
  }

  if (step<160){
    chainbottom=0
    chaintop=11
  }
  else{
    chaintop=8
    chainbottom=3
  }
  for (i=chainbottom;i<chaintop;i++){
    if(i%2==0){drawline((i*80)-40,420,((i+1)*80)-40,380)}
    else      {drawline((i*80)-40,380,((i+1)*80)-40,420)}
  }

  if (step<160){
    if (step>45){
      sidedel=(step-45)*4
      if(sidedel>=200){sidedel=200}
      ctx.clearRect(0,0,sidedel,600)
      ctx.clearRect(800,0,-sidedel,600)
    }
  }

  if (step>160){
    doublebond=step-160
    if (doublebond>20){doublebond=20}
    drawline(517,382,517,382-doublebond)
    drawline(523,382,523,382-doublebond)
  }

  if (step>180){
    h2nalpha=(step-180)/50
    oalpha=(step-195)/50
    ohalpha=(step-210)/50
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

  step=Math.floor(step%41)
  eval("ctx.drawImage(gaba"+step+",0,0)")
}


function flashmodels(step,beat){

  beat=beat%25

  if (beat%2==0){

    ctx.fillRect(0,0,800,600);
    ctx.drawImage(models[beat],0,0,800,600)
    ctx.fillStyle="black"
  }

  else{

    ctx.drawImage(models[beat],0,0,800,600)
  }

  ctx.font="50px sans"
  normscroll(100,"TEST",step)
  ctx.font="25px quizma-thin";

}

function greets(step){

  normscroll(50,"Greets to",step%250)
  shaketext(280,100,"Kandel")
  shaketext(70,150,"subjectB")
  shaketext(420,200,"subjectB")
  shaketext(200,250,"subjectC")
  shaketext(520,300,"subjectD")
  shaketext(350,350,"subjectE")
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

test=1
function main(){
  
  if(noclear==0){ctx.clearRect(0,0,800,600);}
  updateclock()
  ctx.fillStyle="white";
  ctx.strokeStyle="white";
  ctx.lineWidth=1; 

  // test zone
  //intro(step)
  //threedgaba(step)
  //flashmodels(step,beat)
  greets(step)

  if (test==0){

    if (step<670){

      intro(step)
    }

    else if (step<1000){

      substep=step-670
      threedgaba(substep)
    }

    else if (step<1670){

      substep=step-1000
      flashmodels(substep,beat)
    }

    else if (step<2010){

      substep=step-1670
      greets(substep)
    }

    else if (step<2380){

      ctx.fillText("untz untz untz",350,300)
    }

    else if (step<2670){

      ctx.fillText("untz untz untz",350,300)
    }
  }

  ctx.fillText(step,10,580);
  ctx.fillText(beat,80,580);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

items=[
"./models/gaba0.png",
"./models/gaba1.png",
"./models/gaba2.png",
"./models/gaba3.png",
"./models/gaba4.png",
"./models/gaba5.png",
"./models/gaba6.png",
"./models/gaba7.png",
"./models/gaba8.png",
"./models/gaba9.png",
"./models/gaba10.png",
"./models/gaba11.png",
"./models/gaba12.png",
"./models/gaba13.png",
"./models/gaba14.png",
"./models/gaba15.png",
"./models/gaba16.png",
"./models/gaba17.png",
"./models/gaba18.png",
"./models/gaba19.png",
"./models/gaba20.png",
"./models/gaba21.png",
"./models/gaba22.png",
"./models/gaba23.png",
"./models/gaba24.png",
"./models/gaba25.png",
"./models/gaba26.png",
"./models/gaba27.png",
"./models/gaba28.png",
"./models/gaba29.png",
"./models/gaba30.png",
"./models/gaba31.png",
"./models/gaba32.png",
"./models/gaba33.png",
"./models/gaba34.png",
"./models/gaba35.png",
"./models/gaba36.png",
"./models/gaba37.png",
"./models/gaba38.png",
"./models/gaba39.png",
"./models/gaba40.png",
"./models/lglutamic.png",
"./models/lserine.png",
"./models/aspartic.png",
"./models/acetilcholine.png",
"./models/adrenaline.png",
"./models/atp.png",
"./models/gaba.png",
"./models/glycine.png",
"./models/histamine.png",
"./models/serotonin.png",
"./models/tryptamine.png",
"./models/tyramine.png",
"./models/lglutamic3d.png",
"./models/lserine3d.png",
"./models/aspartic3d.png",
"./models/acetilcholine3d.png",
"./models/adrenaline3d.png",
"./models/atp3d.png",
"./models/cart3d.png",
"./models/gaba3d.png",
"./models/glycine3d.png",
"./models/histamine3d.png",
"./models/serotonin3d.png",
"./models/tryptamine3d.png",
"./models/tyramine3d.png"];

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
  photoname=items[n].replace("./models/","").replace(".png","");
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

  models=[lglutamic,lglutamic3d,lserine,lserine3d,aspartic,aspartic3d,acetilcholine,histamine3d,adrenaline,adrenaline3d,atp,atp3d,gaba,gaba3d,glycine,glycine3d,histamine,histamine3d,serotonin,aspartic3d,tryptamine,tryptamine3d,tyramine,tyramine3d]
  menuc=0;
  done=0;
  ctx.fillText("LOADERING",250,310);
  track=new Audio("audio.mp3");
  track.src="./audio.mp3";
  
  track.addEventListener("canplaythrough",function(){
    ctx.lineWidth=1; 
    ctx.clearRect(0,0,800,600);
    drawline(100,250,700,250);
    drawline(100,350,700,350);
    ctx.fillText("PLAY",350,310);
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
