import { useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DateProgressesContext } from '../../utils/AnalysisContext'
import { SelectVoteBoardDateContext } from '../providers/SelectVoteBoardDateProvider';

const SelectVoteDay = () => {

  const { setSelectVoteDate } = useContext(SelectVoteBoardDateContext)
  const date_progresses = useContext(DateProgressesContext)

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
    // セットしたdailyの値でプレイヤーデータをFetch
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
          defaultValue={'1'}
          onChange={handleChange}
        >
         {date_progresses.map((date_progress: string, index: number) => 
          <option value={date_progress} key={`${index}`}>{date_progress}日目</option>
        )}
        </Select>     
      </FormControl>
    </div>
  )
}

export default SelectVoteDay