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

  const {voterPlayerName, setVoterPlayerName, votedPlayerName, setVotedPlayerName} = props.voteState
  // console.log(props.voteState)

  const voteHandleChange = (event: SelectChangeEvent) => {
    setVoterPlayerName(event.target.value)
  }

  const votedHandleChange = (event: SelectChangeEvent) => {
    setVotedPlayerName(event.target.value)
  }

  return (
      <div className={styles.vote__vote_log}>
        <div className={styles.vote__avatar}>
          <Avatar sx={avatar}/>
          <div className={styles.vote__avatar_name}>
            <FormControl>
              <Select
                value={voterPlayerName}
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
                value={votedPlayerName}
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