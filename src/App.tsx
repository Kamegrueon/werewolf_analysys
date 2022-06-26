import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { GameSelectContext } from './utils/AnalysisContext';
import { useState, useEffect } from 'react'
import { DateProgressesContext } from './utils/AnalysisContext';
import { dailiesIndexRequest } from "./utils/ApiFetch";

const App: React.FC = () =>  {

  const [gameSelect, setGameSelect] = useState('')
  const [dateProgresses, setDateProgresses] = useState<string[]>([])
  
  useEffect(() => {
    dailiesIndexRequest(gameSelect).then((res: any) => {
      setDateProgresses([...Array(res.data.length)].map((_, i) => String(i + 1)))
    })
  },[gameSelect])

  return (
    <Router>
      <GameSelectContext.Provider value={{gameSelect, setGameSelect}}>
      <DateProgressesContext.Provider value={dateProgresses}>
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
        </DateProgressesContext.Provider>
      </GameSelectContext.Provider>
    </Router>
  );
}

export default App;
