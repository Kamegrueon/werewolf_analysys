import { useContext } from 'react'
import styles from './VoteBoard.module.css'
import VoteBoardAvatar from './VoteBoardAvatar'

import VoteForm from './VoteForm';

import { VotesContext } from '../providers/VotesProvider';
import { VoteFormContext } from '../providers/VoteFormProvider';

const VoteBoardVoteList = () => {
  const VoteList = useContext(VotesContext)
  const { isOpenForm } = useContext(VoteFormContext)

  return (
    <div>
      <div className={styles.vote__voted}>
        {isOpenForm 
          ? <VoteForm />
          : null
        }
        {VoteList.map((vote) => (    
          <VoteBoardAvatar vote={vote} key={vote.vote_id}/>        
        ))}
      </div>
  </div>
  )
}

export default VoteBoardVoteList