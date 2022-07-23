import { useContext } from 'react'
import styles from './VoteBoard.module.css'
import { Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { VOTE_LOG } from '../types';
import { PlayersContext, VoteLogsContext } from '../../utils/AnalysisContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { votesDeleteRequest } from '../../utils/ApiFetch'
import { AxiosResponse } from 'axios'

const avatar = {
  width: 40,
  height: 40
}

interface VoteProps {
  vote: VOTE_LOG
}

const VoteBoardAvatar = (props: VoteProps) => {
  const players = useContext(PlayersContext)
  const { voteLogs, setVoteLogs } = useContext(VoteLogsContext) 

  const deleteAction = () => {
    votesDeleteRequest(props.vote.id).then((res: AxiosResponse<VOTE_LOG>) => {
      setVoteLogs(voteLogs.filter(vote => vote.id !== res.data.id))
    })
  }

  let playerName = null
  players === []
    ? playerName = null
    : playerName = players.filter((player) => String(player.id) === String(props.vote.voter_id))[0].player_name
  console.log('これ',playerName)

  return (
    <div className={styles.vote__vote_log}>
      <div className={styles.vote__avatar}>
        <Avatar sx={avatar}/>
        <div className={styles.vote__avatar_name}>
          {players === []
            ? <></>
            : players.filter((player) => String(player.id) === String(props.vote.voter_id))[0].player_name
          }
        </div>
      </div>
      <div className={styles.vote__send_icon}>
        <SendIcon />
      </div>
      <div className={styles.vote__avatar}>
        <Avatar sx={avatar}/>
        <div className={styles.vote__avatar_name}>
          {players === []
            ? <></>
            : players.filter((player) => String(player.id) === String(props.vote.voted_id))[0].player_name
          }
        </div>
      </div>
      <div className={styles.vote__delete_icon}>
        <DeleteOutlineIcon sx={{color: 'white'}} onClick={deleteAction} />
      </div>
    </div>
  )
}

export default VoteBoardAvatar