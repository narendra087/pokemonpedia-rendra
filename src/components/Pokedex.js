import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Pokemon from './Pokemon'
import PokemonPlaceholder from './PokemonPlaceholder';
import pokeball from '../assets/images/pokeball.png'
import '../assets/scss/Pokedex.scss'

function Pokedex() {
  const [pokemonList, setList] = useState([])
  const [loading, isLoading] = useState(true)
  const [fetching, isFetching] = useState(false)
  const [nextUrl, setUrl] = useState(true)

  useEffect(() => {
    getPokemon()
  }, [])

  function getPokemon(url) {
    if (url) {
      isFetching(true)
    }
    axios.get(url ? url : 'https://pokeapi.co/api/v2/pokemon')
      .then(res => {
        setList([...pokemonList, ...res.data.results])
        setUrl(res.data.next)
        isLoading(false)
        isFetching(false)
        console.log(res)
      }).catch(err => {
        // console.log(err)
      })
  }

  const renderPlaceholder = () => {
    let arrPlaceholder = []
    for (let i = 0; i < 12; i++) {
      arrPlaceholder.push(
        <li className='list__pokemon' key={i}>
          <PokemonPlaceholder />
        </li>
      )
    }
    return arrPlaceholder;
  }

  return (
    <div>
      {
        (loading)?(
          <ul className='list'>
            {renderPlaceholder()}
          </ul>
        ) : (
          <div>
            <ul className='list'>
              {pokemonList.map((list, index) => (
                <li className="list__pokemon" key={index}>
                  <Link to={`/pokemon/${list.name}`}>
                    <Pokemon name={list.name} url={list.url} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="load__pokemon">
            {
              (!fetching) ? (
                <button className='load__pokemon__button btn btn__primary' onClick={ () => {getPokemon(nextUrl)}}>Load More</button>
              ) : (
                <img className='load__pokemon__loading' src={pokeball} alt="" />
              )
            }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Pokedex