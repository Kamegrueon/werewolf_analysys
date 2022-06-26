import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { GameSelectContext } from './utils/GameSelectContext';
import { useState } from 'react'

const App: React.FC = () =>  {

  const [gameSelect, setGameSelect] = useState('')

  return (
    <Router>
      <GameSelectContext.Provider value={{gameSelect, setGameSelect}}>
        <div className={styles.app__root}>
          <AnalysisLeftBar />
          <div className={styles.app__main}>
            <AnalysisHeader />
            <Switch>
              <Route exact path='/games/'>
                <GameMain />
              </Route>
              <Route path={`/games/${gameSelect}`}>
                <GameBoard />
              </Route>
            </Switch>
          </div>
        </div>
      </GameSelectContext.Provider>
    </Router>
  );
}

export default App;
