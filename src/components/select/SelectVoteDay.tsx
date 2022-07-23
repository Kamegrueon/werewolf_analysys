import { useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DailiesContext } from '../../utils/AnalysisContext'
import { SelectVoteBoardDateContext } from '../../utils/AnalysisContext';

const SelectVoteDay = () => {

  const { selectVoteDate, setSelectVoteDate } = useContext(SelectVoteBoardDateContext)
  const dailies = useContext(DailiesContext)

  const days_style = { margin: "0 20px 0 auto" }
  const label_style = { color: "#FFFFFF" , fontWeight: 800}

  const select_days_style = {
    width: 90,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
  }
  
  const handleChange = (event: SelectChangeEvent) => {
    setSelectVoteDate(event.target.value)
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
          value={selectVoteDate}
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