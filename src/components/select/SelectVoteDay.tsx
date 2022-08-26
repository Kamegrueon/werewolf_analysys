import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from 'react-redux';
import { selectVoteDate, setSelectVoteDate } from '../../reducers/voteSlice';
import { selectDailies } from '../../reducers/gameSlice';
import { AppDispatch } from '../../store';

const SelectVoteDay = () => {

  const voteDate = useSelector(selectVoteDate)
  const dailies = useSelector(selectDailies)

  // const dailies = useContext(DailiesContext)
  const dispatch: AppDispatch = useDispatch()

  const days_style = { margin: "0 20px 0 auto" }
  const label_style = { color: "#FFFFFF" , fontWeight: 800}

  const select_days_style = {
    width: 90,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
  }
  
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSelectVoteDate(event.target.value))
  }

  return (
    <div style={days_style}>
      <div style={label_style}>
        Date
      </div>
      <FormControl>
        <Select
          sx={select_days_style}
          native={true}
          value={voteDate}
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

export default SelectVoteDay