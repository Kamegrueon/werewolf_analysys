import { useState, useEffect, useRef } from 'react'
import { AxiosResponse } from 'axios'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { CastingsContext, GameSelectContext } from './utils/AnalysisContext';
import { dailiesIndexRequest, playersIndexRequest, votesIndexRequest, rollIndexRequest } from "./utils/ApiFetch";
import { PLAYER, DAILIES, ROLE_STATE, VOTE_LOG, CASTING } from "./components/types";
import { 
  DailiesContext, 
  PlayersContext, 
  RolesContext, 
  SelectPlayerBoardDateContext, 
  SelectVoteBoardDateContext, 
  VoteLogsContext,
} from './utils/AnalysisContext';

const App: React.FC = () =>  {

  const [gameSelect, setGameSelect] = useState<string>('')
  const [selectPlayerDate, setSelectPlayerDate] = useState<string>('1')
  const [selectVoteDate, setSelectVoteDate] = useState<string>('1')
  const [rolesState, setRolesState] = useState<ROLE_STATE[]>([{id: '1', role_name: '人狼'}])
  const [dailies, setDailies] = useState<DAILIES[]>([{id: '1',game_id: '1', date_progress: 1}])
  const [players, setPlayers] = useState<PLAYER[]>([])
  const [voteLogs, setVoteLogs] = useState<VOTE_LOG[]>([])
  const [castings, setCastings] = useState<CASTING[]>([])
  // const [isExistReport, setIsExistReport] = useState(false)

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])
  
  useEffect(() => {
    let ignore = false;
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      dailiesIndexRequest(gameSelect).then((res: AxiosResponse<DAILIES[]>) => {
        console.log('dailiesIndex',res.data)
        if (!ignore) setDailies(res.data)
        votesIndexRequest(res.data.filter((daily: DAILIES) => String(daily.date_progress) === String(selectVoteDate))[0].id).then((res: AxiosResponse<VOTE_LOG[]>) => {
          console.log('votesIndex', res.data)
          if (!ignore) setVoteLogs(res.data)
        })
      })
      playersIndexRequest(gameSelect, selectPlayerDate).then((res: AxiosResponse<PLAYER[]>) => {
        console.log('playersIndex',res.data)
        if (!ignore) setPlayers(res.data)
      })
      rollIndexRequest(gameSelect).then((res: AxiosResponse) => {
        console.log('rolls',res.data)
        if (!ignore) setCastings(res.data)
      })
    return () => { 
      ignore = true
      setVoteLogs([]);
      setPlayers([]);
      setCastings([]);
      // setDailies([{id: '1',game_id: '1', date_progress: 1}]);
    };
    }
  },[gameSelect, selectPlayerDate, selectVoteDate])

  return (
    <Router>
      <GameSelectContext.Provider value={{gameSelect, setGameSelect}}>
      <DailiesContext.Provider value={dailies}>
      <PlayersContext.Provider value={players}>
      <VoteLogsContext.Provider value={{voteLogs, setVoteLogs}}>
      <RolesContext.Provider value={{rolesState, setRolesState}}>
      <CastingsContext.Provider value={castings}>
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
      </CastingsContext.Provider>
      </RolesContext.Provider>
      </VoteLogsContext.Provider>
      </PlayersContext.Provider>
      </DailiesContext.Provider>
      </GameSelectContext.Provider>
    </Router>
  );
}

export default App;
