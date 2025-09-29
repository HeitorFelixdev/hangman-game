import { useState, useEffect } from 'react';
import Head from 'next/head';

// Lista de palavras
const words = [
  'REACT', 'JAVASCRIPT', 'PROGRAMACAO', 'COMPUTADOR', 'ALGORITMO',
  'DESENVOLVIMENTO', 'INTERFACE', 'APLICATIVO', 'FRAMEWORK', 'BIBLIOTECA'
];

// Componente Hangman
function Hangman({ wrongGuesses }) {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      textAlign: 'center'
    }}>
      <h3>Jogo da Forca</h3>
      <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '300px', height: 'auto' }}>
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
      </svg>
      
      <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
        Erros: {wrongGuesses} / 6
      </div>
    </div>
  );
}

// Componente WordDisplay
function WordDisplay({ word, guessedLetters }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '0.5rem',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.5rem',
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      minHeight: '100px',
      alignItems: 'center'
    }}>
      {word.split('').map((letter, index) => (
        <span key={index} style={{ minWidth: '40px', textAlign: 'center', borderBottom: '3px solid #333', paddingBottom: '0.5rem' }}>
          {guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ))}
    </div>
  );
}

// Componente Keyboard
function Keyboard({ guessedLetters, onLetterClick, disabled }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '0.5rem',
      maxWidth: '600px',
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    }}>
      {alphabet.split('').map(letter => {
        const isGuessed = guessedLetters.includes(letter);
        
        return (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={isGuessed || disabled}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: isGuessed ? '#4caf50' : '#f0f0f0',
              color: isGuessed ? 'white' : 'black',
              cursor: isGuessed || disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

// Componente GameStatus
function GameStatus({ gameStatus, word, onRestart }) {
  if (gameStatus === 'playing') {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '500px'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1rem',
        borderRadius: '8px',
        width: '100%',
        backgroundColor: gameStatus === 'won' ? '#e8f5e9' : '#ffebee',
        color: gameStatus === 'won' ? '#2e7d32' : '#c62828'
      }}>
        {gameStatus === 'won' ? '🎉 Parabéns! Você venceu! 🎉' : '😞 Você perdeu! 😞'}
        {gameStatus === 'lost' && (
          <div style={{ marginTop: '0.5rem', fontSize: '1.2rem' }}>
            A palavra era: <strong>{word}</strong>
          </div>
        )}
      </div>
      <button 
        onClick={onRestart}
        style={{
          padding: '0.8rem 1.5rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Jogar Novamente
      </button>
    </div>
  );
}

// Função para pegar palavra aleatória
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Componente principal
export default function Home() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (word && word.split('').every(letter => guessedLetters.includes(letter))) {
      setGameStatus('won');
    }
    
    if (wrongGuesses >= 6) {
      setGameStatus('lost');
    }
  }, [guessedLetters, wrongGuesses, word]);

  const startNewGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  const handleLetterClick = (letter) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Head>
        <title>Jogo da Forca</title>
        <meta name="description" content="Jogo da Forca em React/Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{
        padding: '2rem 0',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <h1 style={{
          margin: '0 0 2rem',
          lineHeight: 1.15,
          fontSize: '3rem',
          textAlign: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          Jogo da Forca
        </h1>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          width: '100%'
        }}>
          <div style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Hangman wrongGuesses={wrongGuesses} />
          </div>
          
          <div style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <WordDisplay word={word} guessedLetters={guessedLetters} />
            <GameStatus 
              gameStatus={gameStatus} 
              word={word} 
              onRestart={startNewGame} 
            />
            <Keyboard 
              guessedLetters={guessedLetters}
              onLetterClick={handleLetterClick}
              disabled={gameStatus !== 'playing'}
            />
          </div>
        </div>
      </main>
    </div>
  );
}