import { useEffect } from 'react'
import Button from '@mui/material/Button';

interface Props {
  coId: string | null,
  setCoId: React.Dispatch<React.SetStateAction<string | null>>,
  setClicked: React.Dispatch<React.SetStateAction<number | null>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  contentRefs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>, 
  index: number, 
  clicked: number | null
}

const PlayerBoardSelectAbilityAction: React.FC<Props> = ({coId, setCoId, setClicked, setIsOpen, contentRefs, index, clicked}) => {

  useEffect(()=>{
    if (contentRefs && contentRefs.current[index].current){
      contentRefs.current[index].current?.scrollIntoView({block: "end", inline: "end"})
    }
  },[clicked, contentRefs, index])

  const buttonStyle = {
    backgroundColor: "#bdbdbd", 
    color: "#1F2327", 
    marginBottom: 10
  }

  const createAbilityLog = () => {
    setClicked(null)
    setCoId(coId)
    setIsOpen(true)
    const elements = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC") as HTMLCollectionOf<HTMLElement>;
    Object.keys(elements).forEach((_, index) => {elements[index].style.zIndex = '0'})
  }

  return (
    <div style={{color: 'white',textAlign: 'center'}}>
      <h2>アクションの選択</h2>
      <Button
        variant="contained"
        onClick={()=>createAbilityLog()}
        style={buttonStyle}
      >
        能力結果を登録する
      </Button>
      {/* <Button
        variant="contained"
        onClick={()=>{}}
        style={buttonStyle}
      >
        能力結果を修正する
      </Button> */}
      {/* <Button
        variant="contained"
        onClick={()=>{}}
        style={buttonStyle}
      >
        能力結果を削除する
      </Button> */}
      <Button
        variant="contained"
        onClick={()=>{}}
        style={buttonStyle}
      >
        役職を削除する
      </Button>
    </div>
  )
}

export default PlayerBoardSelectAbilityAction