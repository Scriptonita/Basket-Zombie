var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','js/states/GameMenu.js');
    game.load.script('game', 'js/states/Game.js');
    game.load.script('gameover','js/states/GameOver.js');
    game.load.script('gamecontinue','js/states/GameContinue.js');
    game.load.script('credits', 'js/states/Credits.js');
    game.load.script('options', 'js/states/Options.js');
    game.load.script('tutorial', 'js/states/Tutorial.js');
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/musica_fondo.mp3');
    game.load.audio('boton', 'assets/bgm/boton.mp3');
    //game.load.audio('exit', 'assets/bgm/musica_fondo.mp3');

  },
  // varios freebies found from google image search
  loadImages: function () {
    //game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('cancha-menu', 'assets/images/cancha-menu.png');
    //game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['MonstersAttack', 'FontdinerSwanky'],
        urls: ['assets/style/MonstersAttack.css', 'assets/style/FontdinerSwanky.css']
      }
    }
  },

  init: function () {
    switch(lng) {
      case "es":
        idioma = {
          cargando: "Cargando...",
          listo: "Listo"
        };
        break;
      case "en":
        idioma = {
          cargando: "Loading...",
          listo: "Ready"
        };
        break;
      default:
        idioma = {
          cargando: "Loading...",
          listo: "Ready"
        }
    };

    this.loadingBar = game.make.sprite(game.world.centerX - (387/2), game.world.centerY, "loading");
    this.logo       = game.make.sprite(game.world.centerX, game.world.centerY - 50, 'brand');
    this.status     = game.make.text(game.world.centerX, game.world.centerY + 50, idioma.cargando, {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
    //document.addEventListener("pause", onPause, false);
    //document.addEventListener("resume", onResume, false)
  },

  preload: function () {
    //game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("GameContinue",GameContinue);
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
    game.state.add("Tutorial",Tutorial);
  },

  addGameMusic: function () {    
    boton = game.add.audio('boton');
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function() {
    this.status.setText(idioma.listo);
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1500);
  }
};

function onPause() {
  music.stop();
}

function onResume() {
  gameOptions.playMusic? music.play() : false;
}
