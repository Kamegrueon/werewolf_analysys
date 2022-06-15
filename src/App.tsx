import React from 'react';
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import PlayerBoard from './components/player_board/PlayerBoard';
import DailyContext from './components/contexts/DailyContext';
import VoteBoard from './components/vote_board/VoteBoard';

// axiosでバックエンドから取得しuseEffectで更新
const Dailies:number[] = [1,2,3,4,5,6]

const App: React.FC = () =>  {
  return (
    <div className={styles.app__root}>
      <AnalysisLeftBar />
      <div className={styles.app__main}>
        <AnalysisHeader />

    <DailyContext.Provider value={Dailies}>
        <PlayerBoard />
        <div className={styles.app__bottom}>
          <VoteBoard />
        </div>
    </DailyContext.Provider>
      </div>
    </div>
  );
}

export default App;
