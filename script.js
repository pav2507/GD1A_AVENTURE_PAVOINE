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


const SPEED = 160;

// Chargement des ressources
function preload() {
	this.load.spritesheet('character1', 'assets/player1.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('character2', 'assets/player2.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('character3', 'assets/player3.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('character4', 'assets/player4.png', { frameWidth: 32, frameHeight: 48 });
	this.load.image('background', 'assets/tiles2.png');
	this.load.image("tileset","assets/rtuc.png");
	this.load.tilemapTiledJSON('map',"assets/MonNiveau.json");
	this.load.image ('mechant1','assets/spritesheet_mechant1.png')
	this.load.image ('mechant2','assets/spritesheet_mechant2.png')
	this.load.image ('mechant3','assets/spritesheet_mechant3.png')
	this.load.image ('sherif','assets/spritesheet_sherif.png')
	this.load.image ('marchand','assets/spritesheet_marchand.png')
	this.load.image ('barman','assets/spritesheet_barman.png')
	this.load.image ('UIlife','assets/UI_life_1.png')
	this.load.image ('UIbullet','assets/UI_bullet.png')
	this.load.image ('UIbase','assets/UI_base.png')
	this.load.image ('interraction_sherif','assets/interraction_sherif.png')
	this.load.image ('interraction_marchand','assets/interraction_marchand.png')
	this.load.image ('interraction_barman','assets/interraction_barman.png')
	this.load.image ('interraction_random1','assets/interraction_barman.png')
	this.load.image ('interraction_random2','assets/interraction_barman.png')
} 

// Création des éléments de jeu
function create() {

	this.add.image(2232, 1296, "background");

	this.add.image(1500,2000, "mechant1")
	this.add.image(2600,1600, "mechant2")
	this.add.image(3200,2300, "mechant3")
	this.add.image(3250,2250, "mechant1")
	this.add.image(3250,2350, "mechant2")
	this.add.image(1350,500, "sherif").setInteractive().on("pointerdown",()=>{
		this.add.image(1350,500,"interraction_sherif")
	})
	this.add.image(2000,190, "marchand").setInteractive().on("pointerdown",()=>{
		this.add.image(2000,190,"interraction_marchand")
	})
	this.add.image(2400,600, "barman").setInteractive().on("pointerdown",()=>{
		this.add.image(2000,190,"interraction_barman")
	
	
	this.add.image(0,332, "UIbase").setOrigin(0,0).setScrollFactor(0);
	this.add.image(570,355, "UIbullet").setOrigin(0,0).setScrollFactor(0);
	this.add.image(670,355, "UIbullet").setOrigin(0,0).setScrollFactor(0);
	this.add.image(620,355, "UIbullet").setOrigin(0,0).setScrollFactor(0);
	this.add.image(300,355, "UIlife").setOrigin(0,0).setScrollFactor(0);







	


	//ajout de la map
	const map = this.add.tilemap("map");
	const tiles = map.addTilesetImage("rtuc", "tileset");

	const layer = map.createLayer("Calque de Tuiles 1", tiles);

	// Ajout du personnage
	this.player = this.physics.add.sprite(350, 1400, 'character1');

	// Collision avec le monde
	layer.setCollisionByProperty({estSolide: true});
	this.physics.add.collider(this.player, layer);

	// Ajout des animations
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

	// Créer les éléments de l'interface ici
	/*var playButton = this.add.text(400, 300, 'Jouer', { fontSize: '32px', fill: '#FFF' });
	playButton.setOrigin(0.5);
	playButton.setInteractive();
	playButton.on('pointerdown', function () {

		// Lancer le jeu ici

	});

	var exitButton = this.add.text(400, 400, 'Quitter', { fontSize: '32px', fill: '#FFF' });
	exitButton.setOrigin(0.5);
	exitButton.setInteractive();
	exitButton.on('pointerdown', function () {
		// Quitter le jeu ici
		window.location.href = "about:blank";
	});
	*/

    this.physics.world.setBounds(0, 0, 4464, 2592);
    this.cameras.main.setBounds(0, 0, 4464, 2592);
    this.cameras.main.startFollow(this.player);
	this.cameras.main.setZoom(1)

}

// Mise à jour de la scène
function update() {

	console.log(this.player.x, this.player.y	)
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
