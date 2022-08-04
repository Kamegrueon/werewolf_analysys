import React from 'react'
import styles from './PlayerBoard.module.css'

import PlayerBoardPlayers from './PlayerBoardAvatar'
import PlayerBoardDailyReport from './PlayerBoardDailyReport'

const PlayerBoard: React.FC = () => {

  return (
    <div className={styles.player__board}>
      <div className={styles.player__above_bar}>
        <div className={styles.player__title}>
          Players
        </div>
      </div>
      <div className={styles.player__main}>
        <PlayerBoardPlayers />
        <PlayerBoardDailyReport />
      </div>
    </div>
  )
}

export default PlayerBoard