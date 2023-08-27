import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
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
      <button onClick={shuffleCards}>New Game</button>
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
    </div>
  );
}

export default App;
