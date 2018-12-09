/*************************** 
  Declaración de variables
***************************/
let storyTellingBool;
let seeIfStartBool = true;
let ctx = canvas.getContext('2d');
let planetSize = 550;
let planetX = canvas.width + canvas.width * 2.25;
let xMovement = planetX;
let theStartInterval; // to set a counter on corner
let onSky;
let bulletSpeed = 42;
let globalPoints = 0;
let seeIfStart = true;
let pause = false;
let itemsToLoad;
let loadValue = 0;
let currentIndexElementLoaded = 0;
let loadIntervalIndex;

/***********
  Cadenas
************/
let bulletArray = [];
let enemiesArray = [];
let asteroidsArray = [];
let messages = [    
  "motor de fotones",
  "rayo de plasma",
  "inhibidor de antigravedad",
  "cañon de antimateria",
  "compartimento de bebidas energéticas",
  "aistema de autodestrucción",
  "generador de partículas",
  "mecanismo de acoplamiento",
  "escudo térmico",
  "módulo de teletranspotación",
  "inodoro moderno japonés",
  "tanques de dióxido",
  "frecuencias de comunicación",
  "sala de control",
  "cápsula de emergencia",
  "receptores de radiación",
  "sensores de proximidad ",
  "radar de neutrinos",
  "adornos de obsidiana",
  "paneles rotatorios",
  "gafas de sol",
  "sistema de camuflaje",
  "medidor de fuentes magnéticas",
  "caleidoscopio",
  "invernadero",
  "hidromasajeador",
  "ondas de choque temporales",
  "microprocesadores",
  "compuertas XOR",
  "satélites naturales",
  "cubierta de orichalcum",
  "easter eggs"
];    

/***********
  Objetos
************/
let ship = {
  life: 21,
  size: 65,
  y: undefined,
  x: 200,
  speed: 9,
  controlsBool: false,
  controls: (e) => {
    switch (e.keyCode) {
      case 40: //down
        ship.controlsBool = true;
        if (ship.speed < 0) ship.speed = -ship.speed;
        break;
      case 38: //up
        ship.controlsBool = true;
        if (ship.speed > 0) ship.speed = -ship.speed;
        break;
      case 83: //s
        ship.controlsBool = true;
        if (ship.speed < 0) ship.speed = -ship.speed;
        break;
      case 87: //w
        ship.controlsBool = true;
        if (ship.speed > 0) ship.speed = -ship.speed;
    }
  },

  //--------------------
  //Botones de disparo
  //--------------------
  controlsGun: (e) => {
    switch (e.keyCode) {
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

//--------------------
//Objeto de imagenes
//--------------------
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

//-------------------
// Objeto de sonidos
//-------------------
let soundsObj = {
  inicio: new Audio('sounds/voices/intro.mp3'),

  intro: [
    new Audio('sounds/voices/bienvenida1.mp3'),
    new Audio('sounds/voices/cubana.mp3')
  ],

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
    new Audio('sounds/voices/aahh.mp3'),
    new Audio('sounds/voices/miau.mp3'),
    new Audio('sounds/voices/miau2.mp3')
  ],

  bienvenida: [
    new Audio('sounds/introSongs/AnotherOneBitesTheDust.mp3'),
    new Audio('sounds/introSongs/WarPigs.mp3')
  ],

  lose: [
    new Audio('sounds/voices/youlose.mp3'),
    new Audio('sounds/voices/youlose2.mp3')
  ],

  extra: {
    luis: new Audio('sounds/extras/luis.ogg'),
    ali: new Audio('sounds/extras/ali.ogg')
  }
}

/*****************
  ExtraVariables
******************/
let randomSongIntroIndex = r(0, soundsObj.bienvenida.length - 1);
let randomSongInGameIndex = r(0, soundsObj.cancionesDelJuego.length - 1);
let randomIntroSoundIndex = r(0, soundsObj.intro.length - 1);
let seeIfIntroSoundStarted = true;