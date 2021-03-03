import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Music from './components/Music';

import Footer from './components/Footer';
import Game from './components/Game';
import Settings from './components/Settings';
import Statistics from './components/Statistics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact name="Root" component={Game} />
          <Route path="/settings" name="Settings" component={Settings} />
          <Route path="/stats" name="Statistics" component={Statistics} />
        </Switch>
        <Footer />
        <Music />
      </div>
    </Router>
  );
};

export default App;
