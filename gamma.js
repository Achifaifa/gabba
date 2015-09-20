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
  
  if (step>25){
    sidedel=step-25
    if(sidedel>=200){sidedel=200}
    ctx.clearRect(0,0,sidedel,600)
    ctx.clearRect(800,0,-sidedel,600)
  }

  if (step>190){
    doublebond=step-190
    if (doublebond>20){doublebond=20}
    drawline(517,382,517,382-doublebond)
    drawline(523,382,523,382-doublebond)
  }

  if (step>220){
    ctx.fillText("H N",160,390)
    ctx.font="10px quizma-light";
    ctx.fillText("2",175,390)
    ctx.font="25px quizma-thin";
    ctx.fillText("OH",605,427)
    ctx.fillText("O",513,360)
  }

  if (step>230){
    ctx.font="100px quizma-thin";
    ctx.fillText("GAB A",265,100)
    ctx.font="40px quizma-light";
    ctx.fillText("2",435,100)
    ctx.font="25px quizma-thin";
  }
}

test=1
function main(){

  
  if(noclear==0){ctx.clearRect(0,0,800,600);}
  updateclock()
  ctx.fillStyle="white";
  ctx.strokeStyle="white";


  intro(step)

  if (test==0){
    1+1
  }

  ctx.fillText(step,10,580);
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
  track=new Audio("audio.wav");
  track.src="./audio.wav";
  
  track.addEventListener("canplaythrough",function(){
    ctx.clearRect(0,0,600,600);
    drawline(0,250,600,250);
    drawline(0,350,600,350);
    ctx.fillText("PLAY",225,310);
    done=1;
    c.addEventListener("mousedown",demo,false)
    },false
  );
  track.load();
}

setInterval(main,1000/60);
menu()