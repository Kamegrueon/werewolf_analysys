import { useState, useEffect, useRef, useContext  } from 'react'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { GameSelectContext } from './utils/AnalysisContext';
import { DailiesContext, PlayersContext, RolesContext, SelectPlayerBoardDateContext, SelectVoteBoardDateContext } from './utils/AnalysisContext';
import { dailiesIndexRequest, playersIndexRequest } from "./utils/ApiFetch";
import { AVATAR, DAILIES, ROLE_STATE } from "./components/types";

const App: React.FC = () =>  {

  const [gameSelect, setGameSelect] = useState('')
  const [selectPlayerDate, setSelectPlayerDate] = useState('1')
  const [selectVoteDate, setSelectVoteDate] = useState('1')
  const [rolesState, setRolesState] = useState<ROLE_STATE[]>([{id: '1', role_name: '人狼'}])
  const [dailies, setDailies] = useState<DAILIES[]>([{id: '1', date_progress: 1}])
  const [players, setPlayers] = useState<AVATAR[]>([{id: '1', player_name:"", position:'',position_order: 1, cause_of_death:'', date_of_death: 0}])

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])
  
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      dailiesIndexRequest(gameSelect).then((res: any) => {
        // setDateProgresses([...Array(res.data.length)].map((_, i) => String(i + 1)))
        console.log('dailiesIndex',res.data)
        setDailies(res.data)
      })
      playersIndexRequest(gameSelect, selectPlayerDate).then((res: any) => {
        console.log('playersIndex',res.data)
        setPlayers(res.data)
      })
    }
  },[gameSelect, selectPlayerDate])

  return (
    <Router>
      <GameSelectContext.Provider value={{gameSelect, setGameSelect}}>
      <DailiesContext.Provider value={dailies}>
      <PlayersContext.Provider value={players}>
      <RolesContext.Provider value={{rolesState, setRolesState}}>
      <SelectPlayerBoardDateContext.Provider value={{selectPlayerDate, setSelectPlayerDate}}>
      <SelectVoteBoardDateContext.Provider value={{selectVoteDate, setSelectVoteDate}}>
        <div className={styles.app__root}>
          <AnalysisLeftBar />
          <div className={styles.app__main}>
            <AnalysisHeader />
            <Switch>
              <Route exact path='/games/'>
                <GameMain />
              </Route>
              <Route exact path={`/games/${gameSelect}`}>
                <GameBoard />
              </Route>
              <Route component={() => <h1 style={{color: 'white', position: 'absolute', top: 350, left: 600}}>404 NOT FOUND</h1>} />
            </Switch>
          </div>
        </div>
      </SelectVoteBoardDateContext.Provider>
      </SelectPlayerBoardDateContext.Provider>
      </RolesContext.Provider>
      </PlayersContext.Provider>
      </DailiesContext.Provider>
      </GameSelectContext.Provider>
    </Router>
  );
}

export default App;
