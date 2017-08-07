var GameContinue = function(game) {};

GameContinue.prototype = {

  menuConfig: {
    startY: game.world.centerY - 120,
    startX: "center"
  },

  preload: function () {
    this.optionCount = 1;
    game.load.image('pelota', 'assets/images/bola-gafas.png');
    maxNivel = parseInt(localStorage.getItem("maxNivel"));
    if (maxNivel < nivel) {
      //maxNivel.set(nivel);
      localStorage.setItem("maxNivel", nivel);
    }
  },

  create: function () {
    switch(lng) {
      case "es":
        idioma = {
          nivel: "Ir a Nivel " + nivel,
          salir: "Salir"
        };
        break;
      case "en":
        idioma = {
          nivel: "Play Level " + nivel,
          salir: "Exit"
        };
        break;
      default:
        idioma = {
          nivel: "Play Level " + nivel,
          salir: "Exit"
        }
    }
    var fondo = game.add.sprite(0, 0, 'options-bg');
    fondo.width = document.documentElement.clientWidth;
    fondo.height = document.documentElement.clientHeight;
    var titleStyle = { font: 'bold 35pt MonstersAttack', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, 60, "Has ganado", titleStyle);
    text.setShadow(10, 10, 'rgba(50,150,150,0.5)', 10);
    text.anchor.set(0.5);
    var pelota = game.add.image(game.world.centerX - game.world.centerX / 3, game.world.centerY + game.world.centerY / 3, "pelota");
    pelota.width = game.world.centerX;
    pelota.height = game.world.centerY ;
    pelota.anchor.set(0.5);
    this.addMenuOption(idioma.nivel, function (e) {
      boton.play();
      this.game.state.start("Game");
    }, "textMenu");
    this.addMenuOption(idioma.salir, function (e) {
      boton.play();
      this.game.state.start("GameMenu");
    }, "textMenu");
    game.time.events.add(Phaser.Timer.SECOND * 2,function(){gameOptions.playMusic? music.play() : false;}, this);
    //gameOptions.playMusic? music.play() : false;
  }
};

Phaser.Utils.mixinPrototype(GameContinue.prototype, mixins);
