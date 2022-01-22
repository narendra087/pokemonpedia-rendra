import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import Pokemon from './Pokemon'
import PokemonPlaceholder from './PokemonPlaceholder';
import pokeball from '../assets/images/pokeball.png'
import '../assets/scss/Pokedex.scss'

function Pokedex(props) {
  const [pokemonList, setList] = useState([])
  const [loading, isLoading] = useState(true)
  const [fetching, isFetching] = useState(false)
  const [nextUrl, setUrl] = useState(true)

  const myPokemon = useSelector((state) => state.pkmn.myPokemon);

  useEffect(() => {
    if (!props.isProfile) {
      getPokemon()
    } else {
      isLoading(false)
    }
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
        // console.log(res)
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
              {(!props.isProfile ? pokemonList : myPokemon).map((list, index) => (
                <li className="list__pokemon" key={index}>
                  <Pokemon name={list.name} url={list.url} isProfile={props.isProfile} data={list} />
                </li>
              ))}
            </ul>
            {
              (!props.isProfile) ? (
                <div className="load__pokemon">
                {
                  (!fetching) ? (
                    <button className='load__pokemon__button btn btn__primary' onClick={ () => {getPokemon(nextUrl)}}>Load More</button>
                  ) : (
                    <img className='load__pokemon__loading' src={pokeball} alt="" />
                  )
                }
                </div>
              ) : (<div></div>)
            }
          </div>
        )
      }
    </div>
  )
}

export default Pokedex