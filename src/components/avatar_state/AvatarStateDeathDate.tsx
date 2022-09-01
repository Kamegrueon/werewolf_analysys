import styles from './AvatarState.module.css'

const AvatarStateDeathDate: React.FC<{death_date: number | null}> = ({death_date}) => {
  return (
    <div className={styles.avatar__death_date}>
      {death_date}
    </div>
  )
}

export default AvatarStateDeathDate