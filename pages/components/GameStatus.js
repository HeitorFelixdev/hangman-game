const GameStatus = ({ gameStatus, word, onRestart }) => {
  if (gameStatus === 'playing') {
    return null;
  }

  return (
    <div className="game-status">
      <div className={`message ${gameStatus === 'won' ? 'win' : 'lose'}`}>
        {gameStatus === 'won' ? '🎉 Parabéns! Você venceu! 🎉' : '😞 Você perdeu! 😞'}
        {gameStatus === 'lost' && <div className="correct-word">A palavra era: <strong>{word}</strong></div>}
      </div>
      <button className="restart-button" onClick={onRestart}>
        Jogar Novamente
      </button>

      <style jsx>{`
        .game-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 500px;
        }

        .message {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          padding: 1rem;
          border-radius: 8px;
          width: 100%;
        }

        .win {
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        .lose {
          background-color: #ffebee;
          color: #c62828;
        }

        .correct-word {
          margin-top: 0.5rem;
          font-size: 1.2rem;
        }

        .restart-button {
          padding: 0.8rem 1.5rem;
          font-size: 1.2rem;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .restart-button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default GameStatus;