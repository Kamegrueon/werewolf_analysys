import { useState, useEffect } from 'react'
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { GameBoard } from "./components/pages/GameBoard";
// import GameMain from "./components/pages/GameMain";
import { SnackbarProvider } from 'notistack';

import SignUp from './components/pages/SignUp';

import { RerenderContext } from './utils/AnalysisContext';
import { useSelector, useDispatch } from "react-redux";
import { selectGameId, fetchAsyncGetRolls, resetGameState } from "./reducers/gameSlice";
import { fetchAsyncGetPlayers, fetchAsyncGetAbilityLogs, selectPlayerDate, fetchAsyncGetCOD, resetPlayerState, fetchAsyncGetDailies } from './reducers/playerSlice';
import { AppDispatch } from './store';
import { fetchAsyncGetVotes, resetVoteState, selectVoteDate } from './reducers/voteSlice';

import { getCurrentUser } from './reducers/userSlice';
import Cookies from 'js-cookie';
import SignIn from './components/pages/SignIn';
import AuthenticatedGuard from './lib/router/AuthenticatedGuard';
import AuthenticatedRoute from './lib/router/AuthenticatedRoute';

const App: React.FC = () =>  {

  const [renderState, rerender] = useState<number>(0);

  const dispatch: AppDispatch = useDispatch()
  const gameId = useSelector(selectGameId)
  const playerDate = useSelector(selectPlayerDate)
  const voteDate = useSelector(selectVoteDate)

  // const [loading, setLoading] = useState<boolean>(true)

  // console.log('ローディング',loading)

  useEffect(() => {
    if(gameId !== '') {
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

  useEffect(()=> {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
    dispatch(getCurrentUser())
  },[dispatch])

  // console.log(Cookies.get("_access_token"),Cookies.get("_client"),Cookies.get("_uid"))

  return (
    <Router>
      <SnackbarProvider>
      <RerenderContext.Provider value={{renderState, rerender}}>
        <div className={styles.app__root}>
          <AnalysisLeftBar />
          <div className={styles.app__main}>
            <AnalysisHeader />
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <AuthenticatedGuard>
                <AuthenticatedRoute />
              </AuthenticatedGuard>
              <Route component={() => <h1 style={{color: 'white', position: 'absolute', top: 350, left: 600}}>404 NOT FOUND</h1>} />
            </Switch>
          </div>
        </div>
      </RerenderContext.Provider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;