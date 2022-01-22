import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../layout/Layout'

import pokewhite from '../assets/images/pokewhite.png'
import pokeball from '../assets/images/pokeball.png'
// import '../assets/scss/Detail.scss'
import '../assets/scss/NewDetail.scss'

function Detail(props) {
  const [name, setName] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [loading, isLoading] = useState(true)
  const [isHover, setHover] = useState(false)
  const [catching, isCatching] = useState(false)

  const path = useLocation().pathname

  useEffect(() => {
    const arrName = path.split('/')
    if (arrName.length === 3) {
      setName(arrName[arrName.length - 1])
      getDetailPokemon(arrName[arrName.length - 1])
    }
  }, [path])

  function getImage(sprites) {
    if (sprites.other['official-artwork'].front_default) {
      return sprites.other['official-artwork'].front_default
    } else {
      return sprites.front_default;
    }
  }

  const toggleHover = () => {
    setHover(!isHover)
  }

  const catchPokemon = () => {
    isCatching(true)

    setTimeout(() => {
      isCatching(false)
    }, 3000);
  }

  function getDetailPokemon(pokemonName) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => {
          console.log(res);
          setPokemon(res.data);
          isLoading(false)
        }).catch(err => {
          // console.log(err)
        });
  }

  function getId(id) {
    if (id < 100) {
      if (id < 10) {
        return `00${id}`
      }
      return `0${id}`
    }
    return id
  }

  return (
    <Layout>
      <div className="content__detail">
      {
        (loading)?(
          <div className="detail__pokemon">
            <p className="detail__loading">Loading</p>
          </div>
        ) : (
        <div className="detail__pokemon">
          <div className={`detail__pokemon__image`}>
            <div className={`detail__pokemon__id bg__${pokemon.types[0].type.name}`}>
              {getId(pokemon.id)}
            </div>
            <div className={`pokemon__image bg__${pokemon.types[0].type.name}${catching ? ' catching' : ''}`}>
              <img className={`pokemon__image__bg`} loading='lazy' src={pokewhite} alt="" />
              <img className={`pokemon__image__sprite${catching ? ' catching' : ''}`} loading='lazy' src={pokemon && pokemon.sprites ? getImage(pokemon.sprites) : ''} alt="" />
            </div>
            <div className={`detail__pokemon__name bg__${pokemon.types[0].type.name}`}>
              <p>{pokemon.name}</p>
            </div>
            <div className={`detail__pokemon__types bg__${pokemon.types[0].type.name}`}>
              {pokemon.types.map((ty, index) => (
                <div className={`pokemon__type__name`} key={index}>
                  <p>{ty.type.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="detail__pokemon__catch">
            <button className='btn btn__primary' disabled={catching ? true : false} onClick={() => {catchPokemon()}}>{catching ? 'Catching...' : 'Catch Pokemon'}</button>
          </div>
          <div className="detail__pokemon__stats">

          </div>
          {/* <div className="detail__pokemon__info">
            <div className="pokemon__info">
              <p className="pokemon__info__name">
                {pokemon.name}
              </p>
              <div className="pokemon__info__types">
              {pokemon.types.map((ty, index) => (
                <p className="pokemon__type" key={index}>{ty.type.name}</p>
              ))}
              </div>
              <div className="pokemon__info__stats">
                <p className="pokemon__info__title">Status</p>
              {pokemon.stats.map((st, index) => (
                <p className="pokemon__stat" key={index}>{st.stat.name}
                  <span className="pokemon__stat__base">{st.base_stat}</span>
                </p>
              ))}
              </div>
              <div className="pokemon__info__moves">
                <p className="pokemon__info__title">Moves</p>
                <div className="pokemon__move">
                {pokemon.moves.map((mv, index) => (
                  <p className="pokemon__move__name" key={index}>{mv.move.name.replace('-', ' ')}</p>
                ))}
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="detail__pokemon__section">
            <div className="pokemon__section__image">
              <img loading='lazy' src={pokemon && pokemon.sprites ? getImage(pokemon.sprites) : ''} alt="" />
            </div>
            <div className="pokemon__section__ball">
              <img className={`${isHover && !isThrowing ? 'rotating' : ''} ${isThrowing ? 'throw' : ''}`} src={pokeball} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onMouseDown={catchPokemon} alt="" />
              <p>Catch the pokemon!</p>
            </div>
          </div> */}
        </div>
        )}
      </div>
    </Layout>
  )
}

export default Detail