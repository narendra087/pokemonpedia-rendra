import { useEffect } from 'react';
import Pokedex from '../components/Pokedex';
import Layout from '../layout/Layout'

function Profile() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    document.title = 'My Pokemon | Pokemonpedia'
  }, [])
  return (
    <Layout>
      <div className="content__profile">
          <Pokedex isProfile={true} />
      </div>
    </Layout>
  )
}

export default Profile
