import { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import RootStore from '../stores/root-store';
import music from '../sounds/music.mp3';

const Music = () => {
  const { SettingsStore } = RootStore;
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
    <audio autoPlay loop ref={musicRef} src={music}>
      <track kind="captions" />
    </audio>
  );
};

export default observer(Music);
