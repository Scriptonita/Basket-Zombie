var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: game.world.centerY - 120,
    startX: "center"
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 50, "Basket Zombie", {
      font: 'bold 50pt MonstersAttack',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  create: function () {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);
    this.addMenuOption(playMusic ? 'Con Música' : 'Sin Música', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Con Música' : 'Sin Música';
      //musicPlayer.volume = playMusic ? 1 : 0;
      playMusic? music.play() : music.stop();
      gameOptions.playMusic = playMusic;
    });
    this.addMenuOption(playSound ? 'Con Sonidos' : 'Sin Sonidos', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Con Sonidos' : 'Sin Sonidos';
      console.log("PlaySound = " + playSound);
      gameOptions.playSound = playSound;
    });
    this.addMenuOption('<- Volver', function () {
      game.state.start("GameMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
