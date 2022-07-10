import React, { useState, useContext } from 'react'
import SelectMain from '../select/SelectMain'
import styles from './VoteBoard.module.css'
import VoteBoardVoteList from './VoteBoardVoteList'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { VoteFormContext, SelectVoteBoardDateContext, VoteLogsContext } from '../../utils/AnalysisContext';
import { votesCreateRequest } from '../../utils/ApiFetch';

const VoteBoard:React.FC = () => {
  const { selectVoteDate } = useContext(SelectVoteBoardDateContext)
  const { voteLogs, setVoteLogs } = useContext(VoteLogsContext)
  const [voterPlayerId, setVoterPlayerId] = useState('');
  const [votedPlayerId, setVotedPlayerId] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handlePostVote = () => {
    votesCreateRequest(selectVoteDate, voterPlayerId, votedPlayerId).then((res: any) => {
      setVoteLogs([...voteLogs,res.data])
    })
    setVoterPlayerId('')
    setVotedPlayerId('')
    setIsOpenForm(false)
  }

  const handleOpen = () => {
    setIsOpenForm(true)
  }

  return (
    <VoteFormContext.Provider value={{
      setVoterPlayerId,
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
          ? <DoneIcon onClick={handlePostVote} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}} />
          : <AddIcon onClick={handleOpen} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}}/>
        }
      </div>
    </VoteFormContext.Provider>
  )
}

export default VoteBoard