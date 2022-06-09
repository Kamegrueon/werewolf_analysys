import React from 'react'
import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'
import SendIcon from '@mui/icons-material/Send';

const VoteBoardVoted = () => {
  return (
    <div className={styles.vote__voted}>
      <VoteBoardAvatar />
      <div className={styles.vote__send_icon}>
        <SendIcon />
      </div>
      <VoteBoardAvatar />
    </div>
  )
}

export default VoteBoardVoted