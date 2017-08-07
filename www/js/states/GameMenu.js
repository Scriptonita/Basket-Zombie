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
    this.titleText.setShadow(10, 10, 'rgba(50,150,150,0.5)', 10);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
    subiendo = true;
    cont = 0;
    contadorArriba = 0;
    tope = game.world.centerY / 15;

    switch(lng) {
      case "es":
        idioma = {
          jugar: "Jugar",
          opciones: "Opciones",
          creditos: "Créditos",
          empezar: "Empezar de nuevo",
          continuar: "Continuar nivel "
        };
        break;
      case "en":
        idioma = {
          jugar: "Play",
          opciones: "Options",
          creditos: "Credits",
          empezar: "Start again",
          continuar: "Continue level "
        };
        break;
      default:
        idioma = {
          jugar: "Play",
          opciones: "Options",
          creditos: "Credits",
          empezar: "Start Again",
          continuar: "Continue level "
        }
    }
  },

  preload: function () {
    game.load.spritesheet('pelota', 'assets/bolasSprite.png', 40, 40);
    game.load.spritesheet('zombie', 'assets/zombiesPiratas.png', 33, 44);
    game.load.spritesheet('capitan', 'assets/zombieCapitan.png', 31, 50);
  },

  create: function () {

    if (music.name !== "dangerous" && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    var fondo = game.add.image(0, 0, 'options-bg');
    fondo.width = document.documentElement.clientWidth;
    fondo.height = document.documentElement.clientHeight;
    game.add.existing(this.titleText);
    var cancha = game.add.image(game.world.centerX - game.world.centerX / 1.1, game.world.centerY - (game.world.centerY / 3), "cancha-menu");
    cancha.width = game.world.centerX;
    cancha.height = game.world.centerY;
    var capitan = game.add.sprite(game.world.centerX - game.world.centerX / 2, (game.world.centerY), 'capitan');
    capitan.scale.setTo(document.documentElement.clientWidth/1000 * 1.5, document.documentElement.clientHeight/1000 * 1.5);
    var zombie1 = game.add.sprite((game.world.centerX - game.world.centerX / 2) - game.world.centerX / 4, (game.world.centerY) + game.world.centerY / 5, 'zombie');
    var zombie2 = game.add.sprite((game.world.centerX - game.world.centerX / 2) + game.world.centerX / 4, (game.world.centerY) + game.world.centerY / 3, 'zombie');
    zombie1.scale.setTo(document.documentElement.clientWidth/1000 * 1.5, document.documentElement.clientHeight/1000 * 1.5);
    zombie2.scale.setTo(document.documentElement.clientWidth/1000 * 1.5, document.documentElement.clientHeight/1000 * 1.5);
    bola = game.add.sprite((game.world.centerX - game.world.centerX / 2) + 20, (game.world.centerY) + game.world.centerY / 3, 'pelota');
    game.physics.arcade.enable(bola);
    bola.animations.add("left", [0, 1, 2, 3, 4,], 10, true);
    bola.animations.add("right", [4, 3, 2, 1, 0], 10, true);
    bola.animations.add("up", [5, 6, 7, 8, 9], 10, true);
    bola.animations.add("down", [9, 8, 7, 6, 5], 10, true);
    bola.isCircle = true;
    bola.scale.setTo(document.documentElement.clientWidth/1000 * 1.5, document.documentElement.clientHeight/1000 * 1.5);
    this.addMenuOption(idioma.jugar, function () {
      boton.play();
      if (localStorage.getItem("tutorial")) {
        maxNivel = parseInt(localStorage.getItem("maxNivel"));
        if (maxNivel > 1) {
          //alert("Existe otro nivel: " + maxNivel);
          cancha.destroy();
          capitan.destroy();
          zombie1.destroy();
          zombie2.destroy();
          bola.destroy();
          jugarNivel1 = game.add.text(game.world.centerX - game.world.centerX / 2, game.world.centerY, idioma.empezar, style.navitem["textJuego"]);        //titleTexto.setShadow(10, 10, 'rgba(50,150,150,0.5)', 10);
          jugarNivel1.anchor.set(0.5);
          jugarNivel1.font = "FontdinerSwanky";
          jugarNivel1.inputEnabled = true;
          jugarNivel1.events.onInputUp.add(function(){
            boton.play();
            nivel = 1;
            game.state.start("Game");
          });
          jugarMaxNivel = game.add.text(game.world.centerX - game.world.centerX / 2, game.world.centerY + 100, idioma.continuar + maxNivel, style.navitem["textJuego"]);        //titleTexto.setShadow(10, 10, 'rgba(50,150,150,0.5)', 10);
          jugarMaxNivel.anchor.set(0.5);
          jugarMaxNivel.font = "FontdinerSwanky";
          jugarMaxNivel.inputEnabled = true;
          jugarMaxNivel.events.onInputUp.add(function(){
            boton.play();
            nivel = maxNivel;
            game.state.start("Game");
          });
        } else {
          game.state.start("Game");
        }
      } else {
        localStorage.setItem("maxNivel", 1);
        game.state.start("Tutorial");
      }
    }, "textMenu");
    this.addMenuOption(idioma.opciones, function () {
      boton.play();
      game.state.start("Options");
    }, "textMenu");
    this.addMenuOption(idioma.creditos, function () {
      boton.play();
      game.state.start("Credits");
    }, "textMenu");
  },

  update: function () {
    //bola.play("down");
    if (cont < tope) {
      if (subiendo) {
        bola.y = bola.y - 1;
      } else {
        bola.y = bola.y + 1;
      }
      cont++;
    } else {
      if (subiendo && contadorArriba < 8) {
        contadorArriba++;
      } else {
        contadorArriba = 0;
        cont = 0;
        subiendo = !subiendo;
      }
    }
  }

};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
