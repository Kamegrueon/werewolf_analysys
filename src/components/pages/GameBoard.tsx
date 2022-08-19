import React, { memo, useEffect } from 'react'
import styles from '../../App.module.css'
import PlayerBoard from '../player_board/PlayerBoard'
import VoteBoard from '../vote_board/VoteBoard'
import DataBoard from '../data_board/DataBoard'
// import { fetchAsyncGetRolls, selectGameId } from '../../reducers/gameSlice'
// import { useDispatch, useSelector } from 'react-redux'


export const GameBoard: React.FC = memo(() => {
  // const dispatch: any = useDispatch()
  // const gameId = useSelector(selectGameId)

  // useEffect(()=>{
  //   console.log("呼ばれた")
  //   dispatch(fetchAsyncGetRolls(gameId))
  // },[gameId, dispatch])

  return (
    <>
      <PlayerBoard />
      <div className={styles.app__bottom}>
        <VoteBoard />
        <DataBoard />
      </div>
    </>
  )
})
