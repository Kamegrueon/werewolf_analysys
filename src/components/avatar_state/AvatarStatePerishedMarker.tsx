import React from 'react'
import styles from './AvatarState.module.css'

const AvatarStatePerishedMarker:React.FC = () => {
  return (
    <div className={styles.player__perished_marker_box}>
    <div className={styles.player__perished_marker}>
      <div></div>
      <div></div>
    </div>
  </div>
  )
}

export default AvatarStatePerishedMarker