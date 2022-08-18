import { useContext } from 'react'
import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'

import VoteForm from './VoteForm';

import { VoteLogsContext } from '../../utils/AnalysisContext';
import { VoteFormContext } from '../../utils/AnalysisContext';

const VoteBoardVoteList = () => {
  const { voteLogs } = useContext(VoteLogsContext)
  const { isOpenForm } = useContext(VoteFormContext)

  return (
    <div>
      <div className={styles.vote__voted}>
        {isOpenForm 
          ? <VoteForm />
          : null
        }
        {voteLogs !== []
          ? voteLogs.map((vote) => (
            <VoteBoardAvatar vote={vote} key={vote.id}/>
          ))
          : null
        }
      </div>
  </div>
  )
}

export default VoteBoardVoteList