import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-feather';

import RootStore from '../../stores/root-store';
import Btn from '../Btn';
import YoutTube from '../../images/YouTube.svg';

import './ui.scss';

const fullscreen = () => {
  const isInFullScreen =
    document.fullscreenElement && document.fullscreenElement !== null;

  const docElm = document.documentElement;
  if (!isInFullScreen) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

const Ui: React.FC = () => {
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;

  return (
    <>
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
      <div className="ui__hotkeys">
        <div className="ui__hotkeys--bold">Горячие клавиши:</div>
        <div className="hotkeys-table">
          <div>
            <span>Shift</span> + <span>N</span>
          </div>
          <div>Новая игра</div>
          <div>
            <span>Shift</span> + <span>M</span>
          </div>
          <div>Выключить звуки</div>
          <div>
            <span>Shift</span> + <span>S</span>
          </div>
          <div>Настройки</div>
          <div>
            <span>Shift</span> + <span>L</span>
          </div>
          <div>Статистика</div>
          <div>
            <span>Shift</span> + <span>F</span>
          </div>
          <div>Полноэкранный режим</div>
          <div>
            <span>Esc</span>
          </div>
          <div>Выход из полноэкранного режима</div>
        </div>
      </div>
      <div className="ui__settings">
        <Btn onClick={() => GridStore.init()}>
          <Icon.File color="white" />
        </Btn>
        <NavLink to="/stats">
          <Btn>
            <Icon.List color="white" />
          </Btn>
        </NavLink>
        <NavLink to="/settings">
          <Btn>
            <Icon.Settings color="white" />
          </Btn>
        </NavLink>
        <Btn
          onClick={() => {
            GridStore.init();
            GridStore.autoPlay();
          }}
        >
          <Icon.Play color="white" />
        </Btn>
        <Btn onClick={fullscreen}>
          <Icon.Monitor color="white" />
        </Btn>
        <a href="https://youtu.be/sXP45gxqu1A" target="_blank" rel="noreferrer">
          <Btn>
            <img src={YoutTube} alt="YouTube" />
          </Btn>
        </a>
      </div>
    </>
  );
};

export default observer(Ui);
