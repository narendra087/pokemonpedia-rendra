import React from 'react';
import pokeball from '../assets/images/pokeball.png'

function PokemonPlaceholder() {
  return (
    <div className="pokemon">
      <div className="pokemon-content">
        <div className="pokemon__img">
        <img className='pokemon__img__bg pokemon__img__bg--loading' src={pokeball} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PokemonPlaceholder
