import React, { useState, useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import DailyContext from '../contexts/DailyContext'
import { SELECT_STYLE_PROP } from '../types'


const SelectDaily: React.FC<SELECT_STYLE_PROP> = (props) => {

  const select_days_style = { margin: "0 20px 0 auto" }
  const select_label_style = { color: "#FFFFFF" , fontWeight: 800}
  
  const date_progresses = useContext(DailyContext)

  const [days, setDays] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value as any)
}
  return (
    <div style={select_days_style}>
      <div style={select_label_style}>
        日付
      </div>
      <FormControl>
        <Select
          sx={props.select_days}
          id='select-days'
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