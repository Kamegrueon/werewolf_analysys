import React, { useState, useEffect } from 'react'
import styles from './PlayerBoard.module.css'
import PlayerContext from '../contexts/PlayerContext';
import PlayerBoardAvatar from './PlayerBoardAvatar'
import PlayerBoardDailyReport from './PlayerBoardDailyReport'
import { playersRequest } from '../ApiFetch'
import { AVATAR } from '../types'

const PlayerBoard: React.FC = () => {
  const [days, setDays] = useState(1);
  const [res, setRes] = useState({body: '', id: 1, title: '', userId: 1})
  // const [res, setPlayerRes] = useState({user_id: 1, name:"", avatar:'', cause_of_death:'alive', date_of_death: 1})

  const fetch_days_props = {
    days: days,
    setDays: setDays
  } 

  useEffect(() => {
    playersRequest(days).then((res) => {
      // console.log(res.data)
      setRes(res.data)
    })
    },[days])

    // console.log(res)

  // Axiosで取得
  const Players:AVATAR[] = [
    {user_id: 1, name:"Jon", avatar:'', position:'fortune-teller', cause_of_death:'murdered', date_of_death: 3},
    {user_id: 2, name:"Jack", avatar:'',position:'were-wolf', cause_of_death:'executed', date_of_death: 2},
    {user_id: 3, name:"Mike", avatar:'', cause_of_death:'perished', date_of_death: 2},
    {user_id: 4, name:"Noah", avatar:'../../static/images/Bitmap.png'},
    {user_id: 5, name:"Lucas", avatar:'',position:'medium'},
  ]

  return (
    <PlayerContext.Provider value={Players}>
      <div className={styles.player__board}>
        <div className={styles.player__above_bar}>
          <div className={styles.player__title}>
            Players
          </div>
        </div>
        <div className={styles.player__main}>
          <PlayerBoardAvatar />
          <PlayerBoardDailyReport fetch_days_props={fetch_days_props}/>
        </div>
      </div>
    </PlayerContext.Provider>
  )
}

export default PlayerBoard