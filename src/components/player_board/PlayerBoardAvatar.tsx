import React, { useContext } from 'react'
import styles from './PlayerBoard.module.css'
import Avatar from '@mui/material/Avatar';
import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker'
import AvatarStatePositionMarker from '../avatar_state/AvatarStatePositionMarker';
import { AVATAR } from '../types'
import PlayerContext from '../contexts/PlayerContext'
import AvatarStateDeathDate from '../avatar_state/AvatarStateDeathDate';
import { ReactComponent as AddPlayerIcon } from '../../images/AddPlayerIcon.svg'

const avatar = {
  mt: 1.875,
  mx: 'auto',
  width: 85,
  height: 85
}

const ExistCod = (player: AVATAR) => {
  switch (player.cause_of_death) {
    case 'murdered':
      return (
        <>
          <AvatarStateMurderedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.user_id}/>
        </>
      );
    case 'executed':
      return (
        <>
          <AvatarStateExecutedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.user_id}/>
        </>
      );
    case 'perished':
      return (
        <>
          <AvatarStatePerishedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.user_id}/>
        </>
      );
    default:
      return null
  }
}

const ExistCodStyle = (player: AVATAR) => {
  if(player.cause_of_death) {
    const dead_style = { opacity: 0.5}
    return dead_style;
  }else {
    return {}
  } 
}

const PlayerBoardAvatar: React.FC = () => {
  const players = useContext(PlayerContext)
  return (
    <div className={styles.player__avatars}>
      {players.map((player) =>(
      <div key={player.user_id}>
        <div className={styles.player__avatar_state}>        
          { ExistCod(player) }
        </div>
        <div>
          <AvatarStatePositionMarker  position={player.position} key={player.user_id}/>
        </div>
        <div className={styles.player__avatar} style={ExistCodStyle(player)}>
          <Avatar src={player.avatar} sx={avatar} alt='avatar' key={player.user_id}/>
          <div className={styles.player__avatar_name}>
            {player.name}
          </div>
        </div>
      </div>
      ))}
        <div className={styles.player__add_avatar}>
          <AddPlayerIcon width={100} height={100}/>
        </div>
    </div>    
  )
}

export default PlayerBoardAvatar