import Header from '../components/Header';
import '../Global.scss';

export default function layout({children}) {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="content">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
