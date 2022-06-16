import { useContext } from 'react'
import styles from './VoteBoard.module.css'
import { Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { VOTE_LOG } from '../types';
import PlayerContext from '../contexts/PlayerContext';

const avatar = {
  width: 40,
  height: 40
}

interface VoteProps {
  vote: VOTE_LOG
}

const VoteBoardAvatar = (props: VoteProps) => {
  const players = useContext(PlayerContext)

  return (
    <div className={styles.vote__vote_log}>
      <div className={styles.vote__avatar}>
        <Avatar sx={avatar}/>
        <div className={styles.vote__avatar_name}>
          {players.filter((player) => player.user_id === props.vote.voter_id)[0].name}
        </div>
      </div>
      <div className={styles.vote__send_icon}>
        <SendIcon />
      </div>
      <div className={styles.vote__avatar}>
        <Avatar sx={avatar}/>
        <div className={styles.vote__avatar_name}>
          {players.filter((player) => player.user_id === props.vote.destination_player_id)[0].name}
        </div>
      </div>
    </div>
  )
}

export default VoteBoardAvatar