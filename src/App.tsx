import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import PlayerBoard from './components/player_board/PlayerBoard';
import VoteBoard from './components/vote_board/VoteBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App: React.FC = () =>  {

  return (
    <Router>
      <div className={styles.app__root}>
        <AnalysisLeftBar />
        <div className={styles.app__main}>
          <Switch>
            <Route exact path='/'>
              <AnalysisHeader />
              <PlayerBoard />
              <div className={styles.app__bottom}>
                <VoteBoard />
              </div>
            </Route>
            {/* <Route path='/practice'>
              <PracticeMain />
            </Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
