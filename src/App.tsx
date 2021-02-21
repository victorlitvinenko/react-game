import React from 'react';

import Grid from './components/Grid';
import Ui from './components/Ui';

const App: React.FC = () => {
  return (
    <div className="app">
      <Ui />
      <Grid />
    </div>
  );
};

export default App;
