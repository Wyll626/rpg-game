// src/components/GameOverScene.tsx

import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    // Display a game over message and instructions
    this.add.text(400, 300, 'Game Over', {
      fontSize: '48px',
      color: '#fff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    this.add.text(400, 400, 'Press SPACE to Restart', {
      fontSize: '24px',
      color: '#fff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    // Listen for the space key to restart the game
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene'); // Transition back to the game scene
    });
  }
}

export default GameOverScene;
