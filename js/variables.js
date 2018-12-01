/*************************** 
  Declaración de variables
***************************/
let storyTellingBool;
let ctx = canvas.getContext('2d');
let planetSize = 550;
let spaceShipSize = 50;
let spaceShipY;
let spaceShipSpeed = 10;
let theStartInterval; // to set a counter on corner
let onSky;
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
    new Audio(), 
    new Audio(),
    new Audio()
  ],

  explosiones: [
    new Audio(),
    new Audio(),
    new Audio()
  ],

  bienvenida: [
    new Audio(), 
    new Audio(),
    new Audio()
  ],

  sonidosSistema: {
    win: new Audio(),
    lose: new Audio(),
    limite: new Audio()
  },

  extra: {
    luis: new Audio(),
    ali: new Audio()
  }
}



/***********
  Funciones
************/

function genImages(){
  imagesObj.asteroids[0].src = '../img/003-asteroid.svg';
  imagesObj.asteroids[1].src = '../img/008-asteroid-1.svg';
  imagesObj.spaceShip[0].src = '../img/006-spaceship.svg';
  imagesObj.spaceShip[1].src = '../img/007-spaceship-1.svg';
  imagesObj.boom[0].src = '../img/011-explosion.svg';
  imagesObj.boom[1].src = '../img/012-boom.svg';
  imagesObj.ufo[0].src = '../img/001-ufo.svg';
  imagesObj.ufo[1].src = '../img/002-ufo-1.svg';
  imagesObj.ufo[2].src = '../img/004-ufo-2.svg';
  imagesObj.ufo[3].src = '../img/005-ufo-3.svg';
  imagesObj.venus.src = '../img/009-venus.svg';
}

function drawPlanet(){
  ctx.drawImage(imagesObj.venus, -350, canvas.height/2-planetSize/2, 550, 550);
}



/***************
  Local Storage
****************/

console.log(localStorage.getItem('TellingTheBool'));
if (localStorage.getItem('TellingTheBool') === 'true') {
  storyTellingBool = false;
  console.log(storyTellingBool);
} else {
  storyTellingBool = true;
  console.log(storyTellingBool);
  localStorage.setItem('TellingTheBool', true);
}