import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Pokemon from './Pokemon'
import '../assets/scss/Pokedex.scss'

function Pokedex() {
  const [pokemonList, setList] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    getPokemon()
  }, [])

  const getPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(res => {
        setList(res.data.results)
        isLoading(false)
        console.log(res.data.results)
      }).catch(err => {
        // console.log(err)
      })
  }

  return (
    <div>
      <h3>Pokemon list</h3>
      {
        (loading)?(
          <p className="loading-text">Loading..</p>
        ) : (
          <ul className='list'>
            {pokemonList.map((list, index) => (
              <li className="list__pokemon" key={index}>
                <Link to={`/pokemon/${list.name}`}>
                  <Pokemon name={list.name} url={list.url} />
                </Link>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default Pokedex