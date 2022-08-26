import styles from './VoteBoard.module.css'
import SendIcon from '@mui/icons-material/Send';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayers } from '../../reducers/playerSlice';
import { selectVotedPlayerId, selectVoteLogs, selectVoterPlayerId, setVotedPlayerId, setVoterPlayerId } from '../../reducers/voteSlice';
import { AppDispatch } from '../../store';

const VoteForm = () => {

  const players = useSelector(selectPlayers)
  const voteLogs = useSelector(selectVoteLogs)
  const voterPlayerId = useSelector(selectVoterPlayerId)
  const votedPlayerId = useSelector(selectVotedPlayerId)

  const dispatch: AppDispatch = useDispatch()
  

  const voteHandleChange = (event: SelectChangeEvent) => {
    dispatch(setVoterPlayerId(event.target.value))
    console.log('voter', event.target.value)
  }

  const votedHandleChange = (event: SelectChangeEvent) => {
    dispatch(setVotedPlayerId(event.target.value))
    console.log('voted', event.target.value)
  }

  return (
      <div className={styles.vote__vote_log}>
        <div className={styles.vote__avatar}>
        <div className={styles.vote__avatar_position} style={{borderColor: 'white', color: 'white'}}>？</div>
          <div className={styles.vote__avatar_name}>
            <FormControl>
              <Select
                native={true}
                defaultValue={''}
                onChange={voteHandleChange}
                style={{background: 'white', width: 90, height: 30}}
              >
                <option value={''} key={''}></option>
              {players.filter(player => player.cause_of_death === null && String(player.id) !== String(votedPlayerId) && !voteLogs.map(vote => String(vote.voter_id)).includes(String(player.id)))
                .map(player => 
                  <option value={player.id} key={player.id}>{player.player_name}</option>
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={styles.vote__send_icon}>
          <SendIcon />
        </div>
        <div className={styles.vote__avatar}>
          <div className={styles.vote__avatar_position} style={{borderColor: 'white', color: 'white'}}>？</div>
          <div className={styles.vote__avatar_name}>
            <FormControl>
              <Select
                native={true}
                defaultValue={''}
                onChange={votedHandleChange}
                style={{background: 'white', width: 90, height: 30}}
              >
                <option value={''} key={''}></option>
              {players.filter(player => player.cause_of_death === null && String(player.id) !== String(voterPlayerId))
              .map(player => 
                <option value={player.id} key={player.id}>{player.player_name}</option>
              )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
  )
}

export default VoteForm