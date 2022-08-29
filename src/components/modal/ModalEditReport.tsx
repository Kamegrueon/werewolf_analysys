import { useState, useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { causeOfDeathsUpdateRequest } from '../../utils/ApiFetch'
import {AxiosResponse, AxiosError} from 'axios'
import { useSelector } from 'react-redux';
import { selectDailies, selectDailyCod, selectPlayerDate, selectPlayers } from '../../reducers/playerSlice';
import { RerenderContext } from '../../utils/AnalysisContext';

const ModalEditReport = (props: any ) => {

  const select_days_style = {
    width: 165,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  const players = useSelector(selectPlayers)
  const playerDate = useSelector(selectPlayerDate)
  const dailies = useSelector(selectDailies)
  const dailyCod = useSelector(selectDailyCod)

  const [executedPlayerId, setExecutedPlayerId] = useState<string>(dailyCod.executed_player_id)
  const [murderedPlayerId, setMurderedPlayerId] = useState<string | null>(dailyCod.murdered_player_id)
  const [perishedPlayerId, setPerishedPlayerId] = useState<string | null>(dailyCod.perished_player_id)

  const { renderState, rerender } = useContext(RerenderContext)


  const handleChangeExecutedPlayer = (event: SelectChangeEvent) => {
    setExecutedPlayerId(event.target.value)
  }

  const handleChangeMurderedPlayer = (event: SelectChangeEvent) => {
    setMurderedPlayerId(event.target.value === '0' ? null : event.target.value)
  }

  const handleChangePerishedPlayer = (event: SelectChangeEvent) => {
    setPerishedPlayerId(event.target.value === '0' ? null : event.target.value)
  }

  const onClickSubmit = () => {
    const daily_id = dailies.filter(daily => String(daily.date_progress) === String(playerDate))[0].id
    if(executedPlayerId !== ''){
      causeOfDeathsUpdateRequest( 
        daily_id,
        executedPlayerId, 
        murderedPlayerId,
        perishedPlayerId
      ).then((res: AxiosResponse) => {
        props.handleClose(false)
        rerender(renderState + 1)
      }).catch((error: AxiosError<{ error: string }>)  => {
        if (error.response !== undefined){
          alert(error.response.data.error)
        }
      })
    }else{
      alert('処刑された人を選択してください')
    }
  }

  return (
    <div style={{color: 'white',textAlign: 'center'}}>
      <h2>Edit</h2>
      <form>
        <div>
          <FormControl>
            <h3>処刑された人</h3>
            <Select
              sx={select_days_style}
              value={executedPlayerId ?? '0'}
              onChange={handleChangeExecutedPlayer}
            >
            {players.filter(player => player.cause_of_death === null && String(player.id) !== String(murderedPlayerId) && String(player.id) !== String(perishedPlayerId))
            .map(player => 
              <MenuItem value={player.id} key={player.id}>{player.player_name}</MenuItem>
            )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <h3>殺害された人</h3>
            <Select
              sx={select_days_style}
              value={murderedPlayerId ?? '0'}
              onChange={handleChangeMurderedPlayer}
            >
              <MenuItem value={'0'} >該当者なし</MenuItem>
            {players.filter(player => player.cause_of_death === null && String(player.id) !== String(executedPlayerId) && String(player.id) !== String(perishedPlayerId))
            .map(player => 
              <MenuItem value={player.id} key={player.id}>{player.player_name}</MenuItem>
            )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <h3>突然死した人</h3>
            <Select
              sx={select_days_style}
              value={perishedPlayerId ?? '0'}
              onChange={handleChangePerishedPlayer}
            >
              <MenuItem value={'0'} >該当者なし</MenuItem>
            {players.filter(player => player.cause_of_death === null && String(player.id) !== String(executedPlayerId) && String(player.id) !== String(perishedPlayerId))
            .map(player => 
              <MenuItem value={player.id} key={player.id}>{player.player_name}</MenuItem>
            )}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          onClick={onClickSubmit}
          style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 130}}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  )
}

export default ModalEditReport