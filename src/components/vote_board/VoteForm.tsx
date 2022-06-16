import { useContext } from 'react'
import PlayerContext from '../contexts/PlayerContext';
import styles from './VoteBoard.module.css'
import { Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

const avatar = {
  width: 40,
  height: 40
}

const VoteForm = (props: any) => {

  const players = useContext(PlayerContext)

  const {voterPlayerId, setVoterPlayerId, votedPlayerId, setVotedPlayerId} = props
  // console.log(props.voteState)

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
                value={voterPlayerId}
                onChange={voteHandleChange}
                style={{background: 'white', width: 100, height: 30}}
              >
              {players.map((p) => 
                <MenuItem value={p.user_id} key={p.user_id}>{p.name}</MenuItem>
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
                value={votedPlayerId}
                onChange={votedHandleChange}
                style={{background: 'white', width: 100, height: 30}}
              >
              {players.map((p) => 
                <MenuItem value={p.user_id} key={p.user_id}>{p.name}</MenuItem>
              )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
  )
}

export default VoteForm