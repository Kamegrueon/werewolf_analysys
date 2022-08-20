import { useState, useEffect, useRef } from 'react'
import { AxiosResponse } from 'axios'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
import { filteringDailyId } from './utils/UtilsFC';
import { DAILIES, VOTE_LOG } from "./components/types";
import { 
  dailiesIndexRequest, 
  // playersIndexRequest, 
  votesIndexRequest, 
  // comingOutIndexRequest
} from "./utils/ApiFetch";
import { 
  DailiesContext, 
  // PlayersContext, 
  // SelectPlayerBoardDateContext, 
  SelectVoteBoardDateContext, 
  VoteLogsContext,
  RerenderContext,
  // AbilityLogsContext,
} from './utils/AnalysisContext';

import { useSelector, useDispatch } from "react-redux";
import { selectGameId, fetchAsyncGetRolls } from "./reducers/gameSlice";
import { fetchAsyncGetPlayers, fetchAsyncGetComingOuts, selectPlayerDate } from './reducers/playerSlice';
import { AppDispatch } from './store';

const App: React.FC = () =>  {

  // dailiesSliceに移行
  // const [selectPlayerDate, setSelectPlayerDate] = useState<string>('1')
  // const [players, setPlayers] = useState<PLAYER[]>([])
  // const [abilityLogs, setAbilityLogs] = useState<ABILITY_LOG[]>([])

  const [selectVoteDate, setSelectVoteDate] = useState<string>('1')
  const [dailies, setDailies] = useState<DAILIES[]>([{id: '1',game_id: '1', date_progress: 1}])
  const [voteLogs, setVoteLogs] = useState<VOTE_LOG[]>([])

  const [renderState, rerender] = useState<number>(0);

  // ここから
  const gameId = useSelector(selectGameId)
  const playerDate = useSelector(selectPlayerDate)
  const dispatch: AppDispatch = useDispatch()
  // ここまで

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])
  
  useEffect(() => {
    let ignore = false;
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      dailiesIndexRequest(gameId).then((res: AxiosResponse<DAILIES[]>) => {
        console.log('dailiesIndex',res.data)
        if (!ignore) setDailies(res.data)
        votesIndexRequest(filteringDailyId(res.data, selectVoteDate))
        .then((res: AxiosResponse<VOTE_LOG[]>) => {
          console.log('votesIndex', res.data)
          if (!ignore) setVoteLogs(res.data)
        })
      })
      // playersIndexRequest(gameId, selectPlayerDate)
      // .then((res: AxiosResponse<PLAYER[]>) => {
      //   console.log('playersIndex',res.data)
      //   if (!ignore) setPlayers(res.data)
      // })
      const fetchBootLoader = async () => {
        await dispatch(fetchAsyncGetPlayers({gameId: gameId, dateProgress: playerDate}))
        await dispatch(fetchAsyncGetRolls(gameId));
        await dispatch(fetchAsyncGetComingOuts({gameId: gameId, dateProgress: playerDate}))
      }
      fetchBootLoader();
      // comingOutIndexRequest(gameId, playerDate)
      // .then((res: AxiosResponse) => {
      //   console.log('abilityLogs', res.data)
      //   if (!ignore) setAbilityLogs(res.data)
      // })
      return () => { 
        ignore = true
        setVoteLogs([]);
        console.log('アンマウントされた')
        // setPlayers([]);
        // setCastings([]);
        // setAbilityLogs([]);
      };
    }
  },[gameId, playerDate, selectVoteDate, renderState, dispatch])

  return (
    <Router>
      <RerenderContext.Provider value={{renderState, rerender}}>
      <DailiesContext.Provider value={dailies}>
      <VoteLogsContext.Provider value={{voteLogs, setVoteLogs}}>
      <SelectVoteBoardDateContext.Provider value={{selectVoteDate, setSelectVoteDate}}>
      {/* <AbilityLogsContext.Provider value={{abilityLogs, setAbilityLogs}} > */}
        <div className={styles.app__root}>
          <AnalysisLeftBar />
          <div className={styles.app__main}>
            <AnalysisHeader />
            <Switch>
              <Route exact path='/games/'>
                <GameMain />
              </Route>
              <Route exact path={`/board/`}>
                <GameBoard />
              </Route>
              <Route component={() => <h1 style={{color: 'white', position: 'absolute', top: 350, left: 600}}>404 NOT FOUND</h1>} />
            </Switch>
          </div>
        </div>
      {/* </AbilityLogsContext.Provider> */}
      </SelectVoteBoardDateContext.Provider>
      </VoteLogsContext.Provider>
      </DailiesContext.Provider>
      </RerenderContext.Provider>
    </Router>
  );
}

export default App;