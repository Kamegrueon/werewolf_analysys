import React, { useState, useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import DailyContext from '../contexts/DailyContext'

const SelectDaily: React.FC = () => {

  const select_days_style = { margin: "0 20px 0 auto" }
  const select_label_style = { color: "#FFFFFF" }
  

  const date_progresses = useContext(DailyContext)

  const select_days = {
    width: 165,
    height: 30,
    color: '#1F2327',
    bgcolor: '#bdbdbd',
  }

  const [days, setDays] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value as any)
}
  return (
    <div style={select_days_style}>
      <div style={select_label_style}>
        経過日数
      </div>
      <FormControl>
        <Select
          sx={select_days}
          id='select-days'
          value={days as any}
          // label="経過日数"
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