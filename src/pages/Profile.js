import Pokedex from '../components/Pokedex';
import Layout from '../layout/Layout'

function Profile() {
  return (
    <Layout>
      <div className="content__profile">
          <Pokedex isProfile={true} />
      </div>
    </Layout>
  )
}

export default Profile
