import React, { useState } from 'react'
import styles from './PlayerBord.module.css'
import PlayerBordAvatar from './PlayerBordAvatar'
import PlayerBordDailyReport from './PlayerBordDailyReport'

const players = [
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  { name:"Kengo", avatar:'../../static/images/Bitmap.png'}
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