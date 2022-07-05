import React, { useContext } from 'react'

import SelectMain from '../select/SelectMain'
import styles from './VoteBoard.module.css'
import VoteBoardVoteList from './VoteBoardVoteList'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { VoteFormContext } from '../providers/VoteFormProvider';

const VoteBoard:React.FC = () => {

  const { isOpenForm, handleOpen, handlePostVote } = useContext(VoteFormContext)

  return (
      <div className={styles.vote__board}>
        <div className={styles.vote__title}>Vote for</div>
        <div className={styles.vote__box}>
          <VoteBoardVoteList />
          <div className={styles.vote__select}>
            <SelectMain body={'voteDay'} />
          </div>
        </div>
        {isOpenForm
          ? <DoneIcon onClick={handlePostVote} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}} />
          : <AddIcon onClick={handleOpen} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}}/>
        }
      </div>
  )
}

export default VoteBoard