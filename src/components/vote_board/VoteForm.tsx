import { useContext } from 'react'
import { PlayersContext } from '../../utils/AnalysisContext';
import { VoteFormContext } from '../../utils/AnalysisContext';
import styles from './VoteBoard.module.css'
import { Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const avatar = {
  width: 40,
  height: 40
}

const VoteForm = () => {

  const players = useContext(PlayersContext)
  const { voteLogs, voterPlayerId, setVoterPlayerId, votedPlayerId, setVotedPlayerId } = useContext(VoteFormContext)

  const voteHandleChange = (event: SelectChangeEvent) => {
    setVoterPlayerId(event.target.value)
    console.log('voter', event.target.value)
  }

  const votedHandleChange = (event: SelectChangeEvent) => {
    setVotedPlayerId(event.target.value)
    console.log('voted', event.target.value)
  }

  return (
      <div className={styles.vote__vote_log}>
        <div className={styles.vote__avatar}>
          <Avatar sx={avatar}/>
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
          <Avatar sx={avatar}/>
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