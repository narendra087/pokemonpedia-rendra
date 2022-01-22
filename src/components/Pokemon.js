import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import '../assets/scss/Pokemon.scss'
import pokewhite from '../assets/images/pokewhite.png'
import PokemonPlaceholder from './PokemonPlaceholder';
import { removePokemon } from '../redux/pokemonSlice';


function Pokemon(props) {
  const [data, setData] = useState(null)
  const [loading, isLoading] = useState(true)

  const myPokemon = useSelector((state) => state.pkmn.myPokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isProfile) {
      setData(props.data)
      isLoading(false)
    } else {
      function getData() {
        axios.get(props.url ? props.url : `https://pokeapi.co/api/v2/pokemon/${props.name}`)
          .then(res => {
            setData(res.data);
            isLoading(false)
          }).catch(err => {
            // console.log(err)
          });
      }
      getData()
    }
  }, [props])

  function getAllType(types) {
    let typeClass = '';
    for (let i = 0; i < types.length; i++) {
      typeClass += (' ' + types[i].type.name)
    }
    return typeClass;
  }

  function getImage(sprites) {
    if (sprites.other['official-artwork'].front_default) {
      return sprites.other['official-artwork'].front_default
    } else {
      return sprites.front_default;
    }
  }

  function getId(id) {
    if (id < 100) {
      if (id < 10) {
        return `#00${id}`
      }
      return `#0${id}`
    }
    return id
  }

  function countPokemon(name) {
    let count = 0;
    if (myPokemon && myPokemon.length) {
      count = myPokemon.filter(obj => obj.name === name)
      return count.length
    }
    return count
  }

  function releasePokemon() {
    dispatch(removePokemon(data.catchId))
  }

  const ReleaseButton = () => {
    if (props.isProfile) {
      return <button className='btn btn__primary pokemon__release' onClick={() => {releasePokemon()}}>Release</button>
    } else {
      return ''
    }
  }

  const OwnedPokemon = () => {
    if (!props.isProfile) {
      return <p>Owned: <span>{countPokemon(data.name)}</span></p>
    } else {
      return ''
    }
  }

  return (
    <div>
      
        {
          (loading)?(
            <PokemonPlaceholder />
          ) : (
            <div>
              <Link to={`/pokemon/${data.name}`}>
                <div className={`pokemon bg__${data.types[0].type.name}`}>
                  <div className="pokemon__content">
                  <div className="pokemon__id">
                    <p>{getId(data.id)}</p>
                    <OwnedPokemon />
                  </div>
                  {
                    (props.isProfile) ? (
                      <div>
                        <p className="pokemon__nickname">{data.nickname}<span>the</span></p>
                        <p className="pokemon__name">{data.name}</p>
                      </div>
                    ) : (
                      <p className="pokemon__name">{data.name}</p>
                    )
                  }
                    <div className="pokemon__img">
                      <img className='pokemon__img__bg' src={pokewhite} alt="" />
                      <img className='pokemon__img__sprite' loading='lazy' src={data && data.sprites ? getImage(data.sprites) : ''} alt="" />
                    </div>
                    <div className={`pokemon__attr${data ? getAllType(data.types) : ''}`}>
                      {data.types.map((ty, index) => (
                        <div className={`pokemon__attr__type`} key={index}>
                          <p>{ty.type.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              <ReleaseButton />
            </div>
          )
        }
    </div>
  )
}

export default Pokemon;
