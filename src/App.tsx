import React from 'react';
import { observer } from 'mobx-react-lite';

import Footer from './components/Footer';
import Game from './components/Game';
import SettingsStore from './stores/settings/settings-store';
import Settings from './components/Settings';

const CustomRouter = observer(() => {
  switch (SettingsStore.status) {
    case 'default':
      return <Game />;
    case 'settings':
      return <Settings />;
    default:
      throw new Error('Unknown status');
  }
});

const App: React.FC = () => {
  return (
    <div className="app">
      <CustomRouter />
      <Footer />
    </div>
  );
};

export default App;
