import React from 'react'
import styles from './DataBoard.module.css'

const DataBoard = () => {

  return (
    <div className={styles.data__board}>
      <div className={styles.data__title}>Data</div>
      <div className={styles.data__box}>
          {/* <VoteBoardVoteList /> */}
          <div className={styles.vote__select}>
            {/* <SelectMain body={'voteDay'} /> */}
          </div>
      </div>
        {/* {isOpenForm
          ? <DoneIcon onClick={handlePostVote} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}} />
          : <AddIcon onClick={handleOpen} sx={{ fontSize: 40, color: 'white', position: 'absolute', left: 520, backgroundColor: '#29CB97', borderRadius: 50}}/>
        } */}
    </div>
  )
}

export default DataBoard