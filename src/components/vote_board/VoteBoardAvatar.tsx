import React from 'react'
import styles from './VoteBoard.module.css'
import { Avatar } from '@mui/material'

const avatar = {
  width: 40,
  height: 40
}

const VoteBoardAvatar = () => {
  return (
    <div className={styles.vote__avatar}>
      <Avatar sx={avatar}/>
      <div className={styles.vote__avatar_name}>
        PlayerName
      </div>
    </div>
  )
}

export default VoteBoardAvatar