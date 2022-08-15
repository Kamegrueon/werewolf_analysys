import { useState, useEffect, useRef } from 'react'
import { AxiosResponse } from 'axios'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { filteringDailyId } from './utils/UtilsFC';
import { PLAYER, DAILIES, ROLL_STATE, VOTE_LOG, CASTING, ABILITY_LOG  } from "./components/types";
import { 
  dailiesIndexRequest, 
  playersIndexRequest, 
  votesIndexRequest, 
  rollIndexRequest, 
  comingOutIndexRequest
} from "./utils/ApiFetch";
import { 
  DailiesContext, 
  PlayersContext, 
  RollsContext, 
  SelectPlayerBoardDateContext, 
  SelectVoteBoardDateContext, 
  VoteLogsContext,
  CastingsContext, 
  GameSelectContext, 
  RerenderContext,
  AbilityLogsContext,
} from './utils/AnalysisContext';

const App: React.FC = () =>  {

  const [gameSelect, setGameSelect] = useState<string>('')
  const [selectPlayerDate, setSelectPlayerDate] = useState<string>('1')
  const [selectVoteDate, setSelectVoteDate] = useState<string>('1')
  const [rollsState, setRollsState] = useState<ROLL_STATE[]>([{id: '1', roll_name: '人狼'}])
  const [dailies, setDailies] = useState<DAILIES[]>([{id: '1',game_id: '1', date_progress: 1}])
  const [players, setPlayers] = useState<PLAYER[]>([])
  const [voteLogs, setVoteLogs] = useState<VOTE_LOG[]>([])
  const [castings, setCastings] = useState<CASTING[]>([])
  const [abilityLogs, setAbilityLogs] = useState<ABILITY_LOG[]>([])
  const [renderState, rerender] = useState<number>(0);

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
        votesIndexRequest(filteringDailyId(res.data, selectVoteDate))
        .then((res: AxiosResponse<VOTE_LOG[]>) => {
          console.log('votesIndex', res.data)
          if (!ignore) setVoteLogs(res.data)
        })
      })
      playersIndexRequest(gameSelect, selectPlayerDate)
      .then((res: AxiosResponse<PLAYER[]>) => {
        console.log('playersIndex',res.data)
        if (!ignore) setPlayers(res.data)
      })
      rollIndexRequest(gameSelect)
      .then((res: AxiosResponse) => {
        console.log('rolls',res.data)
        if (!ignore) setCastings(res.data)
      })
      comingOutIndexRequest(gameSelect, selectPlayerDate)
      .then((res: AxiosResponse) => {
        console.log('abilityLogs', res.data)
        if (!ignore) setAbilityLogs(res.data)
      })
      return () => { 
        ignore = true
        setVoteLogs([]);
        setPlayers([]);
        setCastings([]);
        setAbilityLogs([])
      };
    }
  },[gameSelect, selectPlayerDate, selectVoteDate, renderState])

  return (
    <Router>
      <RerenderContext.Provider value={{renderState, rerender}}>
      <GameSelectContext.Provider value={{gameSelect, setGameSelect}}>
      <DailiesContext.Provider value={dailies}>
      <PlayersContext.Provider value={players}>
      <VoteLogsContext.Provider value={{voteLogs, setVoteLogs}}>
      <RollsContext.Provider value={{rollsState, setRollsState}}>
      <CastingsContext.Provider value={castings}>
      <SelectPlayerBoardDateContext.Provider value={{selectPlayerDate, setSelectPlayerDate}}>
      <SelectVoteBoardDateContext.Provider value={{selectVoteDate, setSelectVoteDate}}>
      <AbilityLogsContext.Provider value={{abilityLogs, setAbilityLogs}} >
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
      </AbilityLogsContext.Provider>
      </SelectVoteBoardDateContext.Provider>
      </SelectPlayerBoardDateContext.Provider>
      </CastingsContext.Provider>
      </RollsContext.Provider>
      </VoteLogsContext.Provider>
      </PlayersContext.Provider>
      </DailiesContext.Provider>
      </GameSelectContext.Provider>
      </RerenderContext.Provider>
    </Router>
  );
}

export default App;