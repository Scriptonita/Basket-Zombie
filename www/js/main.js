// Global Variables
var
  alto  = document.documentElement.clientHeight,
  ancho = document.documentElement.clientWidth,
  game = new Phaser.Game(ancho, alto, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer,
  nivel = 1;

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

game.state.add('Main', Main);
game.state.start('Main');
