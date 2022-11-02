import React from 'react'
import './Card.css';

const Card = ({value, setCardSelected}) => {
  var link = value.image;

  const handleCardClick = () => {
    setCardSelected(value);
  };

  return (
    <div className='card' onClick={handleCardClick}>
      <img src={link} alt="image of potter bhai" />
      <span>{value.name}</span>
    </div>
  )
}

export default Card