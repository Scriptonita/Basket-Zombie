// Global Variables
var
  //alto  = document.documentElement.clientHeight,
  //ancho = document.documentElement.clientWidth,
  //game = new Phaser.Game(document.documentElement.clientWidth, document.documentElement.clientHeight, Phaser.AUTO, 'game'),
  game = null,
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer,
  nivel = 1,
  conectado = false,
  lng = "en",
  idioma = {};

Main.prototype = {

  preload: function () {
    window.plugins.insomnia.keepAwake();
    //game.load.image('stars',    'assets/images/stars.jpg');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'js/states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

function iniciar() {
  //game.width = document.documentElement.clientWidth;
  //game.height = document.documentElement.clientHeight;
  screen.orientation.lock('landscape-primary');
  game = new Phaser.Game(document.documentElement.clientWidth, document.documentElement.clientHeight, Phaser.AUTO, 'game');
  //game.world.width = document.documentElement.clientWidth;
  //game.world.height = document.documentElement.clientHeight;
  //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  var networkState = navigator.connection.type;
  if (networkState !== Connection.NONE) {
      conectado = true;
  }

  var languaje = navigator.language || navigator.userLanguage;
  lng = languaje.substring(0, 2);
  if (["es", "en"].includes(lng) === false) {
    lng = "en";
  }

var idioma;
  game.state.add('Main', Main);
  game.state.start('Main');
}

function pausa() {
  music.stop();
  audioAmb.stop();
}

function enLinea() {
  conectado = true;
}

function sinLinea() {
  conectado = false;
}


document.addEventListener('deviceready', iniciar, false);
document.addEventListener("pause", pausa, false);
document.addEventListener("offline", sinLinea, false);
document.addEventListener("online", enLinea, false);
//document.addEventListener("resume", obtenerRetosDiarios, false);
