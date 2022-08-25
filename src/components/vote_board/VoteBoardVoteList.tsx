import { useContext } from 'react'
import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'

import VoteForm from './VoteForm';

// import { VoteLogsContext } from '../../utils/AnalysisContext';
import { VoteFormContext } from '../../utils/AnalysisContext';
import { useSelector } from 'react-redux';
import { selectVoteLogs } from '../../reducers/voteSlice';
import { selectPlayers } from '../../reducers/playerSlice';


const VoteBoardVoteList = () => {
  // const { voteLogs } = useContext(VoteLogsContext)
  const voteLogs = useSelector(selectVoteLogs)
  const players = useSelector(selectPlayers)
  const { isOpenForm } = useContext(VoteFormContext)

  return (
    <div>
      <div className={styles.vote__voted}>
        {isOpenForm 
          ? <VoteForm />
          : null
        }
        {voteLogs[0].id !== '' && players[0].id !== ''
          ? voteLogs.map((vote) => (
            <VoteBoardAvatar 
              voteId={vote.id}
              voterPlayer={players.filter((player) => String(player.id) === String(vote.voter_id))[0]} 
              votedPlayer={players.filter((player) => String(player.id) === String(vote.voted_id))[0]} 
              key={vote.id}/>
          ))
          : null
        }
      </div>
  </div>
  )
}

export default VoteBoardVoteList