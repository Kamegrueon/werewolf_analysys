import React, { useContext, useState, useRef } from 'react'
import styles from './PlayerBoard.module.css'
import AvatarStateMurderedMarker from '../avatar_state/AvatarStateMurderedMarker'
import AvatarStateExecutedMarker from '../avatar_state/AvatarStateExecutedMarker'
import AvatarStatePerishedMarker from '../avatar_state/AvatarStatePerishedMarker'
import AvatarStatePositionMarker from '../avatar_state/AvatarStatePositionMarker';
import { PLAYER } from '../types'
import AvatarStateDeathDate from '../avatar_state/AvatarStateDeathDate';
import { PlayersContext } from '../../utils/AnalysisContext';
// import ModalMain from '../modal/ModalMain'
import PlayerBoardComingOut from './PlayerBoardComingOut'

const ExistCod = (player: PLAYER) => {
  switch (player.cause_of_death) {
    case '殺害':
      return (
        <>
          <AvatarStateMurderedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.id}/>
        </>
      );
    case '処刑':
      return (
        <>
          <AvatarStateExecutedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.id}/>
        </>
      );
    case '突然死':
      return (
        <>
          <AvatarStatePerishedMarker />
          <AvatarStateDeathDate date_of_death={player.date_of_death} key={player.id}/>
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

const PositionName = (player: PLAYER) => {
  let roll_name = '？'
  switch (player.position) {
    case '占い師':
      roll_name = '占'
      return roll_name
    default:
      return roll_name
  }
}

const PlayerBoardAvatar: React.FC = () => {
  const players = useContext(PlayersContext)
  // const [isOpen, setIsOpen] = useState(false);
  // const [rollBody, setRollBody] = useState('');
  // const [coPlayer, setCoPlayer] = useState({} as PLAYER)
  const [clicked, setClicked] = useState<number | null>(null);
  const contentEl = useRef<HTMLDivElement>(null);

  // const handleOpen = (body: string, player: PLAYER) => {
  //   setRollBody(body)
  //   setCoPlayer(player)
  //   setIsOpen(true)
  // }
  // const handleClose = () => {
  //   setIsOpen(false)
  // }

  const handleClick = (index: number) => {
    if (clicked === index) {
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
          <AvatarStatePositionMarker  position={player.position} key={player.id}/>
        </div>
        <div onClick={()=>handleClick(index)} className={styles.player__avatar} style={ExistCodStyle(player)}>
          <div className={styles.player__avatar_position}>{PositionName(player)}</div>
          <div className={styles.player__avatar_name}>
            {player.player_name}
          </div>
        </div>
        <div
          ref={contentEl}
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
          {!player.cause_of_death 
          ? <PlayerBoardComingOut playerId={player.id} setClicked={setClicked}/>
          :(
          // ここ修正 
          <div style={{position: 'absolute'}}>
            <div>
              EditComingOut
            </div>
            <div>
              useAbility
            </div>
          </div>
          )
          }
        </div>
      </div>
      ))}
      {/* <ModalMain 
        isOpen={isOpen} 
        handleClose={handleClose}
        body={rollBody}
        coPlayer={coPlayer}
      /> */}
    </div>    
  )
}

export default PlayerBoardAvatar