import "./Card.css";

export default function Card({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front" />
        <img
          className="back"
          src="../public/img/cover.png"
          alt="cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
