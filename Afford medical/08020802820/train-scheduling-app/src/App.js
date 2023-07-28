import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AllTrainsPage from './components/AllTrainsPage';
import SingleTrainPage from './components/SingleTrainPage';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">All Trains</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={AllTrainsPage} />
        <Route path="/train/:trainId" component={SingleTrainPage} />
      </Switch>
    </Router>
  );
};

export default App;
