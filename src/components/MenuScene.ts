// src/components/MenuScene.tsx

import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Background color
    this.cameras.main.setBackgroundColor('#3498db');

    // Title text
    this.add.text(400, 200, 'My Phaser Game', {
      fontSize: '48px',
      color: '#fff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    // Start Game button
    const startButton = this.add.text(400, 300, 'Start Game', {
      fontSize: '24px',
      color: '#fff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    // Make the button interactive
    startButton.setInteractive();

    // Add a click event to start the game when the button is clicked
    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

export default MenuScene;
