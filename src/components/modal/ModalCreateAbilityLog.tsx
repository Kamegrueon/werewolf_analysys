import { useState, useContext } from 'react';
import { abilityLogsCreateRequest } from '../../utils/ApiFetch'
import { AxiosResponse,AxiosError} from 'axios'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { AbilityLogsContext, DailiesContext, PlayersContext, SelectPlayerBoardDateContext } from '../../utils/AnalysisContext';
import { InputLabel } from '@mui/material';
import { ABILITY_LOG } from '../types';

const ModalCreateAbilityLog = (props: {coId: string | null | undefined, handleClose: () => void}) => {

  const select_style = {
    width: '100%',
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  const [abilityResult, setAbilityResult] = useState<string>('')
  const [targetPlayerId, setTargetPlayerId] = useState<string>('')
  const players = useContext(PlayersContext)
  const dailies = useContext(DailiesContext)
  const {setAbilityLogs} = useContext(AbilityLogsContext)

  const {selectPlayerDate} = useContext(SelectPlayerBoardDateContext)

  const handleChangeAbilityResult = (event: SelectChangeEvent<string>) => {
    setAbilityResult(event.target.value)
    console.log(event.target.value)
  }

  const handleChangeTargetPlayer = (event: SelectChangeEvent<string>) => {
    setTargetPlayerId(event.target.value)
    console.log(event.target.value)
  }

  const onClickSubmit = (coId: string | null | undefined) => {
    const dailyId = dailies.filter(daily => String(daily.date_progress) === String(selectPlayerDate))[0].id
    if(abilityResult !== '' && targetPlayerId !== '' && coId !== null){
      abilityLogsCreateRequest(coId, targetPlayerId, dailyId, abilityResult).then((res: AxiosResponse<ABILITY_LOG[]>) => {
        setAbilityLogs(res.data)
        setAbilityResult('')
        setTargetPlayerId('')
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
    <div style={{color: 'white',textAlign: 'center', marginTop: 20, marginLeft: 'auto', marginRight: 'auto', width:200, zIndex: 10}}>
    役職のアクション結果
    <form  style={{marginTop: 8}}>
        <FormControl style={{display: 'block'}}>
          <InputLabel shrink style={{color: 'white'}}>対象者</InputLabel>
          <Select
            native={true}
            value={targetPlayerId}
            onChange={handleChangeTargetPlayer}
            sx={select_style}
            style={{marginTop: 7, marginBottom: 15}}
          >
            <option value={''} key={''}></option>
          {players.map(player =>
            <option value={player.id} key={player.id}>{player.player_name}</option>
          )}
          </Select>
        </FormControl>
        <FormControl style={{display: 'block'}}>
          <InputLabel shrink style={{color: 'white'}}>結果</InputLabel>
          <Select
            native={true}
            sx={select_style}
            value={abilityResult}
            onChange={handleChangeAbilityResult}
            style={{marginTop: 7}}
          >
            <option value={''}></option>
            <option value='白'>白</option>
            <option value='黒'>黒</option>
          </Select>
        </FormControl>
      <Button
        variant="contained"
        onClick={()=>onClickSubmit(props.coId)}
        style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 20}}
      >
        結果を記録する
      </Button>
    </form>
  </div>
  )
}

export default ModalCreateAbilityLog