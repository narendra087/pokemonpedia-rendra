import '../assets/scss/Header.scss';
import logo from '../assets/images/pokemonpedia.png'
import {
  Link
} from 'react-router-dom';

const Header = () => {
  return ( 
    <div className="header">
      <Link className="header__links__item" to='/'>
        <img src={logo} alt="pokemonpedia" />
      </Link>
      <div className="header__links">
        <Link className="header__links__item" to='/'>Home</Link>
        <Link className="header__links__item" to='/my-pokemon'>My Pokemon</Link>
      </div>
    </div>
  );
}

export default Header;