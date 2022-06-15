import React from 'react';
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import PlayerBoard from './components/player_board/PlayerBoard';
import DailyContext from './components/contexts/DailyContext';
import VoteBoard from './components/vote_board/VoteBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Utils from '../src/utils/Utils'

// axiosでバックエンドから取得しuseEffectで更新
const Dailies:number[] = [1,2,3,4,5,6]

const App: React.FC = () =>  {
  return (
    <Router>
      <div className={styles.app__root}>
        <AnalysisLeftBar />
        <div className={styles.app__main}>
          <Switch>
            <Route exact path='/'>
              <DailyContext.Provider value={Dailies}>
                <AnalysisHeader />
                <PlayerBoard />
                <div className={styles.app__bottom}>
                  <VoteBoard />
                </div>
              </DailyContext.Provider>
            </Route>
            <Route path='/utils'>
              <Utils />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
