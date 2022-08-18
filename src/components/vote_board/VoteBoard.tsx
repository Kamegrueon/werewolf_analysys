import React, { useState, useContext } from 'react'
import SelectMain from '../select/SelectMain'
import styles from './VoteBoard.module.css'
import VoteBoardVoteList from './VoteBoardVoteList'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { VoteFormContext, SelectVoteBoardDateContext, VoteLogsContext, DailiesContext } from '../../utils/AnalysisContext';
import { votesCreateRequest } from '../../utils/ApiFetch';
import {VOTE_LOG} from '../types'
import { AxiosResponse } from 'axios'
import { filteringDailyId } from '../../utils/UtilsFC';

const VoteBoard:React.FC = () => {
  const { selectVoteDate } = useContext(SelectVoteBoardDateContext)
  const { voteLogs, setVoteLogs } = useContext(VoteLogsContext)
  const dailies = useContext(DailiesContext)
  const [voterPlayerId, setVoterPlayerId] = useState('');
  const [votedPlayerId, setVotedPlayerId] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);

  const IconStyle = { 
    fontSize: 40, 
    color: 'white', 
    position: 'absolute', 
    left: 520, 
    bottom: -30, 
    backgroundColor: '#29CB97', 
    borderRadius: 50
  }

  const handlePostVote = () => {
    if(voterPlayerId !== '' && votedPlayerId !== ''){
      votesCreateRequest(filteringDailyId(dailies, selectVoteDate), voterPlayerId, votedPlayerId)
      .then((res: AxiosResponse<VOTE_LOG>) => {
        console.log('vote response',res.data)
        setVoteLogs([...voteLogs,res.data])
      })
    }
    setVoterPlayerId('')
    setVotedPlayerId('')
    setIsOpenForm(false)
  }

  const handleOpen = () => {
    setIsOpenForm(true)
  }

  return (
    <VoteFormContext.Provider value={{
      voteLogs,
      voterPlayerId,
      setVoterPlayerId,
      votedPlayerId,
      setVotedPlayerId, 
      isOpenForm, 
    }}>
      <div className={styles.vote__board}>
        <div className={styles.vote__title}>Vote for</div>
        <div className={styles.vote__box}>
          <VoteBoardVoteList />
          <div className={styles.vote__select}>
            <SelectMain body={'voteDay'} />
          </div>
        </div>
        {isOpenForm
          ? <DoneIcon onClick={handlePostVote} sx={IconStyle} />
          : <AddIcon onClick={handleOpen} sx={IconStyle}/>
        }
      </div>
    </VoteFormContext.Provider>
  )
}

export default VoteBoard