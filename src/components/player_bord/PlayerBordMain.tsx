import React, { useState } from 'react'
import styles from './PlayerBord.module.css'
import PlayerBordAvatar from './PlayerBordAvatar'
import PlayerBordDailyReport from './PlayerBordDailyReport'
import { AVATAR } from '../types'

const players:AVATAR[] = [
  {user_id: 1, name:"Kengo", cause_of_death:'murdered', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5},},
  {user_id: 2, name:"Kengo", cause_of_death:'executed', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  {user_id: 3, name:"Kengo", cause_of_death:'perished', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  {user_id: 4, name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png'},
]


const date_progress: number[] = [1,2,3,4,5,6,7,8]

const PlayerBordMain = () => {
  return (
    <div className={styles.player__main}>
      <div className={styles.player__above_bar}>
        <div className={styles.player__title}>
          参加者
        </div>
      </div>
      <div className={styles.player__bord_main}>
        <PlayerBordAvatar players={players}/>
        <PlayerBordDailyReport date_progresses={date_progress}/>
      </div>
    </div>
  )
}

export default PlayerBordMain