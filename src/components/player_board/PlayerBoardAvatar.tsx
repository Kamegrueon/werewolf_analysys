import React, { useState, useRef, RefObject, createRef } from 'react'
import styles from './PlayerBoard.module.css'
import AvatarStatePositionMarker from '../avatar_state/AvatarStatePositionMarker';
import { PLAYER } from '../types'
// import { AbilityLogsContext, PlayersContext } from '../../utils/AnalysisContext';
import ModalMain from '../modal/ModalMain'
import PlayerBoardComingOut from './PlayerBoardComingOut'
import PlayerBoardSelectAbilityAction from './PlayerBoardSelectAbilityAction'
import PlayerBoardExistCod from './PlayerBoardExistCod';
import { ShortRollName, ExistCodStyle } from '../../utils/PlayerProcessing'
import { useSelector } from 'react-redux';
import { selectAbilityLogs, selectPlayers } from '../../reducers/playerSlice';

const PlayerBoardAvatar: React.FC = () => {
  // const players = useContext(PlayersContext)
  const players = useSelector(selectPlayers)
  const abilityLogs = useSelector(selectAbilityLogs)

  const [isOpen, setIsOpen] = useState(false);
  const [coId, setCoId] = useState<string | null>(null)
  const [clicked, setClicked] = useState<number | null>(null);
  const contentRefs = useRef<RefObject<HTMLDivElement>[]>([])
  // const {abilityLogs} = useContext(AbilityLogsContext)

  players.forEach((_, index) => {
    contentRefs.current[index] = createRef<HTMLDivElement>()
  })

  const playerAvailableAction = (player: PLAYER, clicked: number | null, index: number) => {
    if(player.cause_of_death !== null){
      return null
    }else{
      const height = player.roll_name === null ? '150px' : '180px'
      return (
        <div
          ref={contentRefs.current[index]}
          style={
            clicked === index
              ? {
                  height: height,
                  width: '280px',
                  backgroundColor: "#1F2327",
                  borderRadius: '5%',
                  boxShadow: '2px 2px 3px rgba(255, 255, 255, 0.3)',
                  position: 'absolute',
                  display: 'block'
                }
              : { height: "0px", display: 'none' }
          }
        >
          {
          player.roll_name === null 
            ? <PlayerBoardComingOut playerId={player.id} setClicked={setClicked} contentRefs={contentRefs} index={index} clicked={clicked}/>
            : <PlayerBoardSelectAbilityAction coId={player.co_id} setCoId={setCoId} setIsOpen={setIsOpen} setClicked={setClicked} contentRefs={contentRefs} index={index} clicked={clicked}/>
          }
        </div>
      )
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    const elements:any = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC");
    Object.keys(elements).forEach((index: string) => {elements[index].style.zIndex = 5})
  }

  const handleClick = (index: number) => {
    if (clicked === index) {
      // comingOutRollを初期値に更新
      return setClicked(null);
    }
  
    setClicked(index);

  };

  return (
    <div className={styles.player__avatars}>
      {players.map((player, index) =>(
        <div key={player.id}>
          <div className={styles.player__avatar_state}>        
            <PlayerBoardExistCod player={player} key={player.id} />
          </div>
          <div style={{position: 'relative'}}>
            {abilityLogs && abilityLogs.filter(abilityLog => String(abilityLog.target_player_id) === String(player.id)).length
              ? <></>
              : (abilityLogs.filter(abilityLog => String(abilityLog.target_player_id) === String(player.id))
                .map((abilityResult, i) => {
                  return <AvatarStatePositionMarker abilityResult={abilityResult} i={i} key={abilityResult.id}/>
                })
              )
            }
          </div>
          <div onClick={()=>handleClick(index)} className={styles.player__avatar} style={ExistCodStyle(player)}>
            <div className={styles.player__avatar_position} style={{borderColor: player.roll_color, color: player.roll_color}}>{ShortRollName(player)}</div>
            <div className={styles.player__avatar_name}>
              {player.player_name}
            </div>
          </div>
          {playerAvailableAction(player, clicked, index)}
        </div>
      ))}
      <ModalMain 
        isOpen={isOpen} 
        handleClose={handleClose}
        body={'createAbilityLog'}
        coId={coId}
      />
    </div>    
  )
}

export default PlayerBoardAvatar