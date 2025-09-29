const Keyboard = ({ guessedLetters, onLetterClick, disabled }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="keyboard">
      {alphabet.split('').map(letter => {
        const isGuessed = guessedLetters.includes(letter);
        
        return (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={isGuessed || disabled}
            className={`key ${isGuessed ? 'guessed' : ''}`}
          >
            {letter}
          </button>
        );
      })}

      <style jsx>{`
        .keyboard {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          max-width: 600px;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .key {
          width: 40px;
          height: 40px;
          font-size: 1.2rem;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          background-color: #f0f0f0;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .key:hover:not(:disabled) {
          background-color: #e0e0e0;
          transform: translateY(-2px);
        }

        .key:disabled {
          cursor: not-allowed;
          background-color: #cccccc;
        }

        .guessed {
          background-color: #4caf50;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Keyboard;