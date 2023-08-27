import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Card from "./components/Card";
import "./App.css";

const cardImages = [
  { src: "/img/1.jpg", matched: false },
  { src: "/img/2.jpg", matched: false },
  { src: "/img/3.jpg", matched: false },
  { src: "/img/4.jpg", matched: false },
  { src: "/img/5.jpg", matched: false },
  { src: "/img/6.jpg", matched: false },
  { src: "/img/7.jpg", matched: false },
  { src: "/img/8.jpg", matched: false },
  { src: "/img/9.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [allCardsMatched, setAllCardsMatched] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [cards]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo && card !== choiceOne) {
      setChoiceTwo(card);
      setTimeout(() => checkForMatch(choiceOne, card), 700);
    }
  };

  const checkForMatch = (card1, card2) => {
    if (card1.src === card2.src) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.src === card1.src || card.src === card2.src
            ? { ...card, matched: true }
            : card
        )
      );
    }

    const allMatched = cards.every((card) => card.matched);
    if (allMatched) {
      setAllCardsMatched(true);
    }

    setTimeout(resetGame, 500);
  };

  const resetGame = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <div className="game-items">
        <p className="turns">Turns: {turns} </p>
        <button className="button" onClick={shuffleCards}>
          New Game
        </button>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
      {showConfetti && (
        <Confetti
          width={window.innerWidth - 30}
          height={window.innerHeight + 240}
          numberOfPieces={150}
        />
      )}
    </div>
  );
}

export default App;
