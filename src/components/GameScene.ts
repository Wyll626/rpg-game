// src/components/GameScene.tsx

import Phaser from 'phaser';
import Enemy from './Enemy'; // Import the Enemy class

class GameScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite | null = null;
  bullets: Phaser.Physics.Arcade.Group | null = null;
  enemies: Phaser.Physics.Arcade.Group | null = null;

  lastShotTime: number = 0;
  killedEnemies: number = 0; // Initialize a counter for killed enemies

  killedText: Phaser.GameObjects.Text | null = null; // Text object to display killed count

  constructor() {
    super({ key: 'GameScene' }); // Update the key to 'GameScene'
  }

  preload() {
    this.load.image('player', 'src/assets/player.png'); // Load player image
    this.load.image('bullet', 'src/assets/bullet.png');
  }

  create() {
    this.physics.world.setBounds(0, 0, 800, 600); // Set the world bounds

    // Create a player as a colored cube and make it smaller
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player?.setCollideWorldBounds(true); // Player cannot move outside the world bounds
    this.player.setScale(0.7);
    this.bullets = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.killedText = this.add.text(10, 10, 'Killed: 0', {
      fontSize: '20px',
      color: '#fff',
      fontFamily: 'Arial',
    });

    // Set up a timer to spawn enemies periodically
    this.time.addEvent({
      delay: 1000, // Spawn every 2 seconds (adjust as needed)
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
    this.physics.add.collider(this.bullets, this.enemies, this.handleBulletEnemyCollision, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
  }

  shoot(shootAngle: number) {
    if (!this.player) {
      return;
    }
    const currentTime = this.time.now;
    const timeSinceLastShot = currentTime - this.lastShotTime;

    // Check if enough time has passed since the last shot (1 second)
    if (timeSinceLastShot >= 1000) {
      // Create a bullet at the player's position
      const bullet = this.bullets?.create(this.player.x, this.player.y, 'bullet');

      // Set the velocity of the bullet based on the shooting angle
      const bulletSpeed = 400; // Adjust the bullet speed as needed
      bullet?.setVelocity(bulletSpeed * Math.cos(shootAngle), bulletSpeed * Math.sin(shootAngle));

      // Optionally, add more customization to the bullet here
      // For example, setting collision properties, damage, etc.

      // Update the last shot timestamp
      this.lastShotTime = currentTime;
    }
  }

  spawnEnemy() {
    const spawnSide = Phaser.Math.Between(0, 1); // 0 for left, 1 for right
    const spawnX = spawnSide === 0 ? -20 : 820; // Adjust as needed for your game's screen dimensions
    const spawnY = Phaser.Math.Between(50, 550); // Adjust Y spawn position as needed

    // Create a new enemy and add it to the group
    const enemy = new Enemy(this, spawnX, spawnY, 'enemyTexture'); // Replace 'enemyTexture' with your enemy texture key
    this.enemies?.add(enemy);

    // Calculate the direction vector from the enemy to the player
    const direction = new Phaser.Math.Vector2(this.player.x - enemy.x, this.player.y - enemy.y);
    direction.normalize(); // Normalize to get a unit vector

    // Set the velocity of the enemy based on the direction (adjust speed as needed)
    const speed = 100; // Adjust the speed of enemies
    enemy.setVelocity(direction.x * speed, direction.y * speed);
  }

  handleBulletEnemyCollision(bullet: Phaser.Physics.Arcade.Sprite, enemy: Enemy) {
    // Remove the bullet when it hits an enemy
    bullet.destroy();

    // Destroy the enemy
    enemy.destroy();
    this.killedEnemies++;

    // Update the killedText to display the updated count
    if (this.killedText) {
      this.killedText.text = `Killed: ${this.killedEnemies}`;
    }
  }

  handlePlayerEnemyCollision(player: Phaser.Physics.Arcade.Sprite, enemy: Enemy) {
    player.destroy(); // Destroy the player sprite
    enemy.destroy(); // Destroy the enemy sprite

    // Transition to the game over scene
    this.scene.start('GameOverScene');
  }

  update() {
    const gamepad = this.input?.gamepad?.getPad(0); // Get the first connected gamepad
    if (gamepad && this.player) {
      // Check the values of gamepad axes for movement
      const xAxis = gamepad.axes[0].getValue();
      const yAxis = gamepad.axes[1].getValue();

      this.player.x += 3 * xAxis;
      this.player.y += 3 * yAxis;

      this.player.flipX = (xAxis < 0);

      const xAxisRight = gamepad.axes[2].getValue(); // Right analog stick X-axis
      const yAxisRight = gamepad.axes[3].getValue(); // Right analog stick Y-axis

      // Calculate the shooting direction based on analog stick values
      const shootAngle = Math.atan2(yAxisRight, xAxisRight);

      // Shoot in the direction of the analog stick
      if (Math.abs(xAxisRight) > 0.2 || Math.abs(yAxisRight) > 0.2) {
        this.shoot(shootAngle);
      }
    }
    if (this.player) {
      this.enemies?.getChildren().forEach((enemy: Enemy) => {
        // Calculate the direction vector from the enemy to the player
        const direction = new Phaser.Math.Vector2(this.player!.x - enemy.x, this.player!.y - enemy.y);
        direction.normalize(); // Normalize to get a unit vector

        // Set the velocity of the enemy based on the direction (adjust speed as needed)
        const speed = 100; // Adjust the speed of enemies
        enemy.setVelocity(direction.x * speed, direction.y * speed);
      });
    }
  }

  // Implement the shoot method for shooting logic
  // shoot(pointer: Phaser.Input.Pointer) {
  //   // Your shooting logic here
  // }
}

export default GameScene;
