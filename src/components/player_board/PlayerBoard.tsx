import React from 'react'
import styles from './PlayerBoard.module.css'
import PlayerBoardAvatar from './PlayerBoardAvatar'
import PlayerBoardDailyReport from './PlayerBoardDailyReport'

const date_progress: number[] = [1,2,3,4,5,6,7,8]

const PlayerBoard: React.FC = () => {
  return (
    <div className={styles.player__main}>
      <div className={styles.player__above_bar}>
        <div className={styles.player__title}>
          Players
        </div>
      </div>
      <div className={styles.player__board_main}>
        <PlayerBoardAvatar />
        <PlayerBoardDailyReport />
      </div>
    </div>
  )
}

export default PlayerBoard