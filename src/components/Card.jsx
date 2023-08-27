import "./Card.css";
import PropTypes from "prop-types";

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
          src="/img/cover.jpg"
          alt="cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
};
