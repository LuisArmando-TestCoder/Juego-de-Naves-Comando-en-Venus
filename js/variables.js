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
  setShipPosition: () => {
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