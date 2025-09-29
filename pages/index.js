import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  // Lista de palavras DIRETO no componente
  const words = [
    'REACT', 'JAVASCRIPT', 'PROGRAMACAO', 'COMPUTADOR', 'ALGORITMO',
    'DESENVOLVIMENTO', 'INTERFACE', 'APLICATIVO', 'FRAMEWORK', 'BIBLIOTECA'
  ];

  useEffect(() => {
    // Seleciona palavra aleatória
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  }, []);

  const handleLetterClick = (letter) => {
    if (guessedLetters.includes(letter)) return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const isGameWon = word && word.split('').every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuesses >= 6;

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textAlign: 'center',
      color: 'white'
    }}>
      <Head>
        <title>Jogo da Forca</title>
        <meta name="description" content="Jogo da Forca em React/Next.js" />
      </Head>

      <h1>Jogo da Forca</h1>
      
      <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', margin: '1rem', color: 'black' }}>
        <h3>Forca</h3>
        <p>Erros: {wrongGuesses}/6</p>
      </div>

      <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', margin: '1rem', color: 'black' }}>
        <h2>
          {word.split('').map((letter, index) => (
            <span key={index} style={{ margin: '0 5px' }}>
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </h2>
      </div>

      <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', margin: '1rem' }}>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={guessedLetters.includes(letter) || isGameWon || isGameLost}
            style={{
              margin: '5px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: guessedLetters.includes(letter) 
                ? (word.includes(letter) ? 'green' : 'red') 
                : '#f0f0f0',
              color: guessedLetters.includes(letter) ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {isGameWon && (
        <div style={{ background: 'green', color: 'white', padding: '1rem', borderRadius: '10px', margin: '1rem' }}>
          <h2>🎉 Parabéns! Você venceu! 🎉</h2>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}
          >
            Jogar Novamente
          </button>
        </div>
      )}

      {isGameLost && (
        <div style={{ background: 'red', color: 'white', padding: '1rem', borderRadius: '10px', margin: '1rem' }}>
          <h2>😞 Você perdeu! 😞</h2>
          <p>A palavra era: <strong>{word}</strong></p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}