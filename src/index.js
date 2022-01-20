import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Layout from './layout/Layout'
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:pokemon" element={<Detail />} />
          <Route path="/my-pokemon" element={<Profile />} />
          <Route
            path="*"
            element={
              <main style={{padding:"1rem"}}>
                <span>There's nothing here!</span>
              </main>
            }
          />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
