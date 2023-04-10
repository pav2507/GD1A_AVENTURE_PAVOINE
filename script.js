// Initialisation de la scène Phaser 3
var config = {
	type: Phaser.AUTO,
	width: 768,
	height: 432,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0},
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	},
    pixelArt: true
};

var game = new Phaser.Game(config);
var player;
var ennemi;
var collec_bullet= true;
var barreDeVie;
var mechant1 = true;
var key = {};

const SPEED = 160;

function collec_bulletHandler(mechant1, collec_bullet) {
	collec_bullet.destroy();
	mechant1.x = Phaser.Math.Between(100, 700);
	mechant1.y = Phaser.Math.Between(100, 500);
	collec_bullet.x = Phaser.Math.Between(100, 700);
	collec_bullet.y = Phaser.Math.Between(100, 500);
	updateScore(); // ajoute des points au score
}

function collec_bulletHandler(mechant1, collec_bullet) {
	collec_bullet.destroy();
	mechant1.x = Phaser.Math.Between(100, 700);
	mechant1.y = Phaser.Math.Between(100, 500);
	collec_bullet.x = Phaser.Math.Between(100, 700);
	collec_bullet.y = Phaser.Math.Between(100, 500);
	updateScore(); // ajoute des points au score
}
  
function collisionHandler(player, mechant1) {
	// Code pour gérer la collision entre le joueur et l'ennemi
	
	// Arrête l'animation de l'ennemi et le tue
	mechant1.setFrame(4); // animation de mort
	mechant1.anims.stop();
	mechant1.disableBody(true, true);
	
	// Active le collec_bullet après la mort de l'ennemi
	this.piece.enableBody(true, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), true, true);
	this.piece.setPosition(1500, 2000);
  
  
}

// Chargement des ressources
function preload() {
	this.load.spritesheet('character1', 'assets/player1.png', { frameWidth: 32, frameHeight: 48 });//spritesheet personnage principale
	this.load.spritesheet('character2', 'assets/player2.png', { frameWidth: 32, frameHeight: 48 });//spritesheet personnage principale
	this.load.spritesheet('character3', 'assets/player3.png', { frameWidth: 32, frameHeight: 48 });//spritesheet personnage principale
	this.load.spritesheet('character4', 'assets/player4.png', { frameWidth: 32, frameHeight: 48 });//spritesheet personnage principale
	this.load.image('background', 'assets/tiles2.png');//background
	this.load.image("tileset","assets/rtuc.png");//collision
	this.load.tilemapTiledJSON('map',"assets/MonNiveau.json"); // map
	this.load.image ('mechant1','assets/spritesheet_mechant1.png')//spritesheet dumechant1
	this.load.image ('mechant2','assets/spritesheet_mechant2.png')//spritesheet du mechant2
	this.load.image ('mechant3','assets/spritesheet_mechant3.png')//spritesheet du mecahnt3
	this.load.image ('sherif','assets/spritesheet_sherif.png')//spritesheet du sherif
	this.load.image ('marchand','assets/spritesheet_marchand.png')//spritesheet du marchand
	this.load.image ('barman','assets/spritesheet_barman.png')//spritesheet du barman
	this.load.image ('UIlife','assets/UI_life_1.png')// ui de vie qui doit etre posee sur UI_base
	this.load.image ('UIbullet','assets/UI_bullet.png')// ui balle qui doit etre posee sur UI_base
	this.load.image ('UIbase','assets/UI_base.png')// ui de base 
	this.load.image ('interraction_sherif','assets/interraction_sherif.png')// panneau de dialogue 
	this.load.image ('interraction_marchand','assets/interraction_marchand.png')// panneau de dialogue 
	this.load.image ('interraction_barman','assets/interraction_barman.png')// panneau de dialogue 
	this.load.image ('interraction_mechant1','assets/interraction_mechant1.png')// panneau de dialogue mechant
	this.load.image ('interraction_mechant2','assets/interraction_mechant2.png')// panneau de dialogue mechant
	this.load.image ('interraction_mechant3','assets/interraction_mechant3.png')// panneau de dialogue mechant
	this.load.audio ('musique_theme', 'assets/western_music.mp3')// musique non libre de droit, trouvée sur youtube (https://www.youtube.com/watch?v=JBkRe_m21Z0)
	this.load.image ('collec_bullet','assets/bullet.png')
} 

// Création des éléments de jeu
function create() {

	this.add.image(2232, 1296, "background");

	this.add.image(1500,2000, "mechant1").setInteractive().on("pointerdown",()=>{ // apparition mechant + cliquable pour faire apparaitre panneau de dialogue
		this.interractionmechant1=this.add.image(1500,2000,"interraction_mechant1").setInteractive().on("pointerdown",()=>{
			this.interractionmechant1.destroy()
		})
	})
	this.add.image(2600,1600, "mechant2").setInteractive().on("pointerdown",()=>{// apparition mechant + cliquable pour faire apparaitre panneau de dialogue
		this.interractionmechant2=this.add.image(2600,1600,"interraction_mechant2").setInteractive().on("pointerdown",()=>{
			this.interractionmechant2.destroy()
		})
	})
	this.add.image(3200,2300, "mechant3").setInteractive().on("pointerdown",()=>{// apparition mechant + cliquable pour faire apparaitre panneau de dialogue
		this.interractionmechant3=this.add.image(3200,2300,"interraction_mechant3").setInteractive().on("pointerdown",()=>{
			this.interractionmechant3.destroy()
		})
	})
	this.add.image(3250,2250, "mechant1").setInteractive().on("pointerdown",()=>{// apparition mechant + cliquable pour faire apparaitre panneau de dialogue
		this.interractionmechant1b=this.add.image(3250,2250,"interraction_mechant1").setInteractive().on("pointerdown",()=>{
			this.interractionmechant1b.destroy()
		})
	})
	this.add.image(3250,2350, "mechant2").setInteractive().on("pointerdown",()=>{// apparition mechant + cliquable pour faire apparaitre panneau de dialogue
		this.interractionmechant2b=this.add.image(3250,2350,"interraction_mechant2").setInteractive().on("pointerdown",()=>{
			this.interractionmechant2b.destroy()
		})
	})
	this.add.image(1350,500, "sherif").setInteractive().on("pointerdown",()=>{// apparition sherif + cliquable pour faire apparaitre panneau de dialogue
		this.interractionsherif=this.add.image(1350,500,"interraction_sherif").setInteractive().on("pointerdown",()=>{
			this.interractionsherif.destroy()
		})
	})
	this.add.image(2000,190, "marchand").setInteractive().on("pointerdown",()=>{// apparition marchand + cliquable pour faire apparaitre panneau de dialogue
		this.interractionmarchand=this.add.image(2000,190,"interraction_marchand").setInteractive().on("pointerdown",()=>{
			this.interractionmarchand.destroy()
		})	
	})
	this.add.image(2400,600, "barman").setInteractive().on("pointerdown",()=>{// apparition barman + cliquable pour faire apparaitre panneau de dialogue
		this.interractionbarman=this.add.image(2400,600,"interraction_barman").setInteractive().on("pointerdown",()=>{
			this.interractionbarman.destroy()
		})
	})
	
	// faire apparraitre les ui, qui bougeront au meme rythme que le personnage principal
	this.add.image(0,332, "UIbase").setOrigin(0,0).setScrollFactor(0);// ui de base
	this.add.image(570,355, "UIbullet").setOrigin(0,0).setScrollFactor(0);// ui de balle 
	this.add.image(670,355, "UIbullet").setOrigin(0,0).setScrollFactor(0);// ui de balle 
	this.add.image(620,355, "UIbullet").setOrigin(0,0).setScrollFactor(0);// ui de balle 
	this.add.image(300,355, "UIlife").setOrigin(0,0).setScrollFactor(0);// ui de vie 

	var music = this.sound.add("musique_theme"); // ajout d'une musique d'ambiance (https://www.youtube.com/watch?v=JBkRe_m21Z0)
	music.play();

	//ajout de la map
	const map = this.add.tilemap("map");// ajout map 
	const tiles = map.addTilesetImage("rtuc", "tileset");// ajout collision

	const layer = map.createLayer("Calque de Tuiles 1", tiles);

	// Ajout du personnage
	this.player = this.physics.add.sprite(350, 1400, 'character1');// endroit d'apparition du personnage principal

	// Collision avec le monde
	layer.setCollisionByProperty({estSolide: true});// collision
	this.physics.add.collider(this.player, layer);// collision

	// Ajout des animations du personnage principal
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('character2', { start: 0, end: 2 }),
		frameRate: 10,
		repeat: -1

	});
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('character3', { start: 0, end: 2}),
		frameRate: 10,
		repeat: -1
	});
	this.anims.create({
		key: 'up',
		frames: this.anims.generateFrameNumbers('character4', { start: 0, end: 2}),
		frameRate: 10,
		repeat: -1
	});
	this.anims.create({
		key: 'down',
		frames: this.anims.generateFrameNumbers('character1', { start: 0, end: 2}),
		frameRate: 10,
		repeat: -1
	});

	// Configuration des touches directionnelles pour le mouvement du personnage
	this.cursors = this.input.keyboard.createCursorKeys();

	// configuration de la camera pour qu'elle suive le personnage 
    this.physics.world.setBounds(0, 0, 4464, 2592);
    this.cameras.main.setBounds(0, 0, 4464, 2592);
    this.cameras.main.startFollow(this.player);
	this.cameras.main.setZoom(1)



	this.mechant1 = this.physics.add.sprite(1500, 2000, 'mechant1');
    this.mechant1.setScale(1); // changer l'échelle de l'ennemi
    this.mechant1.setCollideWorldBounds(true); // s'assurer que l'ennemi reste dans la zone de jeu
    this.anims.create({
        frames: this.anims.generateFrameNumbers('mechant1', { start: 0, end: 7 }),
        frameRate: 4,
        repeat: -1
    });
    
	 // Ajouter le collectible
	this.piece = this.physics.add.sprite(0, 0, 'collec_bullet');
	this.piece.disableBody(true, true);

	this.physics.add.collider(this.player, this.mechant1, collisionHandler, null, this);

    

}

// Mise à jour de la scène
function update() {

	//console.log(this.player.x, this.player.y	)
	// Réinitialisation de la vitesse du personnage
	this.player.setVelocity(0);

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-SPEED);
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(SPEED);
        this.player.anims.play('right', true);
    }
    if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-SPEED);
        this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
 	    this.player.setVelocityY(SPEED);
        this.player.anims.play('down', true);
    }
    this.player.body.velocity.normalize().scale(SPEED);
	
	
}
