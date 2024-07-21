let progress = document.querySelector(".progress");
let song  = document.querySelector(".song");
let ctrlIcon = document.querySelector(".playBtn");
let time = document.querySelector(".song_time");
let play = document.querySelector("#play");
let songImg = document.querySelector(".song_img");

let con = document.querySelector("#con");
let items = document.querySelector(".items");
let comp = document.querySelector(".comp");
let inF = document.querySelector(".files");
let cont = document.querySelector(".content");
let forW = document.querySelector(".for");
let back = document.querySelector(".back");
let sname = document.querySelector(".Sname");
song.onloadedmetadata = function(){
  progress.max = song.duration;
  progress.value = song.currentTime;
}
ctrlIcon.addEventListener("click",()=>{
  if(play.classList == "fa fa-pause"){
    song.pause();
    play.classList = "fa fa-play";  
  }
  else{
    song.play();
    play.classList = "fa fa-pause";
  }
});

setInterval(()=>{
    progress.value = song.currentTime;
    let sec = Math.floor(song.currentTime) % 60;
    let min = Math.floor(Math.floor(song.currentTime) / 60);
    sec = (sec<10)? ("0"+sec):sec;
    min = (min<10)? ("0"+min):min;
    time.innerText = `${min}:${sec}`;
    let rot = song.currentTime/song.duration;
    songImg.style.transform = `rotate(${rot*720}deg)`;
  },500);

progress.onchange = function(){
  song.currentTime = progress.value;
}
/* get files */ 
function overlap(state){
  if(state){
  con.classList = "fa fa-close";
  items.style.display = "flex";
  comp.style.display = "none";
  }
  else{
  con.classList = "fa fa-arrow-right";
  items.style.display = "none";
  comp.style.display = "flex";
  }
}
con.addEventListener("click",()=>{
if(con.classList == "fa fa-arrow-right"){
  overlap(true);
}
else{
  overlap(false);
}
});


let sources = [];
inF.addEventListener("change",(event)=>{
  sources = [];
  const files = event.target.files;
  for(const file of files){
    if(file.type == "audio/x-m4a" || file.type == "audio/mpeg"){
    sources.push(`${file.webkitRelativePath}`);
    }
    else{
      alert("some files are of invalid format");
      break;
    }
  }
  
  song.setAttribute('src',sources[0]);
  sname.innerText = inF.files[0].name;
});

let currentSong = 0;

forW.addEventListener("click",()=>{
  currentSong++;
  if(currentSong > inF.files.length-1){currentSong = 0;}
  song.setAttribute('src',sources[currentSong]);
  sname.innerText = inF.files[currentSong].name;
  if(play.classList == "fa fa-pause"){song.play()};
});
back.addEventListener("click",()=>{
  currentSong--;
  if(currentSong < 0){currentSong = inF.files.length-1;}
  song.setAttribute('src',sources[currentSong]);
  sname.innerText = inF.files[currentSong].name;
  if(play.classList == "fa fa-pause"){song.play()};
});





