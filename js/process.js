let progress = document.querySelector(".progress");
let song = document.querySelector(".song");
let ctrlIcon = document.querySelector(".playBtn");
let time = document.querySelector(".song_time");
let play = document.querySelector("#play");
let songImg = document.querySelector(".song_img");

const rangeWrap = document.querySelector(".range-wrap");

let items = document.querySelector(".items");
let comp = document.querySelector(".comp");
let cont = document.querySelector(".content");
let forW = document.querySelector(".for");
let back = document.querySelector(".back");
let sname = document.querySelector(".Sname");
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
  document.body.classList.add("loaded");
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
  updateBeforeBar(progress);
  let sec = Math.floor(song.currentTime) % 60;
  let min = Math.floor(Math.floor(song.currentTime) / 60);
  sec = sec < 10 ? "0" + sec : sec;
  min = min < 10 ? "0" + min : min;
  time.innerText = `${min}:${sec}`;
  let rot = song.currentTime / song.duration;
  songImg.style.transform = `rotate(${rot * 720}deg)`;
  if (progress.value == Math.round(song.duration)) {
    play.classList = "fa fa-play";
    rangeWrap.style.setProperty("--progress-width", `${0}%`);
    progress.value = 0;
    song.currentTime = 0;
    song.pause();
  }
}, 500);

progress.onchange = function () {
  song.currentTime = progress.value;
};
function updateBeforeBar(el) {
  const percent = ((el.value - el.min) / (el.max - el.min)) * 100;
  rangeWrap.style.setProperty("--progress-width", `${percent}%`);
}

progress.addEventListener("input", () => updateBeforeBar(progress));
updateBeforeBar(progress);

let sources = [
  {
    name: "East_Duo",
    src: "https://w4rdr43w4n.github.io/MusicPlayer/songs/East_Duo_Georgian_Song.m4a",
    // src: "../songs/East_Duo_Georgian_Song.m4a",
    img: "imgs/east.jpeg",
    theme: "green-theme",
  },
  {
    name: "Skaba-Akhras",
    src: "https://w4rdr43w4n.github.io/MusicPlayer/songs/Skaba-Akhras.mp3",
    //src: "../songs/Skaba-Akhras.mp3",
    img: "imgs/Skaba.jpg",
    theme: "wine-theme",
  },
  {
    name: "Shami-Khayal",
    src: "https://w4rdr43w4n.github.io/MusicPlayer/songs/Shami-Khiala.mp3",
    //src: "../songs/Shami-Khiala.mp3",
    img: "imgs/khayal.jpeg",
    theme: "slate-theme",
  },
  /* Add More Songs Here */
];

song.setAttribute("src", sources[0].src);
sname.innerText = sources[0].name;
setTheme(null, sources[0].theme);
songImg.src = sources[0].img || "imgs/Unknown.jpg";
let currentSong = 0;

forW.addEventListener("click", () => {
  const prev = sources[currentSong].theme;
  currentSong++;
  if (currentSong > sources.length - 1) {
    currentSong = 0;
  }
  setTheme(prev, sources[currentSong].theme);
  loadSongWithImage(
    song,
    songImg,
    sources[currentSong].src,
    sources[currentSong].img
  );
  songImg.src = sources[currentSong].img || "imgs/Unknown.jpg";
  song.setAttribute("src", sources[currentSong].src);
  sname.innerText = sources[currentSong].name;
  if (play.classList == "fa fa-pause") {
    song.play();
  }
});
back.addEventListener("click", () => {
  const prev = sources[currentSong].theme;
  currentSong--;

  if (currentSong < 0) {
    currentSong = sources.length - 1;
  }
  setTheme(prev, sources[currentSong].theme);
  loadSongWithImage(
    song,
    songImg,
    sources[currentSong].src,
    sources[currentSong].img
  );
  songImg.src = sources[currentSong].img || "imgs/Unknown.jpg";

  song.setAttribute("src", sources[currentSong].src);
  sname.innerText = sources[currentSong].name;
  if (play.classList == "fa fa-pause") {
    song.play();
  }
});

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};
const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "disabled");
};
darkmode = localStorage.getItem("darkmode");

if (darkmode === "active") {
  document.body.classList.add("darkmode");
}
document.querySelector(".themeToggle").addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode === "active" ? disableDarkmode() : enableDarkmode();
});
enableDarkmode();

function setTheme(oldT, newT) {
  if (oldT) {
    document.body.classList.remove(oldT);
  }
  if (newT) {
    document.body.classList.add(newT);
  }
}

/* Correct Loading */
function showLoader() {
  document.getElementById("loader").classList.add("active");
}

function hideLoader() {
  document.getElementById("loader").classList.remove("active");
}

function loadSongWithImage(audioElement, imgElement, audioSrc, imgSrc) {
  showLoader();

  let audioLoaded = false;
  let imgLoaded = false;

  // set sources
  audioElement.src = audioSrc;
  imgElement.src = imgSrc;

  // handle audio load
  audioElement.oncanplaythrough = () => {
    audioLoaded = true;
    checkAllLoaded();
  };

  // handle image load
  imgElement.onload = () => {
    imgLoaded = true;
    checkAllLoaded();
  };

  // fallback in case one fails to load
  audioElement.onerror = imgElement.onerror = () => {
    hideLoader();
  };

  function checkAllLoaded() {
    if (audioLoaded && imgLoaded) {
      hideLoader();
    }
  }
}
