import { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerDate, selectPlayers } from '../../reducers/playerSlice';
import { fetchAsyncCreateReport, selectDailies } from '../../reducers/playerSlice';
import { AppDispatch } from '../../store';

const ModalCreateReport = (props: {handleClose: () => void} ) => {

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
  const dispatch: AppDispatch = useDispatch()

  const [executedPlayerId, setExecutedPlayerId] = useState<string>('')
  const [murderedPlayerId, setMurderedPlayerId] = useState<string | null>(null)
  const [perishedPlayerId, setPerishedPlayerId] = useState<string | null>(null)

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
    // daily_idをフィルターで取得してpostする
    const dailyId = dailies.filter(daily => String(daily.date_progress) === String(playerDate))[0].id
    if(executedPlayerId !== ''){
      dispatch(fetchAsyncCreateReport(
        {
          dailyId: dailyId,
          executedPlayerId: executedPlayerId, 
          murderedPlayerId: murderedPlayerId,
          perishedPlayerId: perishedPlayerId
        }))
      props.handleClose()
    }
  }

  return (
    <div style={{color: 'white',textAlign: 'center'}}>
      <h2>DAILY REPORT</h2>
      <form>
        <div>
          <FormControl>
            <h3>処刑された人</h3>
            <Select
              sx={select_days_style}
              value={executedPlayerId ?? ''}
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
            .map((player) => 
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
            {players.filter(player => player.cause_of_death === null && String(player.id) !== String(executedPlayerId) && String(player.id) !== String(murderedPlayerId))
            .map((player) => 
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

export default ModalCreateReport