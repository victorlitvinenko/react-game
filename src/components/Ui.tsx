import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import * as Icon from 'react-feather';

import RootStore from '../stores/root-store';
import music from '../sounds/music.mp3';

import './ui.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sound = require('react-sound').default;

const Ui: React.FC = () => {
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;

  const [isMusicPlaying, setIsMusicPlaying] = useState(Sound.status.STOPPED);
  document.addEventListener('click', () =>
    setIsMusicPlaying(Sound.status.PLAYING)
  );

  return (
    <>
      <Sound
        url={music}
        playStatus={isMusicPlaying}
        loop
        volume={SettingsStore.isMusicOn ? +SettingsStore.musicVolume : 0}
        muted
      />
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
      <div className="ui__settings">
        <button
          type="button"
          className={cn('sound-button', {
            'sound-button--disabled': !SettingsStore.isMusicOn,
          })}
          onClick={() => SettingsStore.switchMusic(!SettingsStore.isMusicOn)}
        >
          <Icon.Music color="white" />
        </button>
        <input
          type="range"
          value={SettingsStore.musicVolume}
          onChange={({ target: { value } }) =>
            SettingsStore.changeMusicVolume(+value)
          }
          disabled={!SettingsStore.isMusicOn}
        />
        <button
          type="button"
          className={cn('sound-button', {
            'sound-button--disabled': !SettingsStore.isSoundsOn,
          })}
          onClick={() => SettingsStore.switchSounds(!SettingsStore.isSoundsOn)}
        >
          <Icon.Bell color="white" />
        </button>
        <input
          type="range"
          value={SettingsStore.soundsVolume * 100}
          onChange={({ target: { value } }) =>
            SettingsStore.changeSoundsVolume(+value / 100)
          }
          disabled={!SettingsStore.isSoundsOn}
        />
      </div>
    </>
  );
};

export default observer(Ui);
