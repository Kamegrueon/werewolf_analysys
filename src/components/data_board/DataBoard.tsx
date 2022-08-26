import { PLAYER } from '../types'
import styles from './DataBoard.module.css'
import { ShortRollName } from '../../utils/PlayerProcessing'
import { useSelector } from 'react-redux'
import { selectPlayers } from '../../reducers/playerSlice'
import { selectVoteDate, selectVoteLogs } from '../../reducers/voteSlice'

const DataBoard = () => {
  const players = useSelector(selectPlayers)
  const voteLogs = useSelector(selectVoteLogs)
  const voteDate = useSelector(selectVoteDate)

  type aggVoteLogsReduceObj = { [key: string]: number };

  const aggVotedLogs = voteLogs.map(voteLog => voteLog.voted_id)
    .reduce((prev, current) => {
      prev[current] = (prev[current] || 0) + 1;
      return prev;
    }, {} as aggVoteLogsReduceObj); 


  console.log('agg',aggVotedLogs)

  const votedPlayerFilter = (key: string) => {
    return players.filter((player: PLAYER) => String(player?.id) === String(key))[0]
  }

  return (
    <>
      {
        players[0].id !== '' && voteLogs.length && voteLogs[0].id !== ''
        ?(
          <div className={styles.data__board_wrapper}>
            <div className={styles.data__board}>
              <div style={{display: 'flex', marginBottom: 15}}>
                <div className={styles.data__title}>Data</div>
                <div className={styles.data__menu}>投票数（{voteDate}日目）</div>
              </div>
              <div className={styles.data__box}>
                {aggVotedLogs !== {"": 1} && aggVotedLogs !== {}
                ? Object.entries(aggVotedLogs).map(([key, value], index) => {
                  console.log('呼ばれた')
                  return (
                    <div className={styles.data__avatar} key={index}>
                      <div className={styles.data__avatar_position} style={{borderColor: votedPlayerFilter(String(key)).roll_color, color: votedPlayerFilter(String(key)).roll_color}}>
                        {ShortRollName(votedPlayerFilter(String(key)))}
                      </div>
                      <div className={styles.data__avatar_name}>{votedPlayerFilter(String(key)).player_name}</div>
                      <div className={styles.data__avatar_name}>{String(value)}</div>
                    </div>
                  )
                })
              : <></>
              }
              </div>
            </div>
          </div>
        )
        : <></>
      }
    </>)
}

export default DataBoard