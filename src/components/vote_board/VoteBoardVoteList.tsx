import React, { useContext } from 'react'
import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'

import VoteContext from '../contexts/VoteContext';


const VoteBoardVoteList = () => {
  const VoteList = useContext(VoteContext)

  return (
    <>
      <div className={styles.vote__voted}>
        {VoteList.map((vote) => (    
          <VoteBoardAvatar vote={vote} key={vote.vote_id}/>        
        ))}
      </div>
  </>
  )
}

export default VoteBoardVoteList