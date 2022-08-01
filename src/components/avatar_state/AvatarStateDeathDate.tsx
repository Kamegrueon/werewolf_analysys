import styles from './AvatarState.module.css'

interface Props {
  death_date: number | null
}

const AvatarStateDeathDate = (props: Props) => {
  return (
    <div className={styles.avatar__death_date}>
      {props.death_date}
    </div>
  )
}

export default AvatarStateDeathDate