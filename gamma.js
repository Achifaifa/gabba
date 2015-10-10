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

  //if (step>70 && step<130) {step=97+(step/50)}
  for (i=0; i<text.length; i++){
    ctx.fillText(
      text[i],
      x-(6*Math.random()-3)+(20*i),
      y-(6*Math.random()-3)
    );
  }
}

function drawang(x,y,len,ang){

  xd=Math.sin(ang)*len;
  yd=Math.cos(ang)*len;
  drawline(x,y,x+xd,y+yd);
}

function laz0r(step){

  if (laz0rstep!=step){
    laz0rx1=Math.random()*600;
    laz0ry1=Math.random()*600;
    laz0rx2=Math.random()*600;
    laz0ry2=Math.random()*600;
    laz0rstep=step;
  }
  // Goto start point and draw a line
  ctx.beginPath();
  ctx.strokeStyle=laz0rcolours[Math.floor(Math.random()*4.4)];
  ctx.moveTo(laz0rx1,laz0ry1);
  ctx.lineTo(laz0rx2,laz0ry2);
  ctx.stroke();
  ctx.strokeStyle="white";
}

function laz0r2(x,y,colour,step){
  /*
  Draws whirling lasers

  step: clock signal
  */

  ctx.strokeStyle=colour;
  ctx.fill();
  for (i=0; i<40; i++){
    drawang(x,y,1600,(1.17*step)+(i*0.157))
  }
  ctx.strokeStyle="white";
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

meatt=1.4;
meatgoo=0.95
function meatballs(step){
  /*
  meatball effect

  step: clock signal
  */

  meatang=3.14*step/150;
  meatballA=[400+Math.cos(meatang*2.5)*350,300+Math.sin(meatang*2)*150];
  meatballB=[400+Math.sin(meatang*1.8)*350,300+Math.cos(meatang*2.0)*150];
  meatballC=[400+Math.sin(meatang+100)*350,300+Math.cos(meatang+50)*150];

  for (i=0; i<60; i++){
    for (j=0; j<80; j++){
      if ((50/Math.pow(Math.sqrt(Math.pow(meatballA[0]-j*10,2)+Math.pow(meatballA[1]-i*10,2)),meatgoo))+
          (40/Math.pow(Math.sqrt(Math.pow(meatballB[0]-j*10,2)+Math.pow(meatballB[1]-i*10,2)),meatgoo))+
          (40/Math.pow(Math.sqrt(Math.pow(meatballC[0]-j*10,2)+Math.pow(meatballC[1]-i*10,2)),meatgoo))>meatt){
        ctx.fillRect(j*10,i*10,10,10);
      }
    }
  }
}

speeds=[1,1,1.2,1.7,2,1.5,0.9,1,2,1.3,1.6]
function flashmodels(step,beat){

  beat=beat%24

  if (beat%2==0){

    ctx.fillRect(0,0,800,600);
    ctx.fillStyle="black"
  }

  ysize=models[beat].height*(600/models[beat].width)
  ydif=600-ysize
  ctx.drawImage(models[beat],100,ydif/2,600,ysize)


  ctx.font="50px sans"
  normscroll(100,"Lol pero qué es esto",step*speeds[1])
  normscroll(150,"Epilepsiaaaa",(step-200)*speeds[2])
  normscroll(200,"EL CUBOOOOOOO",(step-350)*speeds[3])
  normscroll(250,"Menudos frikis",(step-100)*speeds[4])
  normscroll(300,"Demasiado comercial...",(step-350)*speeds[5])
  normscroll(350,"NO lo PILLO",(step-50)*speeds[6])
  ctx.font="25px quizma-thin";

}

function greets(step){

  normscroll(50,"Greets to",step%250)

  shaketext(305,100,"Kandel")
  creditalpha=1-(step/50)
  eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha+")'")
  ctx.fillRect(290,105,200,-40)
  ctx.fillStyle="white"


  if (step>35){
    shaketext(95,150,"Gasset")
    creditalpha2=1-((step-35)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha2+")'")
    ctx.fillRect(85,160,200,-40)
    ctx.fillStyle="white"
  }

  if (step>70){
    shaketext(445,200,"Sacks")
    creditalpha3=1-((step-70)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha3+")'")
    ctx.fillRect(435,210,200,-40)
    ctx.fillStyle="white"
  }

  if (step>115){
    shaketext(225,250,"Liepmann")
    creditalpha4=1-((step-115)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha4+")'")
    ctx.fillRect(215,260,200,-40)
    ctx.fillStyle="white"
  }

  if (step>140){
    shaketext(545,300,"Vogt")
    creditalpha5=1-((step-140)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha5+")'")
    ctx.fillRect(535,310,200,-40)
    ctx.fillStyle="white"
  }

  if (step>175){
    shaketext(375,350,"Llinás")
    creditalpha6=1-((step-175)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha6+")'")
    ctx.fillRect(365,360,200,-40)
    ctx.fillStyle="white"
  }

  if (step>210){
    shaketext(150,400,"Westphal")
    creditalpha7=1-((step-210)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha7+")'")
    ctx.fillRect(140,410,200,-40)
    ctx.fillStyle="white"
  }

  if (step>245){
    shaketext(525,450,"Charcot")
    creditalpha8=1-((step-245)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha8+")'")
    ctx.fillRect(515,460,200,-40)
    ctx.fillStyle="white"
  }

  if (step>280){
    shaketext(300,500,"Marinescu")
    creditalpha9=1-((step-280)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha9+")'")
    ctx.fillRect(290,510,200,-40)
    ctx.fillStyle="white"
  }
}

function actualgreets(step){

  normscroll(50,"No, seriously",step%250)

  shaketext(305,100,"MeTrO")
  creditalpha=1-(step/50)
  eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha+")'")
  ctx.fillRect(290,105,200,-40)
  ctx.fillStyle="white"


  if (step>35){
    shaketext(170,150,"SOGA")
    creditalpha2=1-((step-35)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha2+")'")
    ctx.fillRect(160,160,200,-40)
    ctx.fillStyle="white"
  }

  if (step>70){
    shaketext(445,200,"Bixo")
    creditalpha3=1-((step-70)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha3+")'")
    ctx.fillRect(435,210,200,-40)
    ctx.fillStyle="white"
  }

  if (step>115){
    shaketext(225,250,"DC4Lan team")
    creditalpha4=1-((step-115)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha4+")'")
    ctx.fillRect(215,260,300,-40)
    ctx.fillStyle="white"
  }

  if (step>140){
    shaketext(545,300,"Freddy")
    creditalpha5=1-((step-140)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha5+")'")
    ctx.fillRect(535,310,200,-40)
    ctx.fillStyle="white"
  }

  if (step>175){
    shaketext(300,350,"H4m")
    creditalpha6=1-((step-175)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha6+")'")
    ctx.fillRect(290,360,200,-40)
    ctx.fillStyle="white"
  }

  if (step>210){
    shaketext(150,400,"EKParty scene crew")
    creditalpha7=1-((step-210)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha7+")'")
    ctx.fillRect(140,410,400,-40)
    ctx.fillStyle="white"
  }

  if (step>245){
    shaketext(525,450,"PKT Team")
    creditalpha8=1-((step-245)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha8+")'")
    ctx.fillRect(515,460,200,-40)
    ctx.fillStyle="white"
  }

  if (step>280){
    shaketext(300,500,"NecroStudios")
    creditalpha9=1-((step-280)/50)
    eval("ctx.fillStyle='rgba(0, 0, 0,"+creditalpha9+")'")
    ctx.fillRect(290,510,280,-40)
    ctx.fillStyle="white"
  }
}

function outro(step){

  ctx.font="40px sans"
  if (beat%2==0){ctx.fillText("_(^o^\\)",365,250);}
  else if (beat%2==1){ctx.fillText("\\(^o^_)",365,250);}
  ctx.fillText("_________",350,260);
  ctx.fillText("|              |",337,292)
  ctx.font="25px quizma-thin";


  laz0r2(500,100,"green",step);
  laz0r2(-20,-20,"green",step);

  uremargin=(step*4)%480

  for (i=0;i<3;i++){

    ctx.drawImage(urethane,(i*480)-uremargin,400)
  }
  
  if (step>3160){

    substep=step-3300
    stagemargin=substep*7
    ctx.drawImage(stage,stagemargin,0)
  }

  else if (step>3015){

    substep=step-3015
    achimargin=substep*7
    ctx.drawImage(achifaifa,800-achimargin,0)
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

test=0
function main(){
  
  if(noclear==0){ctx.clearRect(0,0,800,600);}
  updateclock()
  ctx.fillStyle="white";
  ctx.strokeStyle="white";
  ctx.lineWidth=1; 

  // test zone
  // intro(step)
  // threedgaba(step)
  // flashmodels(step,beat)
  // greets(step)
  // actualgreets(step)
  // outro(step)
  // meatballs(step)

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

    else if (step<2345){

      substep=step-2010
      actualgreets(substep)
    }

    else if (step<2670){

      meatballs(step)
    }

    else if (step<3340){

      outro(step)
    }

    else{

    ctx.drawImage(logo,0,0,800,600)
    }
  }

  ctx.fillText(step,10,580);
  ctx.fillText(beat,80,580);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

items=[
"./models/gaba0.png",
"./models/achifaifa.png",
"./models/stage.png",
"./models/logo.png",
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
"./models/urethane.png",
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
