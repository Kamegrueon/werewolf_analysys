import styles from './AvatarState.module.css'

interface Props {
  date_of_death: number | undefined
}

const AvatarStateDeathDate = (props: Props) => {
  return (
    <div className={styles.avatar__death_date}>
      {props.date_of_death}
    </div>
  )
}

export default AvatarStateDeathDate