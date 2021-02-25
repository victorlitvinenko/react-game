import React from 'react';
import { observer } from 'mobx-react-lite';

import Footer from './components/Footer';
import Game from './components/Game';
import SettingsStore from './stores/settings/settings-store';
import Settings from './components/Settings';

const App: React.FC = () => {
  return (
    <div className="app">
      {SettingsStore.status === 'default' && <Game />}
      {SettingsStore.status === 'settings' && <Settings />}
      <Footer />
    </div>
  );
};

export default observer(App);
