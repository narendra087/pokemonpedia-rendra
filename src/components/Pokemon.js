import axios from 'axios';
import React, { useState, useEffect } from 'react'

import '../assets/scss/Pokemon.scss'
import pokewhite from '../assets/images/pokewhite.png'
import pokeball from '../assets/images/pokeball.png'


function Pokemon(props) {
  const [data, setData] = useState(null)
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    function getData() {
      axios.get(props.url)
        .then(res => {
          console.log(res);
          setData(res.data);
          isLoading(false)
        }).catch(err => {
          // console.log(err)
        });
    }
    getData()
  }, [props.url])

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

  return (
    <div>
      
        {
          (loading)?(
            <div className="pokemon">
              <div className="pokemon-content">
                <div className="pokemon__img">
                <img className='pokemon__img__bg pokemon__img__bg--loading' src={pokeball} alt="" />
                </div>
              </div>
            </div>
          ) : (
          <div className={`pokemon bg__${data.types[0].type.name}`}>
            <div className="pokemon__content">
            <div className="pokemon__id">{getId(data.id)}</div>
            {/* <div className="pokemon__dot"><p>0</p></div> */}
            <p className="pokemon__name">{props.name}</p>
            <div className="pokemon__counter">Owned: 0</div>
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
          )
        }
    </div>
  )
}

export default Pokemon;
