/*************************** 
  Declaración de variables
***************************/
let storyTellingBool;
let ctx = canvas.getContext('2d');
let planetSize = 550;
let planetX = canvas.height - (canvas.height + canvas.height);
let theStartInterval; // to set a counter on corner
let onSky;
let bulletSpeed = 10;

/***********
  Cadenas
************/
let bulletArray = [];

/***********
  Objetos
************/
let ship = {
  size: 50,
  y: undefined,
  x: 300,
  speed: 7,
  controlsBool: false,
  controls: (e) => {
    ship.controlsBool = true;
    switch (e.keyCode) {
      case 40: //down
        if (ship.speed < 0) ship.speed = -ship.speed;
        break;
      case 38: //up
        if (ship.speed > 0) ship.speed = -ship.speed;
        break;
      case 83: //s
        if (ship.speed < 0) ship.speed = -ship.speed;
        break;
      case 87: //w
        if (ship.speed > 0) ship.speed = -ship.speed;
        break;
      case 90: //disparos con la z
        createBullet();
        break;
      case 79: //disparos con la o
        createBullet();
    }
  },
  setShipPosition: ()=> {
    if (ship.controlsBool) {
      ship.y += ship.speed;
      if (ship.y > canvas.height) {
        ship.y = 0 - ship.size;
      }
      if (ship.y < 0 - ship.size) {
        ship.y = canvas.height;
      }
    }
    ctx.drawImage(imagesObj.spaceShip[1], ship.x, ship.y, ship.size, ship.size);
  }
}
let imagesObj = {
  asteroids: [
    new Image(),
    new Image()
  ],
  spaceShip: [
    new Image(),
    new Image()
  ],
  ufo: [
    new Image(),
    new Image(),
    new Image(),
    new Image()
  ],
  boom: [
    new Image(),
    new Image(),
  ],
  venus: new Image()
};
let soundsObj = {
  inicio: new Audio(),

  balas: new Audio(),

  cancionesDelJuego: [
    new Audio('sounds/gameSongs/GetLucky.mp3'),
    new Audio('sounds/gameSongs/Ghostbusters.mp3'),
    new Audio('sounds/gameSongs/MrBlueSky.mp3'),
    new Audio('sounds/gameSongs/NeverGonnaGiveYouUp.mp3'),
    new Audio('sounds/gameSongs/TakeMeHomeCountryRoads.mp3'),
    new Audio('sounds/gameSongs/TalkDirtyToMe.mp3'),
    new Audio('sounds/gameSongs/TheFinalCountdown.mp3'),
    new Audio('sounds/gameSongs/TheTrooper.mp3'),
    new Audio('sounds/gameSongs/Wiggle.mp3')
  ],

  explosiones: [
    new Audio(),
    new Audio(),
    new Audio()
  ],

  bienvenida: [
    new Audio('sounds/introSongs/AnotherOneBitesTheDust.mp3'),
    new Audio('sounds/introSongs/StarWars.mp3'),
    new Audio('sounds/introSongs/TurnDownForWhat.mp3'),
    new Audio('sounds/introSongs/WarPigs.mp3')
  ],

  sonidosSistema: {
    win: new Audio(),
    lose: new Audio(),
    limite: new Audio()
  },

  extra: {
    luis: new Audio('sounds/extras/luis.ogg'),
    ali: new Audio('sounds/extras/ali.ogg')
  }
}

/***********
  extraVariables
************/
let randomSongIntroIndex = r(0, soundsObj.bienvenida.length - 1);
let randomSongInGameIndex = r(0, soundsObj.cancionesDelJuego.length - 1);

/***********
  Funciones
************/

function changeSong() {
  soundsObj.cancionesDelJuego[randomSongInGameIndex].pause();
  randomSongInGameIndex++;
  if (randomSongInGameIndex > soundsObj.cancionesDelJuego.length - 1) {
    randomSongInGameIndex = 0;
  }
  for (let i of soundsObj.cancionesDelJuego) {
    i.pause();
  }
  soundsObj.cancionesDelJuego[randomSongInGameIndex].play();
}

function tellStory(seeIfStart = true) {
  let time = 42;
  startScreen.style.setProperty('z-index', -1);
  startScreen.style.setProperty('opacity', 0);
  onSky.style.setProperty('opacity', 0);
  soundsObj.bienvenida[randomSongIntroIndex].play();
  storyContainer.style.setProperty('animation', `from-bottom-to-top ${time}s linear forwards`);
  wt(() => {
    storyContainer.style.setProperty('animation', '');
    if (seeIfStart) {
      startGame();
    } else {
      startScreen.style.setProperty('z-index', 10);
      startScreen.style.setProperty('opacity', 1);
      onSky.style.setProperty('opacity', 1);
    }
  }, time * 1000 + 1000);
  theStartInterval = wi(() => {
    startCounter.innerHTML = time;
    time--;
    if (time < 0) {
      window.clearInterval(theStartInterval);
      startCounter.innerHTML = '';
    }
  }, 1000);
}

function genImages() {
  imagesObj.asteroids[0].src = 'img/003-asteroid.svg';
  imagesObj.asteroids[1].src = 'img/008-asteroid-1.svg';
  imagesObj.spaceShip[0].src = 'img/006-spaceship.svg';
  let imgCounter = 0;
  wi(() => {
    imgCounter++;
    if (imgCounter === 3) {
      imgCounter = 0;
    }
    imagesObj.spaceShip[1].src = `img/007-spaceship-1-${imgCounter}.svg`;
  }, 250);
  imagesObj.boom[0].src = 'img/011-explosion.svg';
  imagesObj.boom[1].src = 'img/012-boom.svg';
  imagesObj.ufo[0].src = 'img/001-ufo.svg';
  imagesObj.ufo[1].src = 'img/002-ufo-1.svg';
  imagesObj.ufo[2].src = 'img/004-ufo-2.svg';
  imagesObj.ufo[3].src = 'img/005-ufo-3.svg';
  imagesObj.venus.src = 'img/009-venus.svg';
}

function drawPlanet() {
  ctx.drawImage(imagesObj.venus, planetX, 0, canvas.height, canvas.height);
}

function createBullet() {
  bulletArray.push({
    x: ship.x + ship.size,
    y: ship.y + ship.size / 2,
    r: 3
  });
}

function drawBullets() {
  for (let i of bulletArray) {
    ctx.beginPath();
    ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, false);
    ctx.fillStyle = '#fecf01';
    ctx.fill();
    i.x += bulletSpeed;
    if (i.x - i.r > canvas.width) bulletArray.splice(bulletArray.indexOf(i), 1);
  }
}

function moveSky() {
  planetX-=Math.abs(ship.speed*1.5);
  for(let i of document.querySelector('.sky').children){
    let left = i.getAttribute('left') - 0.25;
    if(left < 0){
      left = 100;
      sp(i, 'top', r(0, 99) + '%');
    } 
    sp(i, 'left', left + '%');
    sa(i, 'left', left);
  }
}

/***************
  Local Storage
****************/

// localStorage.setItem('TellingTheBool', false);

if (localStorage.getItem('TellingTheBool') === 'true') {
  storyTellingBool = false;
} else {
  storyTellingBool = true;
  localStorage.setItem('TellingTheBool', true);
}