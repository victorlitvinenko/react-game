import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import * as Icon from 'react-feather';

import rootStore from '../../stores/root-store';
import settingsStore from '../../stores/settings/settings-store';
import Btn from '../Btn';

import './settings.scss';

const Settings: React.FC = () => {
  const history = useHistory();

  const [gridSize] = useState(settingsStore.gridSize);
  const [cubesCount] = useState(settingsStore.cubesCount);

  const applyChanges = () => {
    if (
      settingsStore.gridSize !== gridSize ||
      settingsStore.cubesCount !== cubesCount
    ) {
      rootStore.DataStore.GridStore.init();
    }
    history.push('/');
  };

  useHotkeys('esc', () => {
    history.push('/');
  });

  return (
    <div className="settings">
      <div className="settings__ui">
        <Btn onClick={applyChanges}>
          <Icon.ArrowLeft color="white" />
        </Btn>
      </div>
      <div className="settings__title">Настройки</div>
      <div className="settings__body">
        <div>Ширина поля:</div>
        <input
          type="number"
          min={3}
          max={6}
          value={settingsStore.gridSize}
          onChange={({ target: { value } }) =>
            settingsStore.changeGridSize(+value)
          }
        />
        <div>Количество фигур:</div>
        <input
          type="number"
          value={settingsStore.cubesCount}
          onChange={({ target: { value } }) =>
            settingsStore.changeCubesCount(+value)
          }
          min={2}
        />
        <div>Цвет поля:</div>
        <input
          type="color"
          value={settingsStore.boardColor}
          onChange={({ target: { value } }) => settingsStore.changeColor(value)}
        />
        <div />
      </div>
    </div>
  );
};

export default observer(Settings);
