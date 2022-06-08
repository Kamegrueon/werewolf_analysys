import React from 'react';
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import PlayerContext from './components/contexts/PlayerContext';
import PlayerBoard from './components/player_board/PlayerBoard';
import Player from './components/player_board/Player';

const App: React.FC = () =>  {
  return (
    <div className={styles.app__root}>
      <AnalysisLeftBar />
      <div className={styles.app__main}>
        <AnalysisHeader />
        <PlayerContext.Provider value={Player}>
          <PlayerBoard />
        </PlayerContext.Provider>
      </div>
    </div>
  );
}

export default App;
