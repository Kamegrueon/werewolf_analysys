import React, { useState } from 'react'
import styles from './PlayerBord.module.css'
import PlayerBordAvatar from './PlayerBordAvatar'
import PlayerBordDailyReport from './PlayerBordDailyReport'

interface Avatar {
  name: string | null
  cause_of_death: ('perished' | 'executed' | 'murdered' | 'alive')
  avatar: string
  dead_style: {opacity: number}
}

const players:Avatar[] = [
  { name:"Kengo", cause_of_death:'murdered', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  { name:"Kengo", cause_of_death:'executed', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  { name:"Kengo", cause_of_death:'perished', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  { name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 1.0}},
  { name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 1.0}},
  { name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 1.0}},
  { name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 1.0}},
  { name:"Kengo", cause_of_death:'murdered', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  { name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 1.0}},
  { name:"Kengo", cause_of_death:'executed', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}},
  { name:"Kengo", cause_of_death:'alive', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 1.0}},
  { name:"Kengo", cause_of_death:'executed', avatar:'../../static/images/Bitmap.png', dead_style:{opacity: 0.5}}
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
      <div className={styles.player__main_bord}>
        <PlayerBordAvatar players={players}/>
        <PlayerBordDailyReport date_progresses={date_progress}/>
      </div>
    </div>
  )
}

export default PlayerBordMain