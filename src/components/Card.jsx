import React from 'react';
import "../styles/Card.css";

const Card = (props) => {
  return (
    <div>
        <div className="card">
            <div className='paragraph'>
            <p>{props.paragraph}</p>
            </div>
        </div>
    </div>
  )
}

export default Card