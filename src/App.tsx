import { useState, useEffect, useRef } from 'react'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameBoard } from "./components/pages/GameBoard";
import GameMain from "./components/pages/GameMain";

import { RerenderContext } from './utils/AnalysisContext';
import { useSelector, useDispatch } from "react-redux";
import { selectGameId, fetchAsyncGetRolls, resetGameState } from "./reducers/gameSlice";
import { fetchAsyncGetPlayers, fetchAsyncGetAbilityLogs, selectPlayerDate, fetchAsyncGetCOD, resetPlayerState, fetchAsyncGetDailies } from './reducers/playerSlice';
import { AppDispatch } from './store';
import { fetchAsyncGetVotes, resetVoteState, selectVoteDate } from './reducers/voteSlice';

const App: React.FC = () =>  {

  const [renderState, rerender] = useState<number>(0);

  const gameId = useSelector(selectGameId)
  const playerDate = useSelector(selectPlayerDate)
  const voteDate = useSelector(selectVoteDate)
  const dispatch: AppDispatch = useDispatch()

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])
  
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      const fetchBootLoader = async () => {
        await dispatch(fetchAsyncGetDailies(gameId))
        await dispatch(fetchAsyncGetPlayers({gameId: gameId, dateProgress: playerDate}))
        await dispatch(fetchAsyncGetRolls(gameId));
        await dispatch(fetchAsyncGetAbilityLogs({gameId: gameId, dateProgress: playerDate}))
        await dispatch(fetchAsyncGetVotes({gameId: gameId, dateProgress: voteDate}))
        await dispatch(fetchAsyncGetCOD({gameId: gameId, dateProgress: voteDate}))
      }
      fetchBootLoader();

      return () => { 
        dispatch(resetGameState())
        dispatch(resetPlayerState())
        dispatch(resetVoteState())
        console.log('Appがアンマウントされた')
      };
    }
  },[gameId, playerDate, renderState,voteDate, dispatch])

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