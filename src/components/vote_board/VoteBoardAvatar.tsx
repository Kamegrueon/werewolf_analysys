import { useState, useContext, useEffect } from 'react'
import styles from './VoteBoard.module.css'
import SendIcon from '@mui/icons-material/Send';
import { PLAYER, VOTE_LOG } from '../types';
import { VoteLogsContext } from '../../utils/AnalysisContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { votesDeleteRequest } from '../../utils/ApiFetch'
import { AxiosResponse } from 'axios'
import { SliceRollName } from '../../utils/PlayerProcessing';
import { useSelector } from 'react-redux';
import { selectPlayers } from '../../reducers/playerSlice';

interface VoteProps {
  vote: VOTE_LOG
}

const VoteBoardAvatar = (props: VoteProps) => {
  const { voted_id, voter_id } = props.vote
  // const players = useContext(PlayersContext)
  const players = useSelector(selectPlayers)
  const { voteLogs, setVoteLogs } = useContext(VoteLogsContext) 
  const [voter, setVoter] = useState({} as PLAYER)
  const [voted, setVoted] = useState({} as PLAYER)

  const deleteAction = () => {
    votesDeleteRequest(props.vote.id).then((res: AxiosResponse<VOTE_LOG>) => {
      setVoteLogs(voteLogs.filter(vote => vote.id !== res.data.id))
    })
  }

  useEffect(() => {
    setVoter(players.filter((player) => String(player.id) === String(voter_id))[0])
    setVoted(players.filter((player) => String(player.id) === String(voted_id))[0])
  },[players, voter_id, voted_id])

  return (
    <>
      {
        players && players.length
          ?(
            <div className={styles.vote__vote_log}>
              <div className={styles.vote__avatar}>
              <div className={styles.vote__avatar_position} style={{borderColor: voter.roll_color, color: voter.roll_color}}>{SliceRollName(voter)}</div>
                <div className={styles.vote__avatar_name}>
                  {voter.player_name}
                </div>
              </div>
              <div className={styles.vote__send_icon}>
                <SendIcon />
              </div>
              <div className={styles.vote__avatar}>
                <div className={styles.vote__avatar_position} style={{borderColor: voted.roll_color, color: voted.roll_color}}>{SliceRollName(voted)}</div>
                <div className={styles.vote__avatar_name}>
                  {voted.player_name}
                </div>
              </div>
              <div className={styles.vote__delete_icon}>
                <DeleteOutlineIcon sx={{color: 'white'}} onClick={deleteAction} />
              </div>
            </div>
          )
        : <></>
      }
    </>
  )
}

export default VoteBoardAvatar