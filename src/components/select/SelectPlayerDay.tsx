import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerDate, setSelectPlayerDate } from '../../reducers/playerSlice';
import { AppDispatch } from '../../store';
import { selectDailies } from '../../reducers/playerSlice';

const SelectPlayerDay: React.FC = () => {

  const dispatch: AppDispatch = useDispatch()
  const playerDate = useSelector(selectPlayerDate)
  const dailies = useSelector(selectDailies)

  const days_style = { margin: "0 20px 0 auto" }
  const label_style = { color: "#FFFFFF" , fontWeight: 800}

  const select_days_style = {
    width: 165,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    paddingLeft: 5
  }

  const handleChange = (event: SelectChangeEvent) => {
      dispatch(setSelectPlayerDate(event.target.value))
  }

   console.log('selectPlayerDay', playerDate)

  return (
    <div style={days_style}>
      <div style={label_style}>
        Date
      </div>
      <FormControl>
        <Select
          sx={select_days_style}
          native={true}
          value={playerDate}
          onChange={handleChange}
        >
         {dailies.map((daily, index) => 
          <option value={`${daily.date_progress}`} key={`${index}`}>{`${daily.date_progress}`}日目</option>
        )}
        </Select>     
      </FormControl>
    </div>
  )
}

export default SelectPlayerDay