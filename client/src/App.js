import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link className="App-link" to="/">Home</Link>
          <Link className="App-link" to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
