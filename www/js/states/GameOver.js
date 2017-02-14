var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '25pt MonstersAttack', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 125, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function () {
    game.add.sprite(0, 0, 'options-bg');
    var titleStyle = { font: 'bold 35pt MonstersAttack', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, 100, "Has perdido", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);
    this.addMenuOption('Jugar de nuevo', function (e) {
      this.game.state.start("Game");
    });
    this.addMenuOption('Salir', function (e) {
      this.game.state.start("GameMenu");
    });
    game.time.events.add(Phaser.Timer.SECOND * 2,function(){gameOptions.playMusic? music.play() : false;}, this);
    //gameOptions.playMusic? music.play() : false;
  }
};