import axios from 'axios';
import React, { Component } from 'react'

// function Pokemon(url) {
//   return {
//     <div className="pokemon__card">
    
//     </div>
//   }
// }

export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pokemonList: []
    }
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(res => {
        this.setState({
          isLoading: false,
          pokemonList: res.data.results,
        })
        console.log(res.data)
      }).catch(err => {
        // console.log(err)
      })
  }

  render() {
    return (
      <div>
        <h3>Pokemon list</h3>
        <ul className='pokemon'>
          {this.state.pokemonList.map((list, index) => (
            <li className="pokemon__card" key={index}>
              {list.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
