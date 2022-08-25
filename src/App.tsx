import { useState, useEffect, useRef } from 'react'
// import { AxiosResponse } from 'axios'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";
// import { VOTE_LOG } from "./components/types";
import { 
  // dailiesIndexRequest, 
  // playersIndexRequest, 
  // votesIndexRequest, 
  // comingOutIndexRequest
} from "./utils/ApiFetch";
import { 
  // DailiesContext, 
  // PlayersContext, 
  // SelectPlayerBoardDateContext, 
  // SelectVoteBoardDateContext, 
  // VoteLogsContext,
  RerenderContext,
  // AbilityLogsContext,
} from './utils/AnalysisContext';

import { useSelector, useDispatch } from "react-redux";
import { selectGameId, fetchAsyncGetRolls, selectDailies } from "./reducers/gameSlice";
import { fetchAsyncGetPlayers, fetchAsyncGetComingOuts, selectPlayerDate } from './reducers/playerSlice';
import { AppDispatch } from './store';
import { fetchAsyncGetVotes, selectVoteDate } from './reducers/voteSlice';

const App: React.FC = () =>  {

  // dailiesSliceに移行
  // const [selectPlayerDate, setSelectPlayerDate] = useState<string>('1')
  // const [players, setPlayers] = useState<PLAYER[]>([])
  // const [abilityLogs, setAbilityLogs] = useState<ABILITY_LOG[]>([])

  // const [selectVoteDate, setSelectVoteDate] = useState<string>('1')
  // const [dailies, setDailies] = useState<DAILIES[]>([{id: '1',game_id: '1', date_progress: 1}])
  // const [voteLogs, setVoteLogs] = useState<VOTE_LOG[]>([])

  const [renderState, rerender] = useState<number>(0);

  // ここから
  const gameId = useSelector(selectGameId)
  const playerDate = useSelector(selectPlayerDate)
  const voteDate = useSelector(selectVoteDate)
  const dailies = useSelector(selectDailies)
  const dispatch: AppDispatch = useDispatch()
  // ここまで

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])
  
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      const fetchBootLoader = async () => {
        await dispatch(fetchAsyncGetPlayers({gameId: gameId, dateProgress: playerDate}))
        await dispatch(fetchAsyncGetRolls(gameId));
        await dispatch(fetchAsyncGetComingOuts({gameId: gameId, dateProgress: playerDate}))
        await dispatch(fetchAsyncGetVotes({gameId: gameId, dateProgress: playerDate}))
      }
      fetchBootLoader();

      return () => { 
        console.log('アンマウントされた')
      };
    }
  },[gameId, playerDate,dailies, renderState,voteDate, dispatch])

  return (
    <Router>
      <RerenderContext.Provider value={{renderState, rerender}}>
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
      </RerenderContext.Provider>
    </Router>
  );
}

export default App;