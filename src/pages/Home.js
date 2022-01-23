import { useEffect } from 'react';
import Pokedex from '../components/Pokedex';
import Layout from '../layout/Layout'

function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    document.title = 'Pokemonpedia'
  }, [])
  return (
    <Layout>
      <div className="content__home">
          <Pokedex isProfile={false} />
      </div>
    </Layout>
  );
}

export default Home;
