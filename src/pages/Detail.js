import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addPokemon } from '../redux/pokemonSlice';

import Layout from '../layout/Layout'
import Popup from '../components/Popup';
import pokewhite from '../assets/images/pokewhite.png'

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

  const togglePopup = (name) => {
    setPopup(name)
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