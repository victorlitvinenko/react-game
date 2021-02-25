import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import * as Icon from 'react-feather';

import RootStore from '../../stores/root-store';
import music from '../../sounds/music.mp3';
import Btn from '../Btn';

import './ui.scss';

const Ui: React.FC = () => {
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;

  const musicRef = useRef<HTMLAudioElement>(null);
  document.addEventListener('click', () => musicRef.current?.play());

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = SettingsStore.isMusicOn
        ? +SettingsStore.musicVolume
        : 0;
    }
  }, [SettingsStore.isMusicOn, SettingsStore.musicVolume]);

  return (
    <>
      <audio loop ref={musicRef} src={music}>
        <track kind="captions" />
      </audio>
      <div className="ui__title">
        <div
          className="ui__title-text"
          style={GridStore.hasWon ? { transform: 'translate(0, 0)' } : {}}
        >
          Уровень пройден
        </div>
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
      <div className="ui__sound-settings">
        <Btn
          disabled={!SettingsStore.isMusicOn}
          onClick={() => SettingsStore.switchMusic(!SettingsStore.isMusicOn)}
        >
          <Icon.Music color="white" />
        </Btn>
        <input
          type="range"
          value={SettingsStore.musicVolume * 100}
          onChange={({ target: { value } }) =>
            SettingsStore.changeMusicVolume(+value / 100)
          }
          disabled={!SettingsStore.isMusicOn}
        />
        <Btn
          disabled={!SettingsStore.isSoundsOn}
          onClick={() => SettingsStore.switchSounds(!SettingsStore.isSoundsOn)}
        >
          <Icon.Bell color="white" />
        </Btn>
        <input
          type="range"
          value={SettingsStore.soundsVolume * 100}
          onChange={({ target: { value } }) =>
            SettingsStore.changeSoundsVolume(+value / 100)
          }
          disabled={!SettingsStore.isSoundsOn}
        />
      </div>
      <div className="ui__settings">
        <Btn onClick={() => SettingsStore.changeStatus('settings')}>
          <Icon.Settings color="white" />
        </Btn>
        <Btn onClick={() => {}}>
          <Icon.List color="white" />
        </Btn>
        <Btn onClick={() => GridStore.init()}>
          <Icon.RefreshCw color="white" />
        </Btn>
      </div>
    </>
  );
};

export default observer(Ui);
