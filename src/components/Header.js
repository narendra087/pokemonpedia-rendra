import '../assets/scss/Header.scss';

const Header = () => {
  return ( 
    <div className="header">
      <h1>Pokemonpedia</h1>
      <div className="header__links">
        <a href="/" className="header__links__item">Home</a>
        <a href="/my-pokemon" className="header__links__item">My Pokemon</a>
      </div>
    </div>
  );
}

export default Header;