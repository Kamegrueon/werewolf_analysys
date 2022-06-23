import React, { useContext } from 'react'
import styles from './PlayerBoard.module.css'
import { SelectPlayerBoardDateContext } from '../providers/SelectPlayerBoardDateProvider';

import PlayerBoardAvatar from './PlayerBoardAvatar'
import PlayerBoardDailyReport from './PlayerBoardDailyReport'
// import { playersRequest } from '../ApiFetch'
import { AVATAR } from '../types'

const PlayerBoard: React.FC = () => {

  const { selectPlayerDate } = useContext(SelectPlayerBoardDateContext)
  console.log(selectPlayerDate)

  // const [res, setRes] = useState({body: '', id: 1, title: '', userId: 1})
  // const [res, setPlayerRes] = useState({user_id: 1, name:"", avatar:'', cause_of_death:'alive', date_of_death: 1})

  // useEffect(() => {
  //   playersRequest(days).then((res) => {
  //     // console.log(res.data)
  //     setRes(res.data)
  //   })
  //   },[days])


  return (
    <div className={styles.player__board}>
      <div className={styles.player__above_bar}>
        <div className={styles.player__title}>
          Players
        </div>
      </div>
      <div className={styles.player__main}>
        <PlayerBoardAvatar />
        <PlayerBoardDailyReport />
      </div>
    </div>
  )
}

export default PlayerBoard