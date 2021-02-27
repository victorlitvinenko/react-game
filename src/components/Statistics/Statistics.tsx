import { observer } from 'mobx-react-lite';
import moment from 'moment';
import 'moment/locale/ru';
import * as Icon from 'react-feather';

import { formatDuration } from '../../libs/utils';
import settingsStore from '../../stores/settings/settings-store';
import StatisticsStore from '../../stores/statistics/statistics-store';
import Btn from '../Btn';

import './statistics.scss';

moment.locale('ru');

const Statistics: React.FC = () => {
  const applyChanges = () => {
    settingsStore.changeStatus('default');
  };

  return (
    <div className="statistics">
      <div className="statistics__ui">
        <Btn onClick={applyChanges}>
          <Icon.ArrowLeft color="white" />
        </Btn>
      </div>
      <div className="settings__title">Статистика</div>
      <table cellSpacing={0}>
        <tbody>
          {StatisticsStore.items.map((item) => (
            <tr key={item.date.toString()}>
              <td>{moment(item.date).format('LLL')}</td>
              <td>{item.moves} ходов</td>
              <td>{formatDuration(item.time)}</td>
            </tr>
          ))}
          {StatisticsStore.items.length === 0 && (
            <tr>
              <td>Нет данных</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default observer(Statistics);
