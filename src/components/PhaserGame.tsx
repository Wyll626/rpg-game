// src/components/PhaserGame.tsx

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MenuScene from './MenuScene';
import GameScene from './GameScene';
import GameOverScene from './GameOverScene';

const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  let game: Phaser.Game | null = null;

  useEffect(() => {
    initializeGame();
    return () => {
      // Cleanup and destroy the game when unmounting
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  const initializeGame = () => {
    if (!gameContainerRef.current) {
      return;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainerRef.current,
      input: {
        gamepad: true
    },
      scene: [MenuScene, GameScene, GameOverScene], // Add PlayerScene to the scenes array
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }, // No gravity in this example
        },
      },
    };

    game = new Phaser.Game(config);
  };

  return (
    <div ref={gameContainerRef}></div>
  );
};

export default PhaserGame;
