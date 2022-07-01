import { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import TagsInput from '../../utils/TagsInput';
import CheckBoxList from '../../utils/CheckBoxList';

const ModalCreateGame = () => {

  const [gameName, setGameName] = useState('')
  const [positionIds, setPositionIds] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([])

  const handleSelectedTags = (players: string[]) => {
    setPlayers(players)
  }

  const TextFieldStyle = {
    '#outlined-basic-label': {color: 'white'},
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
    '&:hover fieldset': {
      borderColor: 'white',
      },
    },
    '#outlined-basic': {color: 'white'},
   }

  const onClickSubmit = () => {
    console.log(gameName, positionIds, players)
  }


  return (
    <div style={{color: 'white',textAlign: 'center'}}>
      <h2>New Game</h2>
      <form>
        <div>
          <FormControl style={{width: 700}}>
            <h3>ゲーム名を入力してください</h3>
            <TextField 
              id="outlined-basic" 
              label="ゲーム名を入力してください" 
              value={gameName}
              onChange={e=>{setGameName(e.target.value)}}
              sx={TextFieldStyle}
            />
          </FormControl>
        </div>
        <div>
          <FormControl style={{width: 700}}>
            <h3>参加者を入力してください</h3>
            <TagsInput
              selectedTags={handleSelectedTags}
              fullWidth
              variant="outlined"
              id="tags"
              name="tags"
              placeholder="プレイヤー名を入力してください"
              label="player"
            />
          </FormControl>
        </div>
        <div>
          <FormControl style={{width: 700}}>
            <h3>役職を選択してください</h3>
            <CheckBoxList positionIds={positionIds} setPositionIds={setPositionIds}/>
          </FormControl>
        </div>
        <Button
          variant="contained"
          onClick={onClickSubmit}
          style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginLeft: 21}}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  )
}

export default ModalCreateGame