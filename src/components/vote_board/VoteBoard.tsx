import React, { useContext } from 'react'

import SelectDaily from '../select/SelectDaily'
import styles from './VoteBoard.module.css'
import VoteBoardVoteList from './VoteBoardVoteList'
// import { playersRequest } from '../ApiFetch'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import { SelectVoteBoardDateContext } from '../providers/SelectVoteBoardDateProvider';
import { VoteFormContext } from '../providers/VoteFormProvider';

const VoteBoard:React.FC = () => {
  const select_days_style = {
    width: 90,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
  }
 
  const {selectVoteDate} = useContext(SelectVoteBoardDateContext)
  console.log(selectVoteDate)

  const { isOpenForm, handleOpen, handlePostVote } = useContext(VoteFormContext)

  interface DAILIES_STYLE_ACTION {
      select_days_style:{
        width: number,
        height: number,
        color?: string,
        backgroundColor: string,
        textAlign?: string
      }
      action?: 'playerDay' | 'voteDay' | undefined
}

  const dailies_props: DAILIES_STYLE_ACTION = {
    select_days_style: select_days_style,
    action: 'voteDay'
  }


  return (
      <div className={styles.vote__board}>
        <div className={styles.vote__title}>Vote for</div>
        <div className={styles.vote__box}>
          <VoteBoardVoteList />
          <SelectDaily dailies_props={dailies_props} />
        </div>
        {isOpenForm
          ? <DoneIcon onClick={handlePostVote} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}} />
          : <AddIcon onClick={handleOpen} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}}/>
        }
      </div>
  )
}

export default VoteBoard