import React from 'react'
import styles from './AvatarState.module.css'

const AvatarStateExecutedMarker: React.FC = () => {
  return (
    <div className={styles.player__executed_marker_box}>
      <div className={styles.player__executed_marker}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AvatarStateExecutedMarker