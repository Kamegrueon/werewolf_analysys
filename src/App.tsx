import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { GameSelectContext } from './utils/AnalysisContext';
import { useState, useEffect } from 'react'
import { DateProgressesContext, PlayersContext } from './utils/AnalysisContext';
import { dailiesIndexRequest, playersIndexRequest } from "./utils/ApiFetch";
import { AVATAR } from "./components/types";
// import { SelectPlayerBoardDateContext } from "./components/providers/SelectPlayerBoardDateProvider";

const App: React.FC = () =>  {

  const [gameSelect, setGameSelect] = useState('')
  const [dateProgresses, setDateProgresses] = useState<string[]>([])
  const [players, setPlayers] = useState<AVATAR[]>([{id: 1, player_name:"", position:'',position_order: 1, cause_of_death:'', date_of_death: 0}])
  // const { selectPlayerDate } = useContext(SelectPlayerBoardDateContext)
  
  useEffect(() => {
    dailiesIndexRequest(gameSelect).then((res: any) => {
      setDateProgresses([...Array(res.data.length)].map((_, i) => String(i + 1)))
    })
  },[gameSelect])

  // playerの情報を取得
  useEffect(() => {
    playersIndexRequest(gameSelect).then((res: any) => {
      setPlayers(res.data)
    })
  },[gameSelect])

  return (
    <Router>
      <GameSelectContext.Provider value={{gameSelect, setGameSelect}}>
      <DateProgressesContext.Provider value={dateProgresses}>
      <PlayersContext.Provider value={players}>
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
      </PlayersContext.Provider>
      </DateProgressesContext.Provider>
      </GameSelectContext.Provider>
    </Router>
  );
}

export default App;
