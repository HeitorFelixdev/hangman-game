const WordDisplay = ({ word, guessedLetters }) => {
  return (
    <div className="word-display">
      {word.split('').map((letter, index) => (
        <span key={index} className="letter">
          {guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ))}

      <style jsx>{`
        .word-display {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-size: 2.5rem;
          font-weight: bold;
          letter-spacing: 0.5rem;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          min-height: 100px;
          align-items: center;
        }

        .letter {
          min-width: 40px;
          text-align: center;
          border-bottom: 3px solid #333;
          padding-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .word-display {
            font-size: 1.8rem;
            letter-spacing: 0.3rem;
          }
          
          .letter {
            min-width: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default WordDisplay;