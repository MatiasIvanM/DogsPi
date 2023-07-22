import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Views/LandingPage/LandingPage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <Route exact path="/home" component={HomePage} />
        <Route exact path="/game/:id" component={Detail} />
        <Route exact path="/form" component={FormPage} /> */}
      </Switch>
    </Router>
  );
};

export default App;