import React from 'react'
import styles from './PlayerBord.module.css'
import Avatar from '@mui/material/Avatar';

const avatar = {
  mt: 1.875,
  mx: 'auto',
  width: 100,
  height: 100
}

interface Avatar {
  name: string | null
  avatar: string
}

interface AvatarsProps {
  players: Avatar[]
}

const PlayerBordAvatar: React.FC<AvatarsProps> = (props) => {
  return (
    <div className={styles.player__avatars}>
      {props.players.map((prop) =>(
        <div className={styles.player__avatar}>
          <Avatar src={prop.avatar} sx={avatar} alt='avatar' />
          <div className={styles.player__avatar_name}>
            {prop.name}
          </div>
        </div>
      ))}
      {/* Add player */}
      <div className={styles.player__avatar}>
        <Avatar src={'../../static/images/参加者.png'} sx={avatar} alt='avatar' />
      </div>
    </div>    
  )
}

export default PlayerBordAvatar