import { useState, useContext, useEffect } from 'react'
import { PlayersContext, DailiesContext, SelectPlayerBoardDateContext } from '../../utils/AnalysisContext'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { dailyReportsUpdateRequest, dailyReportsIndexRequest } from '../../utils/ApiFetch'


const ModalEditReport = (props: any ) => {

  const select_days_style = {
    width: 165,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  const players = useContext(PlayersContext)
  const { selectPlayerDate } = useContext(SelectPlayerBoardDateContext)
  const dailies = useContext(DailiesContext)

  const [executedPlayerId, setExecutedPlayerId] = useState<string>('')
  const [murderedPlayerId, setMurderedPlayerId] = useState<string | null>('')
  const [perishedPlayerId, setPerishedPlayerId] = useState<string | null>('')

  const daily_id = dailies.filter(daily => String(daily.date_progress) === String(selectPlayerDate))[0].id
  
  useEffect(() => {
    dailyReportsIndexRequest(daily_id).then((res: any) => {
      setExecutedPlayerId(res.data.executed_player_id)
      if(res.data.murdered_player_id !== null) setMurderedPlayerId(res.data.murdered_player_id);
      if(res.data.perished_player_id !== null) setPerishedPlayerId(res.data.perished_player_id);
    })
  },[daily_id])

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
    const daily_id = dailies.filter(daily => String(daily.date_progress) === String(selectPlayerDate))[0].id
    if(executedPlayerId !== ''){
      dailyReportsUpdateRequest( 
        daily_id,
        executedPlayerId, 
        murderedPlayerId,
        perishedPlayerId
      ).then((res: any) => {
        props.handleClose(false)
      }).catch((error: any)  => {
        alert(error.response.data.title)
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
              value={executedPlayerId as any}
              onChange={handleChangeExecutedPlayer}
            >
            {players.map((player) => 
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
              value={murderedPlayerId as any}
              onChange={handleChangeMurderedPlayer}
            >
              <MenuItem value={'0'} >ー</MenuItem>
            {players.map((player) => 
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
              value={perishedPlayerId as any}
              onChange={handleChangePerishedPlayer}
            >
              <MenuItem value={'0'} >ー</MenuItem>
            {players.map((player) => 
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