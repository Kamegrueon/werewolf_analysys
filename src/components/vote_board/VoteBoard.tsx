import React from 'react'
import SelectDaily from '../select/SelectDaily'
import styles from './VoteBoard.module.css'
import VoteBoardVoted from './VoteBoardVoted'

const VoteBoard:React.FC = () => {
  const select_days = {
    width: 90,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
  }

  return (
    <div className={styles.vote__board}>
      <div className={styles.vote__title}>Vote for</div>
      <div className={styles.vote__box}>
        <VoteBoardVoted />
        <SelectDaily select_days={select_days}/>
      </div>
    </div>
  )
}

export default VoteBoard