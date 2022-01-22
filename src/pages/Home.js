import Pokedex from '../components/Pokedex';
import Layout from '../layout/Layout'

function Home() {
  return (
    <Layout>
      <div className="content__home">
          <Pokedex />
      </div>
    </Layout>
  );
}

export default Home;
