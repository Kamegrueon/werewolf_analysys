import React from 'react'
import SelectMain from '../select/SelectMain'
import styles from './VoteBoard.module.css'
import VoteBoardVoteList from './VoteBoardVoteList'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import { filteringDailyId } from '../../utils/UtilsFC';
import { fetchAsyncCreateVotes, selectIsOpenVoteForm, selectVoteDate, selectVotedPlayerId, selectVoterPlayerId, setIsVoteForm, setVotedPlayerId, setVoterPlayerId } from '../../reducers/voteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDailies } from '../../reducers/playerSlice';
import { AppDispatch } from '../../store';

const VoteBoard:React.FC = () => {

  const voteDate = useSelector(selectVoteDate)
  const voterPlayerId = useSelector(selectVoterPlayerId)
  const votedPlayerId = useSelector(selectVotedPlayerId)
  const isOpenVoteForm = useSelector(selectIsOpenVoteForm)
  const dailies = useSelector(selectDailies)

  const dispatch: AppDispatch = useDispatch()

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
      dispatch(fetchAsyncCreateVotes({
        dailyId: filteringDailyId(dailies, voteDate),
        voterId: voterPlayerId,
        votedId: votedPlayerId
      }))
    }
    dispatch(setVoterPlayerId(''))
    dispatch(setVotedPlayerId(''))
    dispatch(setIsVoteForm(false))
  }

  const handleOpen = () => {
    dispatch(setIsVoteForm(true))
  }

  return (
    <div className={styles.vote__board}>
      <div className={styles.vote__title}>Vote for</div>
      <div className={styles.vote__box}>
        <VoteBoardVoteList />
        <div className={styles.vote__select}>
          <SelectMain body={'voteDay'} />
        </div>
      </div>
      {isOpenVoteForm
        ? <DoneIcon onClick={handlePostVote} sx={IconStyle} />
        : <AddIcon onClick={handleOpen} sx={IconStyle}/>
      }
    </div>
  )
}

export default VoteBoard