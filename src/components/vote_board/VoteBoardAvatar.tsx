import styles from './VoteBoard.module.css'
import SendIcon from '@mui/icons-material/Send';
import { PLAYER } from '../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ShortRollName } from '../../utils/PlayerProcessing';
import { useDispatch } from 'react-redux';
import { fetchAsyncDeleteVotes } from '../../reducers/voteSlice';
import { AppDispatch } from '../../store';

interface VoteProps {
  voteId: string
  voterPlayer: PLAYER
  votedPlayer: PLAYER
}

const VoteBoardAvatar: React.FC<VoteProps> = ({ voteId, votedPlayer, voterPlayer }) => {
  const dispatch: AppDispatch = useDispatch()

  const deleteAction = () => {
    dispatch(fetchAsyncDeleteVotes(voteId))
  }
  
  return (
            <div className={styles.vote__vote_log}>
              <div className={styles.vote__avatar}>
              <div className={styles.vote__avatar_position} style={{borderColor: voterPlayer.roll_color, color: voterPlayer.roll_color}}>{ShortRollName(voterPlayer)}</div>
                <div className={styles.vote__avatar_name}>
                  {voterPlayer.player_name}
                </div>
              </div>
              <div className={styles.vote__send_icon}>
                <SendIcon />
              </div>
              <div className={styles.vote__avatar}>
                <div className={styles.vote__avatar_position} style={{borderColor: votedPlayer.roll_color, color: votedPlayer.roll_color}}>{ShortRollName(votedPlayer)}</div>
                <div className={styles.vote__avatar_name}>
                  {votedPlayer.player_name}
                </div>
              </div>
              <div className={styles.vote__delete_icon}>
                <DeleteOutlineIcon sx={{color: 'white'}} onClick={deleteAction} />
              </div>
            </div>
  )
}

export default VoteBoardAvatar