import React from 'react';
import { observer } from 'mobx-react-lite';

import RootStore from '../stores/root-store';

import './ui.scss';

const Ui: React.FC = () => {
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;

  return (
    <>
      <div
        className="ui__title"
        style={GridStore.hasWon ? { transform: 'translate(0, 0)' } : {}}
      >
        Уровень пройден
      </div>
      <div className="ui__button">
        <button
          type="button"
          style={GridStore.hasWon ? { transform: 'translate(0, 0)' } : {}}
          onClick={() => GridStore.init()}
        >
          Следующий
        </button>
      </div>
      <div className="ui_settings">
        <button
          type="button"
          onClick={() => {
            SettingsStore.changeSoundsVolume(1);
          }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            SettingsStore.changeSoundsVolume(0.5);
          }}
        >
          -
        </button>
      </div>
    </>
  );
};

export default observer(Ui);
