var GameOver = function(game) {};

GameOver.prototype = {

  menuConfig: {
    startY: game.world.centerY - 120,
    startX: "center"
  },

  preload: function () {
    switch(lng) {
      case "es":
        idioma = {
          reintentar: "Jugar de nuevo",
          video: "( ver video )",
          salir: "Salir"
        };
        break;
      case "en":
        idioma = {
          reintentar: "Play again",
          video: "( watch video )",
          salir: "Exit"
        };
        break;
      default:
        idioma = {
          reintentar: "Play again",
          video: "( watch video )",
          salir: "Exit"
        }
    }
    this.optionCount = 1;
    game.load.image('pelota', 'assets/images/bola-gafas-llorando.png');
    document.addEventListener(admob.events.onAdClosed, function() {
      game.state.start("Game");
    });

    if( /(android)/i.test(navigator.userAgent) ) {
      admobid = { // for Android
        pubId: 'ca-app-pub-XXX~XXX',
        interstitial: 'ca-app-pub-XXX/XXX'
      };
    } else {
      admobid = { // for iOS
        pubId: 'ca-app-pub-XXX~XXX',
        interstitial: 'ca-app-pub-XXX/XXX'
      };
    }
    admob.requestInterstitialAd({
      publisherId: admobid.pubId,
      interstitialAdId:  admobid.interstitial,
      autoShowInterstitial: false
    });
  },

  addMenu: function(text, callback, className, ySum) {
    className || (className = this.menuConfig.className || 'default');
    var x = this.menuConfig.startX === "center" ?
      game.world.centerX + game.world.centerX / 2:
      this.menuConfig.startX;
    var y = this.menuConfig.startY;
    var txt = game.add.text(
      x,
      (this.optionCount * 70) + y + ySum,
      text,
      style.navitem[className]
    );
    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.font = "FontdinerSwanky";
    this.optionCount ++;
  },

  create: function () {
    var fondo = game.add.sprite(0, 0, 'options-bg');
    fondo.width = document.documentElement.clientWidth;
    fondo.height = document.documentElement.clientHeight;
    var titleStyle = { font: 'bold 35pt MonstersAttack', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, 60, "Has perdido", titleStyle);
    text.setShadow(10, 10, 'rgba(50,150,150,0.5)', 10);
    text.anchor.set(0.5);
    var pelota = game.add.image(game.world.centerX - game.world.centerX / 3, game.world.centerY + game.world.centerY / 3, "pelota");
    pelota.width = game.world.centerX;
    pelota.height = game.world.centerY ;
    pelota.anchor.set(0.5);
    this.addMenuOption(idioma.reintentar, function (e) {
      //var publisherId = (/(android)/i.test(navigator.userAgent)) ? "ca-app-pub-1275195378669643~4814429710" : "ca-app-pub-1275195378669643~7809980915":
      //var adId = (/(android)/i.test(navigator.userAgent)) ? "ca-app-pub-1275195378669643/5442961580" : "ca-app-pub-1275195378669643/1475796418";
      boton.play();
      music.stop();
      if (conectado) {
        admob.showInterstitialAd(function(){
          //console.log("Ads cargado ok");
        }, function(){
          //console.log("Error al cargar ads");
          this.game.state.start("Game");
        });
      } else {
        //console.log("No hay conexión a internet");
        this.game.state.start("Game");
      }

    }, "textMenu");
    this.addMenu(idioma.video, function (e){
      boton.play();
      music.stop();
      if (conectado) {
        admob.showInterstitialAd(function(){
          //console.log("Ads cargado ok");
        }, function(){
          //console.log("Error al cargar ads");
          this.game.state.start("Game");
        });
      } else {
        //console.log("No hay conexión a internet");
        this.game.state.start("Game");
      }
    }, "video", 0);
    //this.addMenuOption('( ver Video )', function (e) {}, "video");
    this.addMenu(idioma.salir, function (e) {
      boton.play();
      this.game.state.start("GameMenu");
    }, "textMenu", 10);
    game.time.events.add(Phaser.Timer.SECOND * 2,function(){gameOptions.playMusic? music.play() : false;}, this);
    //gameOptions.playMusic? music.play() : false;
  }
};

Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
