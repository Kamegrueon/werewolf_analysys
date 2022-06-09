import React from 'react'
import styles from './AvatarState.module.css'
// import { POSITION_STATE } from '../types'

interface Prop {
  position: string | undefined
}

const PositionState = (props: Prop) => {
  switch(props.position){
    case 'fortune-teller':
      // position_orderはCoした順番に応じてアルファベット(数値)を割り振る
      return {position_order: '占', position_color: '#4072EE'}
    case 'were-wolf':
      return {position_order: '狼', position_color: '#000000'}
    case 'medium':
      return {position_order: '霊', position_color: '#B558F6'}  
    default:
      return {position_order: '', position_color: 'transparent'}
  }
}


const AvatarStatePositionMarker = (props: Prop) => {
  const position_state = PositionState(props)
  return (
    <div className={styles.avatar__position_marker}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
      >
        <text x="18" y="22.5" textAnchor="middle" fill='white'>{position_state.position_order}</text>
        <path 
          d="M31.8499 17.15C31.8499 25.0753 25.4252 31.5 17.4999 31.5C9.57462 31.5 3.1499 25.0753 3.1499 17.15C3.1499 9.22476 9.57462 2.80005 17.4999 2.80005C25.4252 2.80005 31.8499 9.22476 31.8499 17.15ZM8.88892 17.15C8.88892 21.9058 12.7442 25.761 17.4999 25.761C22.2556 25.761 26.1109 21.9058 26.1109 17.15C26.1109 12.3943 22.2556 8.53907 17.4999 8.53907C12.7442 8.53907 8.88892 12.3943 8.88892 17.15Z"
          fill={position_state.position_color}
        />
      </svg>
    </div>
  )
}

export default AvatarStatePositionMarker