import { useContext, useEffect, useState } from 'react'
import { comingOutCreateRequest } from '../../utils/ApiFetch'
import { AxiosError} from 'axios'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { selectCastings } from '../../reducers/gameSlice';
import { selectDailies, selectPlayerDate } from '../../reducers/playerSlice';
import { RerenderContext } from '../../utils/AnalysisContext';
import { filteringDailyId } from '../../utils/UtilsFC';

interface Props {
  playerId: string;
  setClicked: React.Dispatch<React.SetStateAction<number | null>>;
  contentRefs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  index: number; 
  clicked: number | null;
}

interface CreateCoResponse {
  data: {
    daily_id: number
    id: number
    player_id: number
    roll_name: string
    created_at: string
    updated_at: string
  }
}

const PlayerBoardComingOut: React.FC<Props> = ({playerId, setClicked, contentRefs, index, clicked}) => {

  const select_days_style = {
    width: '100%',
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    textAlign: 'center'
  }

  useEffect(()=>{
    if (contentRefs && contentRefs.current[index].current){
      contentRefs.current[index].current?.scrollIntoView({block: "end", inline: "end"})
    }
  },[clicked, contentRefs, index])

  const castings = useSelector(selectCastings)
  const playerDate = useSelector(selectPlayerDate)
  const dailies = useSelector(selectDailies)
  
  const { renderState, rerender } = useContext(RerenderContext)
  const [comingOutRoll, setComingOutRoll] = useState<string>('')

  const handleChangeComingOutRoll = (event: SelectChangeEvent) => {

    setComingOutRoll(event.target.value)
    console.log(event.target.value)
  }

  const onClickSubmit = (playerId: string) => {
    const dailyId = filteringDailyId(dailies,playerDate)
    if(comingOutRoll !== ''){
      comingOutCreateRequest(dailyId, comingOutRoll, playerId).then((res: CreateCoResponse) => {
        console.log(res.data)
        setComingOutRoll('')
        setClicked(null)
        rerender(renderState + 1)
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
    <div style={{color: 'white',textAlign: 'center',margin:20, position: 'absolute', zIndex: 10}}>
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
          onClick={()=>onClickSubmit(playerId)}
          style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 20}}
        >
          この役職を記録する
        </Button>
      </form>
    </div>
  )
}

export default PlayerBoardComingOut