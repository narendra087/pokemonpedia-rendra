import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addPokemon } from '../redux/pokemonSlice';

import Layout from '../layout/Layout'
import Popup from '../components/Popup';
import pokewhite from '../assets/images/pokewhite.png'
import pokeball from '../assets/images/pokeball.png'

import '../assets/scss/Detail.scss'
import { idGenerator } from '../utils/idGenerator';

function Detail(props) {
  const [name, setName] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [loading, isLoading] = useState(true)
  const [catching, isCatching] = useState(false)
  const [popupOpened, setPopup] = useState('')

  const path = useLocation().pathname

  const myPokemon = useSelector((state) => state.pkmn.myPokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    const arrName = path.split('/')
    if (arrName.length === 3) {
      const pokeName = arrName[arrName.length - 1]
      setName(pokeName)
      getDetailPokemon(pokeName)

      document.title = `${capitalizeFirst(pokeName)} | Pokemonpedia`
    }
  }, [path])

  function getImage(sprites) {
    if (sprites.other['official-artwork'].front_default) {
      return sprites.other['official-artwork'].front_default
    } else {
      return sprites.front_default;
    }
  }

  const togglePopup = (popup) => {
    setPopup(popup)
  }

  const catchPokemon = () => {
    isCatching(true)
    setTimeout(() => {
      if (Math.random() <= 0.5) {
        togglePopup('catch-failed')
      } else {
        togglePopup('catch-success')
      }
      isCatching(false)
    }, 3000);
  }

  const savePokemon = (name) => {
    const tempData = {
      nickname: name || pokemon.name,
      catchId: idGenerator(),
      ...pokemon
    }
    dispatch(addPokemon(tempData))
    setPopup('')
  }

  function getDetailPokemon(pokemonName) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => {
          // console.log(res);
          setPokemon(res.data);
          isLoading(false)
        }).catch(err => {
          // console.log(err)
        });
  }

  function getId(id) {
    if (id < 100) {
      if (id < 10) {
        return `#00${id}`
      }
      return `#0${id}`
    }
    return `#${id}`
  }

  function capitalizeFirst(string) {
    if (!string) {
      return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Layout>
      <div className="content__detail">
      {
        (loading)?(
          <div className="detail__pokemon">
            <div className="detail__pokemon__loading">
              <img src={pokeball} alt="" />
            </div>
          </div>
        ) : (
        <div className="detail__pokemon">
          <div className={`detail__pokemon__image`}>
            <div className={`pokemon__image bg__${pokemon.types[0].type.name}`}>
              <img className={`pokemon__image__bg`} loading='lazy' src={pokewhite} alt="" />
              <img src={pokeball} alt="" className={`pokemon__image__pokeball${catching ? ' catching' : ''}`} />
              <img className={`pokemon__image__sprite${catching ? ' catching' : ''}`} loading='lazy' src={pokemon && pokemon.sprites ? getImage(pokemon.sprites) : ''} alt="" />
            </div>
            <div className="detail__pokemon__catch">
              <button className='btn btn__primary' disabled={catching ? true : false} onClick={() => {catchPokemon()}}>{catching ? 'Catching...' : 'Catch Pokemon'}</button>
            </div>
          </div>
          <div className="detail__pokemon__desc">
            <p className="detail__name">{pokemon.name} {getId(pokemon.id)}</p>
            <div className={`detail__types`}>
              {pokemon.types.map((ty, index) => (
                <div className={`detail__types__name bg__${ty.type.name}`} key={index}>
                  <p>{ty.type.name}</p>
                </div>
              ))}
            </div>
            <div className="detail__stats">
              <p className="detail__title">Stats</p>
              {pokemon.stats.map((st, index) => (
                <div className={`detail__stats__item`} key={index}>
                  <p className='stat__name'>{st.stat.name.replace('-', ' ').replace('special', 'sp.')}</p>
                  <div className="stat__progress">
                    <progress value={st.base_stat} max="100" />
                    <p className='stat__value'>{st.base_stat}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="detail__moves">
              <p className="detail__title">Moves</p>
              <div className="detail__moves__wrapper">
                {pokemon.moves.map((mv, index) => (
                  <p className='move__name' key={index}>{mv.move.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
        {popupOpened === 'catch-failed' && <Popup
          content={<>
            <p className='popup__title'>Pokemon run away!</p>
          </>}
          handleClose={togglePopup}
        />}
        {popupOpened === 'catch-success' && <Popup
          content={<>
            <p className='popup__title'>Name your partner!</p>
            <img className='popup__image' src={pokemon && pokemon.sprites ? getImage(pokemon.sprites) : ''} alt="" />
          </>}
          handleClose={togglePopup}
          handleSave={savePokemon}
          defaultName={pokemon ? pokemon.name : ''}
          withInput={true}
        />}
      </div>
    </Layout>
  )
}

export default Detail