import React, { useContext } from 'react'
import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'

import VoteForm from './VoteForm';

import VoteContext from '../contexts/VoteContext';

const VoteBoardVoteList = (props: any) => {
  const VoteList = useContext(VoteContext)

  return (
    <div>
      <div className={styles.vote__voted}>
        {props.isOpenForm 
          ? (<VoteForm
              voterPlayerName={props.voterPlayerId}
              setVoterPlayerName={props.setVoterPlayerId}
              votedPlayerName={props.votedPlayerId}
              setVotedPlayerName={props.setVotedPlayerId}
            />)
          : null
        }
        {VoteList.map((vote) => (    
          <VoteBoardAvatar vote={vote} key={vote.vote_id}/>        
        ))}
      </div>
  </div>
  )
}

export default VoteBoardVoteList