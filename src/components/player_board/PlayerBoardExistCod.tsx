import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker'
import AvatarStateDeathDate from '../avatar_state/AvatarStateDeathDate';
import { PLAYER } from '../types'

const PlayerBoardExistCod = (props: {player: PLAYER}) => {
  const {player} = props

  switch (player.cause_of_death) {
    case '殺害':
      return (
        <>
          <AvatarStateMurderedMarker />
          <AvatarStateDeathDate death_date={player.death_date} key={player.id}/>
        </>
      );
    case '処刑':
      return (
        <>
          <AvatarStateExecutedMarker />
          <AvatarStateDeathDate death_date={player.death_date} key={player.id}/>
        </>
      );
    case '突然死':
      return (
        <>
          <AvatarStatePerishedMarker />
          <AvatarStateDeathDate death_date={player.death_date} key={player.id}/>
        </>
      );
    default:
      return null
  }
}

export default PlayerBoardExistCod