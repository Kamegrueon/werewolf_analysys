import React from 'react'
import styles from './PlayerBord.module.css'
import Avatar from '@mui/material/Avatar';
import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker'
import AvatarStatePositionMarker from '../avatar_state/AvatarStatePositionMarker';
import { AVATAR, CAUSE_Of_DEATH } from '../types'
import { Key } from '@mui/icons-material';

const avatar = {
  mt: 1.875,
  mx: 'auto',
  width: 100,
  height: 100
}

interface Props {
  players: AVATAR[]
}

const PositionState = {
  position_color: '#4072EE',
  position_order: 'A',
}

const Cod = (prop: AVATAR) => {
  switch (prop.cause_of_death) {
    case 'murdered':
      return (
        <AvatarStateMurderedMarker key={prop.user_id}/>
      );
    case 'executed':
      return (
        <AvatarStateExecutedMarker key={prop.user_id}/>
      );
    case 'perished':
      return (
        <AvatarStatePerishedMarker key={prop.user_id}/>
      );
    case 'alive':
      return null
  }
}

const PlayerBordAvatar: React.FC<Props> = (props) => {
  return (
    <div className={styles.player__avatars}>
      {props.players.map((prop) =>(
      <div key={prop.user_id}>
        <div className={styles.player__avatar_state}>        
          { Cod(prop) }
        </div>
        <div>
          <AvatarStatePositionMarker  position_state={PositionState} key={prop.user_id}/>
        </div>
        <div className={styles.player__avatar} style={prop.dead_style}>
          <Avatar src={prop.avatar} sx={avatar} alt='avatar' key={prop.user_id}/>
          <div className={styles.player__avatar_name}>
            {prop.name}
          </div>
        </div>
      </div>
      ))}
        <div className={styles.player__avatar}>
          <Avatar src={'../../static/images/参加者.png'} sx={avatar} alt='avatar'/>
        </div>
    </div>    
  )
}

export default PlayerBordAvatar