import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'
import VoteForm from './VoteForm';
import { useSelector } from 'react-redux';
import { selectIsOpenVoteForm, selectVoteLogs } from '../../reducers/voteSlice';
import { selectPlayers } from '../../reducers/playerSlice';


const VoteBoardVoteList = () => {
  const voteLogs = useSelector(selectVoteLogs)
  const players = useSelector(selectPlayers)
  const isOpenVoteForm = useSelector(selectIsOpenVoteForm)

  return (
    <div>
      <div className={styles.vote__voted}>
        {isOpenVoteForm && players[0].id !== '' && voteLogs.length && voteLogs[0].id !== '' 
          ? <VoteForm />
          : <></>
        }
        {players[0].id !== '' && voteLogs.length && voteLogs[0].id !== '' 
          ? voteLogs.map((vote) => (
            <VoteBoardAvatar 
              voteId={vote.id}
              voterPlayer={players.filter((player) => String(player.id) === String(vote.voter_id))[0]} 
              votedPlayer={players.filter((player) => String(player.id) === String(vote.voted_id))[0]} 
              key={vote.id}/>
          ))
          : <></>
        }
      </div>
  </div>
  )
}

export default VoteBoardVoteList