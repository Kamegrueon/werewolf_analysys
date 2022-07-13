import { useState, useContext, useEffect } from 'react'
import { DailiesContext, SelectPlayerBoardDateContext } from '../../utils/AnalysisContext'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { rollIndexRequest, comingOutCreateRequest } from '../../utils/ApiFetch'
import {AxiosResponse, AxiosError} from 'axios'
import { DAILIES, ROLL } from '../types';
import { GameSelectContext } from '../../utils/AnalysisContext'

const ModalCreateComingOut = (props: any ) => {
  const select_days_style = {
    width: '100%',
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  const {handleClose, coPlayer} = props

  const { gameSelect } = useContext(GameSelectContext)
  const [rolls, setRolls] = useState<ROLL[]>([])
  const { selectPlayerDate, setSelectPlayerDate } = useContext(SelectPlayerBoardDateContext)  
  const dailies = useContext(DailiesContext)

  const [comingOutRoll, setComingOutRoll] = useState<string>('')

  useEffect(() => {
    rollIndexRequest(gameSelect).then((res: AxiosResponse) => {
      console.log('rolls',res.data)
      setRolls(res.data)
    })
  },[])

  const handleChangeComingOutRoll = (event: SelectChangeEvent) => {
    setComingOutRoll(event.target.value)
    console.log(event.target.value)
  }

  const onClickSubmit = () => {
    // daily_idをフィルターで取得してpostする
    const dailyId = dailies.filter(daily => String(daily.date_progress) === String(selectPlayerDate))[0].id
    if(comingOutRoll !== ''){
      comingOutCreateRequest(dailyId, comingOutRoll, coPlayer.id).then((res: any) => {
        console.log(res.data)
        handleClose(false)
      }).catch((error: AxiosError<{ error: string }>)  => {
        if (error.response !== undefined){
          alert(error.response.data.error)
        }
      })
    }else{
      alert('役職を選択してください')
    }
  }

  return (
    <div style={{color: 'white',textAlign: 'center'}}>
      <h2>Create Coming Out</h2>
      <form>
        <div>
          <FormControl>
            <h3>Coする役職を選択してください</h3>
            <Select
              sx={select_days_style}
              value={comingOutRoll ?? ''}
              onChange={handleChangeComingOutRoll}
            >
            {rolls
            .map(roll => 
              <MenuItem value={roll.roll_name} key={roll.id}>{roll.roll_name}</MenuItem>
            )}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          onClick={onClickSubmit}
          style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 20}}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  )
}

export default ModalCreateComingOut