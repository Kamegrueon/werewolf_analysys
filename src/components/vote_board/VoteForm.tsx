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
  const { setVoterPlayerId ,setVotedPlayerId } = useContext(VoteFormContext)

  const voteHandleChange = (event: SelectChangeEvent) => {
    setVoterPlayerId(event.target.value)
  }

  const votedHandleChange = (event: SelectChangeEvent) => {
    setVotedPlayerId(event.target.value)
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
                style={{background: 'white', width: 100, height: 30}}
              >
                <option value={''} key={''}></option>
              {players.map((p) => 
                <option value={p.id} key={p.id}>{p.player_name}</option>
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
                style={{background: 'white', width: 100, height: 30}}
              >
                <option value={''} key={''}></option>
              {players.map((p) => 
                <option value={p.id} key={p.id}>{p.player_name}</option>
              )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
  )
}

export default VoteForm