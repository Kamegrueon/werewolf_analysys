import React from 'react'
import styles from './AvatarState.module.css'

const AvatarStateExecutedMarker: React.FC = () => {
  return (
    <div className={styles.avatar__marker_box}>
      <div className={styles.avatar__executed_marker}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AvatarStateExecutedMarker