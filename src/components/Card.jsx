import React from 'react'
import './Card.css';

const Card = (props) => {
  var link = props.value.image;

  return (
    <div className='card'>
      <img src={link} alt="image of potter bhai" />
      <span>{props.value.name}</span>
    </div>
  )
}

export default Card