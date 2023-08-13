import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Views/LandingPage/LandingPage'
import Home from './Views/Home/Home'
import Detail from './Views/Detail/DogDetail'
import FormPage from './Views/Form/Form'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
         <Route exact path="/home" component={Home} />
        <Route exact path="/dog/:id" component={Detail} />
        <Route exact path="/create" component={FormPage} />
      </Switch>
    </Router>
  );
};

export default App;