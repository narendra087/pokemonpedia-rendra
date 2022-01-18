import './App.scss';
import Header from './components/Header';
import Pokemon from './components/Pokemon';


function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="content">
        <Pokemon />
        </div>
      </div>
    </div>
  );
}

export default App;
