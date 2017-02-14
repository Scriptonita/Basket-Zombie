var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: game.world.centerY - 120,
    startX: "center"
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 60, "Basket Zombie", {
      font: 'bold 50pt MonstersAttack',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {

    if (music.name !== "dangerous" && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Jugar', function () {
      game.state.start("Game");
    });
    this.addMenuOption('Opciones', function () {
      game.state.start("Options");
    });
    this.addMenuOption('Créditos', function () {
      game.state.start("Credits");
    });
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
