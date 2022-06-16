import React, { useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import DailyContext from '../contexts/DailyContext'
import { DAILIES } from '../types'


const SelectDaily = (props: DAILIES) => {

  const days_style = { margin: "0 20px 0 auto" }
  const label_style = { color: "#FFFFFF" , fontWeight: 800}
  
  const date_progresses = useContext(DailyContext)

  const {select_days_style, days, setDays} = props.dailies_props
  // const [days, setDays] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value as any)
}
  return (
    <div style={days_style}>
      <div style={label_style}>
        Date
      </div>
      <FormControl>
        <Select
          sx={select_days_style}
          value={days as any}
          onChange={handleChange}
        >
         {date_progresses.map((date_progress) => 
          <MenuItem value={date_progress} key={date_progress}>{date_progress}日目</MenuItem>
        )}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectDaily