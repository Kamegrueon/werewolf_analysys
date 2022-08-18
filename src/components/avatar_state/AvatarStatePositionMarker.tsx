import { useContext } from 'react'
import { PlayersContext } from '../../utils/AnalysisContext'
import { ABILITY_LOG } from '../types'
import styles from './AvatarState.module.css'
// import { POSITION_STATE } from '../types'

const AvatarStatePositionMarker = (props: {abilityResult: ABILITY_LOG, i: number}) => {
  const {abilityResult, i} = props
  const players = useContext(PlayersContext)
  let left_circle_position = 41 * i
  let left_date_position = 33 + (41 * i)

  return (
    <>
    <div className={styles.avatar__position_marker} style={{top: -10, left: left_circle_position}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
      >
        <text x="18" y="22.5" textAnchor="middle" fill='white'>{abilityResult.ability_result}</text>
        <path 
          d="M31.8499 17.15C31.8499 25.0753 25.4252 31.5 17.4999 31.5C9.57462 31.5 3.1499 25.0753 3.1499 17.15C3.1499 9.22476 9.57462 2.80005 17.4999 2.80005C25.4252 2.80005 31.8499 9.22476 31.8499 17.15ZM8.88892 17.15C8.88892 21.9058 12.7442 25.761 17.4999 25.761C22.2556 25.761 26.1109 21.9058 26.1109 17.15C26.1109 12.3943 22.2556 8.53907 17.4999 8.53907C12.7442 8.53907 8.88892 12.3943 8.88892 17.15Z"
          fill={players.filter(player => String(player.id) === String(abilityResult.coming_out_player_id))[0].roll_color}
        />
      </svg>
    </div>
    <div className={styles.avatar__ability_result_date} style={{left: left_date_position}}>
      {abilityResult.date_progress}
    </div>
    </>
  )
}

export default AvatarStatePositionMarker