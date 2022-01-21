import Pokedex from '../components/Pokedex';
import Layout from '../layout/Layout'

function Home() {
  return (
    <div className="content__home">
      <Layout>
        <Pokedex />
      </Layout>
    </div>
  );
}

export default Home;
