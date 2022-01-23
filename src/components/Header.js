import '../assets/scss/Header.scss';
import logo from '../assets/images/pokemonpedia.png'
import {
  Link, NavLink
} from 'react-router-dom';

const Header = () => {
  return ( 
    <div className="header">
      <Link to='/'>
        <img src={logo} alt="pokemonpedia" />
      </Link>
      <div className="header__links">
        <NavLink className="header__links__item" to='/'>Home</NavLink>
        <NavLink className="header__links__item" to='/my-pokemon'>My Pokemon</NavLink>
      </div>
    </div>
  );
}

export default Header;