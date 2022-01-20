import axios from 'axios';
import React, { useState, useEffect } from 'react'

import '../assets/scss/Pokemon.scss'


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

  return (
    <div className="pokemon">
      {
        (loading)?(
          <div className="pokemon__loading">
            Loading
          </div>
        ) : (
        <div className="pokemon__content">
          <div className="pokemon__img">
            <img loading='lazy' src={data && data.sprites ? getImage(data.sprites) : ''} alt="" />
          </div>
          <p className="pokemon__name">{props.name}</p>
          <div className={`pokemon__attr${data ? getAllType(data.types) : ''}`}>
            {data.types.map((ty, index) => (
              <div className={`pokemon__attr__type bg__${ty.type.name}`} key={index}>
                <p>{ty.type.name}</p>
              </div>
            ))}
          </div>
        </div>

        )
      }
    </div>
  )
}

export default Pokemon;
