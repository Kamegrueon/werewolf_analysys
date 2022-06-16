import React from 'react'
import styles from './AvatarState.module.css'


const AvatarStateMurderedMarker: React.FC = () => {
  return (
    <div className={styles.avatar__marker_box}>
      <div className={styles.avatar__murdered_marker}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AvatarStateMurderedMarker