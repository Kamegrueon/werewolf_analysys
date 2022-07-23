import React, { memo } from 'react'
import styles from '../../App.module.css'
import PlayerBoard from '../player_board/PlayerBoard'
import VoteBoard from '../vote_board/VoteBoard'


export const GameBoard: React.FC = memo(() => {
  return (
    <>
      <PlayerBoard />
      <div className={styles.app__bottom}>
        <VoteBoard />
      </div>
    </>
  )
})
