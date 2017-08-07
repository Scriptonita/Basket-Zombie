var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: game.world.centerY - 120,
    startX: "center"
  },

  init: function () {
    switch(lng) {
      case "es":
        idioma = {
          conMusica: "Con Música",
          sinMusica: "Sin Música",
          conSonido: "Con Sonido",
          sinSonido: "Sin Sonido",
          volver: "<- Volver"
        };
        break;
      case "en":
        idioma = {
          conMusica: "With Music",
          sinMusica: "Without Music",
          conSonido: "With Sounds",
          sinSonido: "Without Sounds",
          volver: "<- Back"
        };
        break;
      default:
        idioma = {
          conMusica: "With Music",
          sinMusica: "Without Music",
          conSonido: "With Sounds",
          sinSonido: "Without Sounds",
          volver: "<- Back"
        };
        break;
    }
    this.titleText = game.make.text(game.world.centerX, 60, "Basket Zombie", {
      font: 'bold 50pt MonstersAttack',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(10, 10, 'rgba(50,150,150,0.5)', 10);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  create: function () {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;
    var fondo = game.add.sprite(0, 0, 'options-bg');
    fondo.width = document.documentElement.clientWidth;
    fondo.height = document.documentElement.clientHeight;
    game.add.existing(this.titleText);
    this.addMenuOption(playMusic ? idioma.conMusica : idioma.sinMusica, function (target) {
      boton.play();
      playMusic = !playMusic;
      target.text = playMusic ? idioma.conMusica : idioma.sinMusica;
      //musicPlayer.volume = playMusic ? 1 : 0;
      playMusic? music.play() : music.stop();
      gameOptions.playMusic = playMusic;
    });
    this.addMenuOption(playSound ? idioma.conSonido : idioma.sinSonido, function (target) {
      boton.play();
      playSound = !playSound;
      target.text = playSound ? idioma.conSonido : idioma.sinSonido;
      //console.log("PlaySound = " + playSound);
      gameOptions.playSound = playSound;
    });
    this.addMenuOption(idioma.volver, function () {
      boton.play();
      game.state.start("GameMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
