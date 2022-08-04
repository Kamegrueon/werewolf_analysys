import React, { useContext, useState, useRef, RefObject, createRef } from 'react'
import styles from './PlayerBoard.module.css'
import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker'
import AvatarStatePositionMarker from '../avatar_state/AvatarStatePositionMarker';
import { PLAYER } from '../types'
import AvatarStateDeathDate from '../avatar_state/AvatarStateDeathDate';
import { PlayersContext } from '../../utils/AnalysisContext';
import ModalMain from '../modal/ModalMain'
import PlayerBoardComingOut from './PlayerBoardComingOut'

// const noAvailableRoll = ['人狼', '狂人', '共有者', '妖狐', '独裁者', '狂信者']

const ExistCod = (player: PLAYER) => {
  switch (player.cause_of_death) {
    case '殺害':
      return (
        <>
          <AvatarStateMurderedMarker />
          <AvatarStateDeathDate death_date={player.death_date} key={player.id}/>
        </>
      );
    case '処刑':
      return (
        <>
          <AvatarStateExecutedMarker />
          <AvatarStateDeathDate death_date={player.death_date} key={player.id}/>
        </>
      );
    case '突然死':
      return (
        <>
          <AvatarStatePerishedMarker />
          <AvatarStateDeathDate death_date={player.death_date} key={player.id}/>
        </>
      );
    default:
      return null
  }
}

const ExistCodStyle = (player: PLAYER) => {
  if(player.cause_of_death) {
    const dead_style = { opacity: 0.5}
    return dead_style;
  }else {
    return {}
  } 
}

const setRollName = (player: PLAYER) => {
  let roll_name = '？'
  switch (player.roll_name) {
    case '占い師':
      return roll_name = '占'
    case '人狼':
      return roll_name = '狼'
    case '狂人':
      return roll_name = '狂'
    case '霊媒師':
      return roll_name = '霊'
    case '騎士':
      return roll_name = '騎'
    case '妖狐':
      return roll_name = '狐'
    case '共有者':
      return roll_name = '共'
    case 'ハンター':
      return roll_name = 'ハ'
    case '独裁者':
      return roll_name = '独'
    case '狂信者':
      return roll_name = '狂'
    default:
      return roll_name
  }
}

const PlayerBoardAvatar: React.FC = () => {
  const players = useContext(PlayersContext)
  const [isOpen, setIsOpen] = useState(false);
  const [coPlayer, setCoPlayer] = useState({} as PLAYER)
  const [clicked, setClicked] = useState<number | null>(null);
  const contentRefs = useRef<RefObject<HTMLDivElement>[]>([])

  players.forEach((_, index) => {
    contentRefs.current[index] = createRef<HTMLDivElement>()
  })

  const playerAvailableAction = (player: PLAYER, clicked: number | null, index: number) => {
    if(player.cause_of_death !== null){
      return null
    }else if(player.roll_name === null){
      return (
        <div
          ref={contentRefs.current[index]}
          style={
            clicked === index
              ? {
                  height: '150px',
                  width: '300px',
                  backgroundColor: "#1F2327",
                  borderRadius: '5%',
                  boxShadow: '2px 2px 3px rgba(255, 255, 255, 0.3)',
                  position: 'absolute',
                  display: 'block'
                }
              : { height: "0px", display: 'none' }
          }
        >
            <PlayerBoardComingOut playerId={player.id} setClicked={setClicked} contentRefs={contentRefs} index={index} clicked={clicked}/>
        </div>
      )
    }else if(clicked === index){
      setClicked(null)
      setCoPlayer(player)
      setIsOpen(true)
      const elements:any = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC");
      Object.keys(elements).forEach((index: string) => {elements[index].style.zIndex = 0})
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
            { ExistCod(player) }
          </div>
          <div>
            <AvatarStatePositionMarker  position={player.roll_name} key={player.id}/>
          </div>
          <div onClick={()=>handleClick(index)} className={styles.player__avatar} style={ExistCodStyle(player)}>
            <div className={styles.player__avatar_position} style={{borderColor: player.roll_color, color: player.roll_color}}>{setRollName(player)}</div>
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
        body={'abilityMenu'}
        coPlayer={coPlayer}
      />
    </div>    
  )
}

export default PlayerBoardAvatar