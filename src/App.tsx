import React, { useState, useEffect } from 'react';
import styles from "./App.module.css"
import AnalysisHeader from './components/analysis/AnalysisHeader';
import AnalysisLeftBar from './components/analysis/AnalysisLeftBar';
import PlayerContext from './components/contexts/PlayerContext';
import PlayerBoard from './components/player_board/PlayerBoard';
import DailyContext from './components/contexts/DailyContext';
import VoteContext from './components/contexts/VoteContext';
import VoteBoard from './components/vote_board/VoteBoard';
import { AVATAR, VOTE_LOG } from './components/types'
import ApiFetch from './components/ApiFetch';

// axiosでバックエンドから取得しuseEffectで更新
const Players:AVATAR[] = [
    {user_id: 1, name:"Jon", avatar:'', position:'fortune-teller', cause_of_death:'murdered', date_of_death: 3},
    {user_id: 2, name:"Jack", avatar:'',position:'were-wolf', cause_of_death:'executed', date_of_death: 2},
    {user_id: 3, name:"Mike", avatar:'', cause_of_death:'perished', date_of_death: 2},
    {user_id: 4, name:"Noah", avatar:'../../static/images/Bitmap.png'},
    {user_id: 5, name:"Lucas", avatar:'',position:'medium'},
  ]

// axiosでバックエンドから取得しuseEffectで更新
const Dailies:number[] = [1,2,3,4,5,6]

const Votes:VOTE_LOG[] = [
  {vote_id: 1, voter_id: 1, destination_player_id: 2, date_progress: 1},
  {vote_id: 2, voter_id: 2, destination_player_id: 3, date_progress: 1},
  {vote_id: 3, voter_id: 3, destination_player_id: 2, date_progress: 1},
  {vote_id: 4, voter_id: 4, destination_player_id: 2, date_progress: 1},
  {vote_id: 5, voter_id: 5, destination_player_id: 3, date_progress: 1}
]

// interface Fetch {
//   userId: number
//   id: number
//   title: string
//   body: string
// }


const App: React.FC = () =>  {

  const [posts, setPosts] = useState([])
  const { fetchPosts } = ApiFetch()
  
  useEffect(() => {
    (async () => {
      const posts:any = await fetchPosts()
      if (posts.data.length === 0) {
        return
      }
      setPosts(posts.data)
    })()
  },[])
  console.log(posts[0])

  return (
    <div className={styles.app__root}>
      <AnalysisLeftBar />
      <div className={styles.app__main}>
        <AnalysisHeader />
    <PlayerContext.Provider value={Players}>
    <DailyContext.Provider value={Dailies}>
    <VoteContext.Provider value={Votes}>
        <PlayerBoard />
        <div className={styles.app__bottom}>
          <VoteBoard />
        </div>
    </VoteContext.Provider>
    </DailyContext.Provider>
    </PlayerContext.Provider>
      </div>
    </div>
  );
}

export default App;
