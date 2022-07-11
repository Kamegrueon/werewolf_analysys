import React, { useContext } from 'react'
import styles from './PlayerBoard.module.css'
import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker'
import AvatarStatePositionMarker from '../avatar_state/AvatarStatePositionMarker';
import { PLAYER } from '../types'
import AvatarStateDeathDate from '../avatar_state/AvatarStateDeathDate';
import { PlayersContext } from '../../utils/AnalysisContext';

const ExistCod = (player: PLAYER) => {
  switch (player.cause_of_death) {
    case '殺害':
      return (
        <>
          <AvatarStateMurderedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.id}/>
        </>
      );
    case '処刑':
      return (
        <>
          <AvatarStateExecutedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.id}/>
        </>
      );
    case '突然死':
      return (
        <>
          <AvatarStatePerishedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.id}/>
        </>
      );
    default:
      return null
  }
}

const ExistCodStyle = (player: PLAYER) => {
  if(player.cause_of_death) {
    const dead_style = { opacity: 0.5}
    return dead_style;
  }else {
    return {}
  } 
}

const PositionName = (player: PLAYER) => {
  let position_name = '？'
  switch (player.position) {
    case '占い師':
      position_name = '占'
      return position_name
    default:
      return position_name
  }
}

const PlayerBoardAvatar: React.FC = () => {
  const players = useContext(PlayersContext)
  return (
    <div className={styles.player__avatars}>
      {players.map((player) =>(
      <div key={player.id}>
        <div className={styles.player__avatar_state}>        
          { ExistCod(player) }
        </div>
        <div>
          <AvatarStatePositionMarker  position={player.position} key={player.id}/>
        </div>
        <div className={styles.player__avatar} style={ExistCodStyle(player)}>
          <div className={styles.player__avatar_position}>{PositionName(player)}</div>
          <div className={styles.player__avatar_name}>
            {player.player_name}
          </div>
        </div>
      </div>
      ))}
    </div>    
  )
}

export default PlayerBoardAvatar