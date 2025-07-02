let progress = document.querySelector(".progress");
let song = document.querySelector(".song");
let ctrlIcon = document.querySelector(".playBtn");
let time = document.querySelector(".song_time");
let play = document.querySelector("#play");
let songImg = document.querySelector(".song_img");

let items = document.querySelector(".items");
let comp = document.querySelector(".comp");
let cont = document.querySelector(".content");
let forW = document.querySelector(".for");
let back = document.querySelector(".back");
let sname = document.querySelector(".Sname");
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};
ctrlIcon.addEventListener("click", () => {
  if (play.classList == "fa fa-pause") {
    song.pause();
    play.classList = "fa fa-play";
  } else {
    song.play();
    play.classList = "fa fa-pause";
  }
});

setInterval(() => {
  progress.value = song.currentTime;
  let sec = Math.floor(song.currentTime) % 60;
  let min = Math.floor(Math.floor(song.currentTime) / 60);
  sec = sec < 10 ? "0" + sec : sec;
  min = min < 10 ? "0" + min : min;
  time.innerText = `${min}:${sec}`;
  let rot = song.currentTime / song.duration;
  songImg.style.transform = `rotate(${rot * 720}deg)`;
}, 500);

progress.onchange = function () {
  song.currentTime = progress.value;
};

/*
let sources = [
  {
    name: "East_Duo",
    src: "../songs/East_Duo_Georgian_Song.m4a",
  },
  {
    name: "Ay_Carmella",
    src: "../songs/Ay_Carmela_Spanish_Song.m4a",
  },
  {
    name: "Hala_Madrid",
    src: "../songs/Real_Madrid_Song.m4a",
  },
];
*/
song.setAttribute("src", sources[0].src);
sname.innerText = sources[0].name;
let currentSong = 0;

forW.addEventListener("click", () => {
  currentSong++;
  if (currentSong > sources.length - 1) {
    currentSong = 0;
  }
  song.setAttribute("src", sources[currentSong].src);
  sname.innerText = sources[currentSong].name;
  if (play.classList == "fa fa-pause") {
    song.play();
  }
});
back.addEventListener("click", () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = sources.length - 1;
  }
  song.setAttribute("src", sources[currentSong].src);
  sname.innerText = sources[currentSong].name;
  if (play.classList == "fa fa-pause") {
    song.play();
  }
});
