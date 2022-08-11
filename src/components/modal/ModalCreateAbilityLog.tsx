import { abilityLogsCreateRequest } from '../../utils/ApiFetch'
import { AxiosError} from 'axios'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { PLAYER } from '../types';

const ModalCreateAbilityLog = (props: {coPlayer: PLAYER | undefined, handleClose: () => void}) => {

  const select_days_style = {
    width: '100%',
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  const buttonStyle = {
    backgroundColor: "#bdbdbd", 
    color: "#1F2327", 
    marginBottom: 10
  }

  const [abilityResult, setAbilityResult] = useState<string>('')

  const handleChangeAbilityResult = (event: SelectChangeEvent<string>) => {
    setAbilityResult(event.target.value)
    console.log(event.target.value)
  }

  const onClickSubmit = (coPlayer: PLAYER | undefined) => {
    if(abilityResult !== '' && coPlayer !== undefined){
      abilityLogsCreateRequest(coPlayer.co_id, coPlayer.id, abilityResult).then((res: any) => {
        console.log(res.data)
        setAbilityResult('')
        props.handleClose()
      }).catch((error: AxiosError<{ error: string }>)  => {
        if (error.response !== undefined){
          alert(error.response.data.error)
        }
      })
    }else{
      alert('エラー')
    }
  }


  return (
    <div style={{color: 'white',textAlign: 'center',margin:20, position: 'absolute', zIndex: 10}}>
    <form>
      <FormControl>
        <div style={{color: 'white'}}>役職のアクション結果</div>
        {/* player contextを取得してプルダウンで選択可能にする */}
        {/* <Select
          sx={select_days_style}
          value={abilityResult}
          onChange={handleChangeAbilityResult}
        >
          <MenuItem value="白"></MenuItem>
        </Select> */}
        <Select
          sx={select_days_style}
          value={abilityResult}
          onChange={handleChangeAbilityResult}
        >
          <MenuItem value="白">白</MenuItem>
          <MenuItem value="黒">黒</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={()=>onClickSubmit(props.coPlayer)}
        style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 20}}
      >
        結果を記録する
      </Button>
    </form>
  </div>
  )
}

export default ModalCreateAbilityLog