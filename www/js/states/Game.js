var Game = function(game) {};

Game.prototype={

    init: function () {
        console.log("Se inicia el juego.");
        DIAMETRO_BOLA = 40;
        dificultad = 0;
        velocidadX = 1;
        velocidadY = 1;
        puntuacionJugador = 0;
        puntuacionRival = 0;
        puntuacion = " Tu " + puntuacionJugador + " - " + puntuacionRival + " Piratas ";
        tiempo = 50;
        relojCSS = { fontSize: '30px', fill: '#757676', padding: '115px', marginRight: '16px' };

        alto  = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;

        canastaX = 0;
        //canastaY = 0;

        prevX = ancho - (ancho * 8/10);
        prevY = alto - (alto * 3/6) - (DIAMETRO_BOLA/2);

        console.log("Alto: " + alto + "  ... Ancho: " + ancho);
        music.stop();
    },

    preload: function () {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = '#ff7d0c';
      if (ancho <= 1024) {
        game.load.image('background', 'assets/suelo_1024.jpg');
      } else if (ancho <= 2048) {
        game.load.image('background', 'assets/suelo_2048.jpg');
      } else {
        game.load.image('background', 'assets/suelo.jpg');
      }
      console.log("Leido fondo");
      game.load.image('canastaJugador', 'assets/aroJugador.png');
      console.log("Leido canasta Jugador");
      game.load.image('canastaZombies', 'assets/aroRival.png');
      console.log("Leido canasta Zombies");
      game.load.spritesheet('bola', 'assets/bolasSprite.png', 40, 40);
      console.log("Leido sprite Bola");
      game.load.spritesheet('zombie', 'assets/zombiesPiratas.png', 33, 44);
      console.log("Leido Sprite Zombie");
      game.load.spritesheet('capitan', 'assets/zombieCapitan.png', 31, 50);
      console.log("Leido Sprite Capitan");

      console.log("Leido Objetivo");
      console.log("Nivel: " + nivel);
      console.log ("Funcion preload OK.");

      game.load.audio('pito', 'assets/bgm/pito.mp3');
      game.load.audio('bocina', 'assets/bgm/bocina.mp3');
      game.load.audio('jugando', 'assets/bgm/jugando.mp3');

    },

    create: function() {

      console.log("Inicia funcion create");
      var fondo = game.add.sprite(0, 0, 'background');
      fondo.width = ancho;
      fondo.height = alto;
      //fondo.anchor.setTo(0.5, 0.5);
      console.log ("Fondo creado OK");

      //Marcador
      //scoreText = game.add.text(16, 16, puntuacion, { fontSize: '20px', fill: '#757676', backgroundColor: 'white', padding: '115px', marginRight: '16px' });
      scoreText = game.add.text(16, 16, puntuacion, { fontSize: '20px', fill: '#757676', backgroundColor: 'white', padding: '115px', marginRight: '16px', borderStyle: 'solid', borderWidth: '2px'});

      console.log("Puntuacion creada");
      //reloj = game.add.text(ancho-50, 16, tiempo, {fontSize: '20px', fill: '#757676', backgroundColor: 'white', padding: '115px' });
      reloj = game.add.text(ancho-50, 16, tiempo, relojCSS);
      console.log("Marcador colocado");

      //CanastaJugador
      canastaJugador = game.add.sprite(0, game.world.centerY, 'canastaJugador');
      canastaJugador.width= 55;
      canastaJugador.height =  55;
      //canastaJugador.x = 50 - (canastaJugador.width/2);
      canastaJugador.x = 0;
      canastaJugador.y = game.world.centerY - (canastaJugador.height / 2);
      canastaJugador.immovable = true;

      //CanastaRival
      canasta = game.add.sprite(ancho - canastaJugador.width, canastaJugador.y, 'canastaZombies');
      //canasta.enableBody = true;
      //game.physics.arcade.enable(canasta);
      canasta.width= 55;
      canasta.height =  55;
      //canasta.y = game.world.centerY - (canasta.height / 2);
      canasta.immovable = true;
      console.log("Canasta colocada");
      canastaX = canasta.x + (canasta.width / 2);
      //canastaY = game.world.centerY;

      //objetivo = game.add.text(canastaX,canastaY, "X", {fontSize = '30px'});

      //bola
      bola = game.add.sprite((ancho - (ancho * 9/10)), (game.world.centerY - (DIAMETRO_BOLA/2)), 'bola');
      bola.isCircle = true;
      game.physics.arcade.enable(bola);
      bola.body.collideWorldBounds = true;
      bola.body.onWorldBounds = new Phaser.Signal();
      bola.body.onWorldBounds.add(this.bajaVelocidad, this);
      bola.animations.add("left", [0, 1, 2, 3, 4,], 10, true);
      bola.animations.add("right", [4, 3, 2, 1, 0], 10, true);
      bola.animations.add("up", [5, 6, 7, 8, 9], 10, true);
      bola.animations.add("down", [9, 8, 7, 6, 5], 10, true);
      console.log("BolaSprite creada Ok");

      //Zombies
      zombies = game.add.group();
      zombies.enableBody = true;
      zombies.physicsBodyType = Phaser.Physics.ARCADE;
      posicionesInicio = [[ancho - (ancho * 2/10), (alto - (alto * 5/6))],
                          [ancho - (ancho * 2/10), (alto - (alto * 1/6))],
                          [ancho - (ancho * 4/10), (alto - (alto * 2/6))],
                          [ancho - (ancho * 4/10), (alto - (alto * 4/6))]];
      for (var x = 0; x < 4; x++) {
        var zombie = zombies.create(posicionesInicio[x][0], posicionesInicio[x][1], 'zombie');
        game.physics.arcade.enable(zombie);
        zombie.body.collideWorldBounds = true;
        zombie.animations.add("down", [0, 1, 2], 10, true);
        zombie.animations.add("left", [3, 4, 5], 10, true);
        zombie.animations.add("right", [6, 7, 8], 10, true);
        zombie.animations.add("up", [9, 10, 11], 10, true);
      }
      console.log("Zombies colocados");

      //Capitan
      capitan = game.add.sprite((ancho - (ancho * 2/10)), (alto - (alto * 3/6) - DIAMETRO_BOLA/2), 'capitan');
      game.physics.arcade.enable(capitan);
      capitan.body.collideWorldBounds = true;
      capitan.animations.add("down", [0, 1, 2], 10, true);
      capitan.animations.add("left", [3, 4, 5], 10, true);
      capitan.animations.add("right", [6, 7, 8], 10, true);
      capitan.animations.add("up", [9, 10, 11], 10, true);
      game.physics.arcade.enable(capitan);
      capitan.body.collideWorldBounds = true;
      console.log("Capitan creado ok");

      console.log("Funcion create OK");
      console.log ("Bola: ", bola);
      console.log ("Capitan: ", capitan);
      console.log ("Zombies: ", zombies);

      //audio ambiente
      audioAmb = game.add.audio('jugando');
      audioAmb.loop = true;


      //bocina
      bocina = game.add.audio('bocina');
      bocina.loop = false;

      //pito arbitro
      pito = game.add.audio('pito');
      pito.loop = false;

      //Tiempo
      game.time.events.add(Phaser.Timer.SECOND * 1, this.actualizaReloj, this);
      console.log("Reloj iniciado");

      //Sensores de movimiento
      watchID = navigator.accelerometer.watchAcceleration(this.registraDireccion, this.enError,{ frequency: 5 });
      console.log("Sensores iniciados");

      gameOptions.playSound? pito.play() : false;
      console.log("gameOptions.playSound = " + gameOptions.playSound);
      gameOptions.playSound? audioAmb.play() : false;
    },

    update: function(){

      var factorDificultad = (50 + (dificultad * 100));
      bola.body.velocity.y = (velocidadY * factorDificultad);
      bola.body.velocity.x = (velocidadX * factorDificultad);



      if (prevX > bola.x) {
        if (Math.abs(prevX - bola.x >= Math.abs(prevY - bola.y))) {
          bola.animations.play("left");
        } else if (prevY > bola.y) {
            bola.animations.play("up");
          } else {
            bola.animations.play("down");
        }
      } else if (prevX < bola.x) {
        bola.animations.play("right");
      } else {
        bola.animations.stop();
        bola.frame = 3;
      }

      prevX = bola.x;
      prevY = bola.y;

      for (var z = 0; z < 4; z++) {
        game.physics.arcade.accelerateToObject(zombies.children[z], bola, 70 * nivel, 70 * nivel, 70 * nivel);
        var bx = bola.x;
        var by = bola.y;
        var zx = zombies.children[z].x;
        var zy = zombies.children[z].y;
        if (Math.abs(bx - zx) >= Math.abs(by - zy)) {
          if (by > zy) {
            zombies.children[z].play("left");
          } else {
            zombies.children[z].play("right");
          }
        } else if (bx >= zx) {
          zombies.children[z].play("up");
        } else {
          zombies.children[z].play("down");
        }
      }

      game.physics.arcade.accelerateToObject(capitan, bola, 80 * nivel, 80 * nivel, 80 * nivel);
      var bx = bola.x;
      var by = bola.y;
      var cx = capitan.x;
      var cy = capitan.y;
      if (Math.abs(bx - zx) >= Math.abs(by - zy)) {
        if (by > cy) {
          capitan.play("down");
        } else {
          capitan.play("up");
        }
      } else if (bx >= cx) {
        capitan.play("right");
      } else {
        capitan.play("left");
      }

      if (((Math.abs((bola.x + (DIAMETRO_BOLA/2)) - canastaX)) < 5) && (Math.abs(((bola.y + (DIAMETRO_BOLA/2)) - game.world.centerY)) < 5)) {
        this.encestado();
      }

      game.physics.arcade.collide(bola, zombies, this.tocado, null, this);
      game.physics.arcade.collide(zombies, zombies, this.zombiesTocandose, null, this);
      game.physics.arcade.collide(bola, capitan, this.capitan, null, this);
      game.physics.arcade.collide(zombies, capitan, this.zombiesTocandose, null, this);
  },

  actualizaReloj: function() {
      tiempo--;
      reloj.text = tiempo;
      if (tiempo == 10) {
        reloj.fill = "red";
      }
      if (tiempo === 0) {
        console.log ("fin del tiempo");
        audioAmb.stop();
        gameOptions.playSound? bocina.play() : false;
        game.time.events.add(Phaser.Timer.SECOND * 1,function(){gameOptions.playMusic? music.play() : false;}, this);
        if (puntuacionJugador <= puntuacionRival) {
          //game.time.events.add(Phaser.Timer.SECOND * 0.5,irAGameOver, this);
          irAGameOver(this);
        } else {
          //game.time.events.add(Phaser.Timer.SECOND * 0.5,irAContinuar, this);
          nivel++;
          irAContinuar(this);
        }
      } else {
        game.time.events.add(Phaser.Timer.SECOND * 1, this.actualizaReloj, this);
      }
  },

  moverCapitan: function () {
    //console.log ("Capitan2: ", capitan);
    //gameB.physics.arcade.accelerateToObject(capitan, bola, 30, 30, 30);
  },

  tocado: function () {
    console.log ("Te ha tocado un zombie!!!");
    gameOptions.playSound? pito.play() : false;
    this.puntoRival();
  },

  capitan: function () {
    console.log ("Te ha tocado el Capitán!!!");
    gameOptions.playSound? pito.play() : false;
    this.puntoRival();
  },

  zombiesTocandose: function () {
    //console.log ("Los zombies se chocan entre ellos");
  },

  mostrarPunto: function(Player){
    var letra = 60;
    var med = letra / 2;
    var x;
    var y = game.world.centerY - med;
    if (typeof unPunto != "undefined") {
      unPunto.destroy();
    }
    switch(Player) {
      case "J":
        x = ancho * (1/4) - med;
        break;
      case "Z":
        x = ancho * (3/4) - med;
        break;
      default:
        console.log("Algo ha ido mal!!!");
        break;
    }
    unPunto = game.add.text(x, y, "+1", {fontSize: '60px'} );
    //unPunto.anchor.setTo = (0.5, 0.5);
    game.time.events.add(Phaser.Timer.SECOND * 1, function(){unPunto.destroy()}, this);
  },

  puntoRival: function(){
    this.paraAcelerometro(watchID);
    puntuacionRival = puntuacionRival + 1;
    puntuacion = " Tu " + puntuacionJugador + " - " + puntuacionRival + " Piratas ";
    scoreText.text = puntuacion;
    this.mostrarPunto("Z");
    this.reiniciaPosiciones();
    //gameB.stage.backgroundColor = '#ff0000';
    //gameB.time.events.add(Phaser.Timer.SECOND * 0.5, function(){gameB.stage.backgroundColor = '#f27d0c';}, this);
    //setTimeout(function(){gameB.stage.backgroundColor = '#f27d0c';}, 1000, this);
  },

  puntoJugador: function(){
    this.paraAcelerometro(watchID);
    puntuacionJugador = puntuacionJugador + 1;
    puntuacion = " Tu " + puntuacionJugador + " - " + puntuacionRival + " Piratas ";
    scoreText.text = puntuacion;
    this.mostrarPunto("J");
    this.reiniciaPosiciones();
    //gameB.stage.backgroundColor = '#ff0000';
    //gameB.time.events.add(Phaser.Timer.SECOND * 0.5, function(){gameB.stage.backgroundColor = '#f27d0c';}, this);
    //setTimeout(function(){gameB.stage.backgroundColor = '#f27d0c';}, 1000, this);
  },

  encestado: function() {
    console.log("Punto para ti!!!");
    gameOptions.playSound? pito.play() : false;
    this.puntoJugador();
  },

  bajaVelocidad: function() {
    console.log("Se ha tocado borde, baja la velocidad");
    bola.body.velocity.y = 0;
    bola.body.velocity.x = 0;
  },

  reiniciaPosiciones: function() {
    bola.x = ancho - (ancho * 9/10);
    bola.y = alto/2 - (DIAMETRO_BOLA/2);
    bola.body.velocity.y = 0;
    bola.body.velocity.x = 0;
    /*
    posicionesInicio = [[ancho - (ancho/5), (alto/6)],
                        [ancho - (ancho/5), (alto/2)],
                        [ancho - (ancho/2), (alto/6)],
                        [ancho - (ancho/2), (alto/3)]];*/
    capitan.x = ancho - (ancho * 2/10);
    capitan.y = alto - (alto * 3/6);
    for (var z = 0; z < 4; z++) {
      zombies.children[z].x = posicionesInicio[z][0];
      zombies.children[z].y = posicionesInicio[z][1];
    }
    prevX = ancho - (ancho * 8/10);
    prevY = alto - (alto * 3/6) - (DIAMETRO_BOLA/2);
    watchID = navigator.accelerometer.watchAcceleration(this.registraDireccion, this.enError,{ frequency: 5 });
  },

  incrementaPuntuacion: function(){
    puntuacion = puntuacion+1;
    scoreText.text = puntuacion;

    //zombie.body.x = this.inicioX();
    //zombie.body.y = this.inicioY();

    if (puntuacion > 0){
      dificultad = dificultad + 1;
    }
  },

  incrementaPuntuacion2: function(){
    puntuacion = puntuacion+10;
    scoreText.text = puntuacion;
    /*
    objetivo2.body.x = this.inicioX();
    objetivo2.body.y = this.inicioY();
*/
    if (puntuacion > 0){
      dificultad = dificultad + 1;
    }
  },

  inicioX: function(){
    return this.numeroAleatorioHasta(ancho - DIAMETRO_BOLA );
  },

  inicioY: function(){
    return this.numeroAleatorioHasta(alto - DIAMETRO_BOLA );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){

    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      //this.detectaAgitacion(datosAceleracion);
      this.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 5 });
  },
  /*
  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;

    if (agitacionX || agitacionY){
      setTimeout(this.recomienza, 1000);
    }
  },*/

  recomienza: function(){
    document.location.reload(true);
  },

  enError: function(){
    console.log('onError!');
  },

  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.y ;
    velocidadY = datosAceleracion.x ;
  },

  paraAcelerometro: function(watchID) {
    navigator.accelerometer.clearWatch(watchID);
  }

};

function irAGameOver() {
  game.state.start("GameOver");
};

function irAContinuar() {
  game.state.start("GameContinue");
};
