var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;
    switch(lng) {
      case "es":
        idioma = {
          volver: "<- Volver"
        };
        break;
      case "en":
        idioma = {
          volver: "<- Back"
        };
        break;
      default:
        idioma = {
          volver: "<- Back"
        }
    }
  },

  addCredit: function(task, author) {
    var authorStyle = { font: '40pt MonstersAttack', fill: 'black', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var taskStyle = { font: '30pt MonstersAttack', fill: 'black', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var authorText = game.add.text(game.world.centerX, alto + 200, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, alto + 250, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5500);
    game.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5500);
    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = {
      font: '20pt',
      align: 'left',
      fill: 'yellow',
      stroke: 'red',
      fontWeight: "bold",
      strokeThickness: 15
    };

    var txt = game.add.text(10, alto - 50, text, optionStyle);

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
    //txt.events.onInputOver.add(onOver, this);
    //txt.events.onInputOut.add(onOut, this);
    txt.font = "FontdinerSwanky";
    this.optionCount ++;
  },

  create: function () {
    this.stage.disableVisibilityChange = true;
    var bg = game.add.sprite(0, 0, 'options-bg');
    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    bg.width = document.documentElement.clientWidth;
    bg.height = document.documentElement.clientHeight;
    var recursosGraficos = "Graficos:\n openclipart.org \n freepik.es \n clipartpanda.com";
    var recursosSonido = "Sonidos:\n freesound.org \n incompetech.com";
    var recursosFuentes = "Fuentes:\n 1001freefonts.com";
    var plantilla = "Plantilla Phaser:\n github.com/MattMcFarland/\nphaser-menu-system";
    this.addCredit('Scriptonita', 'Javi Herrera');
    this.addCredit('Phaser.io & \n Phonegap Cordova', 'Powered By');
    this.addCredit(recursosGraficos, '');
    this.addCredit(recursosSonido, '');
    this.addCredit(recursosFuentes, '');
    this.addCredit(plantilla, '');
    this.addMenuOption(idioma.volver, function (e) {
      boton.play();
      game.state.start("GameMenu");
    });
    game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 30000);
  }

};
