import React from 'react'
import styles from './PlayerBord.module.css'
import Avatar from '@mui/material/Avatar';
import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker';

const avatar = {
  mt: 1.875,
  mx: 'auto',
  width: 100,
  height: 100
}


interface Avatar {
  name: string | null
  cause_of_death: ('perished' | 'executed' | 'murdered' | 'alive')
  avatar: string
  dead_style: {opacity: number}
}

interface AvatarsProps {
  players: Avatar[]
}

const Cod = (cod: Avatar['cause_of_death']) => {
  switch (cod) {
    case 'murdered':
      return (
        <AvatarStateMurderedMarker />
      );
    case 'executed':
      return (
        <AvatarStateExecutedMarker />
      );
    case 'perished':
      return (
        <AvatarStatePerishedMarker />
      );
    case 'alive':
      return null
  }
}

const PlayerBordAvatar: React.FC<AvatarsProps> = (props) => {
  return (
    <div className={styles.player__avatars}>
      {props.players.map((prop) =>(
      <>
        <div className={styles.player__avatar_state}>        
          { Cod(prop.cause_of_death) }
        </div>
        <div className={styles.player__avatar} style={prop.dead_style}>
          <Avatar src={prop.avatar} sx={avatar} alt='avatar' />
          <div className={styles.player__avatar_name}>
            {prop.name}
          </div>
        </div>
      </>
      ))}
      {/* Add player */}
        <div className={styles.player__avatar}>
          <Avatar src={'../../static/images/参加者.png'} sx={avatar} alt='avatar' />
        </div>
    </div>    
  )
}

export default PlayerBordAvatar