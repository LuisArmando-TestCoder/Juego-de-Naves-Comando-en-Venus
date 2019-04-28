/*************************** 
 * Declaración de variables
***************************/

let storyTellingBool;
let seeIfStartBool = true;
let ctx = canvas.getContext('2d');
let planetSize = 550;
let planetX = canvas.width + canvas.width * 2.25;
let xMovement = planetX;
let theStartInterval; // to set a counter on corner
let onSky;
let bulletSpeed = 22;
let globalPoints = 0;
let seeIfStart = true;
let pause = false;
let itemsToLoad;
let loadValue = 0;
let currentIndexElementLoaded = 0;
let loadIntervalIndex;
let enemyIndex = 0;

/***********
  Cadenas
************/
let bulletArray = [];
let enemiesArray = [];
let asteroidsArray = [];
let explosionArray = [];
let remainingLifeArray = [];
let heartsArray = [];
let messages = [    
  'motor de fotones',
  'rayo de plasma',
  'inhibidor de antigravedad',
  'cañon de antimateria',
  'compartimento de bebidas energéticas',
  'aistema de autodestrucción',
  'generador de partículas',
  'mecanismo de acoplamiento',
  'escudo térmico',
  'módulo de teletranspotación',
  'inodoro japonés',
  'tanques de dióxido',
  'frecuencias de comunicación',
  'sala de control',
  'cápsula de escape',
  'receptores de radiación',
  'sensores de proximidad ',
  'radar de neutrinos',
  'adornos de obsidiana',
  'paneles rotatorios',
  'gafas de sol',
  'sistema de camuflaje',
  'medidor de fuentes magnéticas',
  'caleidoscopio',
  'invernadero',
  'hidromasajeador',
  'ondas de choque temporales',
  'microprocesadores',
  'compuertas XOR',
  'satélites naturales',
  'cubierta de orichalcum',
  'easter eggs'
];    

/***********
  Objetos
************/
let ship = {
  life: 21,
  size: 65,
  y: undefined,
  x: 200,
  speed: 7,
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
  inicio: new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/intro.mp3'),

  intro: [
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/bienvenida1.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/cubana.mp3')
  ],

  cancionesDelJuego: [
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/GetLucky.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/Ghostbusters.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/MrBlueSky.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/NeverGonnaGiveYouUp.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/TakeMeHomeCountryRoads.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/TalkDirtyToMe.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/TheFinalCountdown.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/TheTrooper.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/gameSongs/Wiggle.mp3')
  ],

  explosiones: [
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/aahh.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/miau.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/miau2.mp3')
  ],

  bienvenida: [
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/introSongs/AnotherOneBitesTheDust.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/introSongs/WarPigs.mp3')
  ],

  lose: [
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/youlose.mp3'),
    new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/voices/youlose2.mp3')
  ],

  extra: {
    luis: new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/extras/luis.ogg'),
    ali: new Audio('https://luisarmando-testcoder.github.io/Juego-de-Naves-Comando-en-Venus/sounds/extras/ali.ogg')
  }
}

let randomSongIntroIndex = r(0, soundsObj.bienvenida.length - 1);
let randomSongInGameIndex = r(0, soundsObj.cancionesDelJuego.length - 1);
let randomIntroSoundIndex = r(0, soundsObj.intro.length - 1);
let seeIfIntroSoundStarted = true;

let generateItem = generate();
