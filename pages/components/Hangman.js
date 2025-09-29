const Hangman = ({ wrongGuesses }) => {
  return (
    <div className="hangman">
      <svg viewBox="0 0 200 200" className="hangman-svg">
        {/* Base */}
        {wrongGuesses >= 1 && <line x1="20" y1="180" x2="100" y2="180" stroke="brown" strokeWidth="4" />}
        
        {/* Post */}
        {wrongGuesses >= 2 && <line x1="60" y1="180" x2="60" y2="20" stroke="brown" strokeWidth="4" />}
        
        {/* Top beam */}
        {wrongGuesses >= 3 && <line x1="60" y1="20" x2="140" y2="20" stroke="brown" strokeWidth="4" />}
        
        {/* Rope */}
        {wrongGuesses >= 4 && <line x1="140" y1="20" x2="140" y2="50" stroke="brown" strokeWidth="2" />}
        
        {/* Head */}
        {wrongGuesses >= 5 && <circle cx="140" cy="65" r="15" fill="none" stroke="black" strokeWidth="2" />}
        
        {/* Body */}
        {wrongGuesses >= 6 && <line x1="140" y1="80" x2="140" y2="130" stroke="black" strokeWidth="2" />}
        
        {/* Left arm */}
        {wrongGuesses >= 7 && <line x1="140" y1="100" x2="120" y2="120" stroke="black" strokeWidth="2" />}
        
        {/* Right arm */}
        {wrongGuesses >= 8 && <line x1="140" y1="100" x2="160" y2="120" stroke="black" strokeWidth="2" />}
        
        {/* Left leg */}
        {wrongGuesses >= 9 && <line x1="140" y1="130" x2="120" y2="160" stroke="black" strokeWidth="2" />}
        
        {/* Right leg */}
        {wrongGuesses >= 10 && <line x1="140" y1="130" x2="160" y2="160" stroke="black" strokeWidth="2" />}
      </svg>
      
      <div className="wrong-guesses">
        Erros: {wrongGuesses} / 6
      </div>

      <style jsx>{`
        .hangman {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .hangman-svg {
          width: 100%;
          max-width: 300px;
          height: auto;
        }

        .wrong-guesses {
          margin-top: 1rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Hangman;