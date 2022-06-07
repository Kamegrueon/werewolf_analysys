import React from 'react';
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisParticipant from './components/player_bord/PlayerBordMain';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';

const App: React.FC = () =>  {
  
  return (
    <div className={styles.app__root}>
      <AnalysisLeftBar />
      <div className={styles.app__main}>
        <AnalysisHeader />
        <AnalysisParticipant />
      </div>
    </div>
  );
}

export default App;
