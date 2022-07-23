import { useContext, useState } from 'react'
import { CastingsContext, DailiesContext, SelectPlayerBoardDateContext } from '../../utils/AnalysisContext'
import { comingOutCreateRequest } from '../../utils/ApiFetch'
import { AxiosError} from 'axios'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const PlayerBoardComingOut = (props: {playerId: string, setClicked: React.Dispatch<React.SetStateAction<number | null>>}) => {

  const select_days_style = {
    width: '100%',
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  const castings = useContext(CastingsContext)
  const { selectPlayerDate } = useContext(SelectPlayerBoardDateContext)  
  const dailies = useContext(DailiesContext)

  const [comingOutRoll, setComingOutRoll] = useState<string | null>(null)

  const handleChangeComingOutRoll = (event: SelectChangeEvent) => {
    setComingOutRoll(event.target.value)
    console.log(event.target.value)
  }

  const onClickSubmit = (playerId: string) => {
    // daily_idをフィルターで取得してpostする
    const dailyId = dailies.filter(daily => String(daily.date_progress) === String(selectPlayerDate))[0].id
    if(comingOutRoll !== ''){
      comingOutCreateRequest(dailyId, comingOutRoll, playerId).then((res: any) => {
        console.log(res.data)
        props.setClicked(null)
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
    <div style={{color: 'white',textAlign: 'center',margin:20, position: 'absolute'}}>
      <form>
        <FormControl>
          <div style={{color: 'white'}}>Coする役職を選択してください</div>
          <Select
            sx={select_days_style}
            value={comingOutRoll ?? ''}
            onChange={handleChangeComingOutRoll}
          >
          {castings
          .map(casting => 
            <MenuItem value={casting.roll_name} key={casting.id}>{casting.roll_name}</MenuItem>
          )}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={()=>onClickSubmit(props.playerId)}
          style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 20}}
        >
          この役職を記録する
        </Button>
      </form>
    </div>
  )
}

export default PlayerBoardComingOut