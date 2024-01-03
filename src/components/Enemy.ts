// Enemy.ts

import Phaser from 'phaser';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    
    // Add the enemy to the scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Set up enemy properties and behavior here
    this.setCollideWorldBounds(true);
  }

  // Add enemy-specific methods and behavior here
}

export default Enemy;
