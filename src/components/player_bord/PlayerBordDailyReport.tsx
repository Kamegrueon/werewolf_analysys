import React from 'react'
import styles from './PlayerBord.module.css'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DAILIES } from '../types'

const PlayerBordDailyReport: React.FC<DAILIES> = (props) => {
  const select_days = {
    width: 150,
    height: 30,
    color: '#1F2327',
    bgcolor: '#bdbdbd',
  }

  const [days, setDays] = React.useState(1);
  
  const handleChange = (event: SelectChangeEvent) => {
      setDays(event.target.value as any)
  }
  
  return (
    <div className={styles.player__daily_reports}> 
    <div className={styles.player__select_days}>
      <div className={styles.player__label}>
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
         {props.date_progresses.map((date_progress, ) => 
          <MenuItem value={date_progress} key={date_progress}>{date_progress}日目</MenuItem>
        )}
        </Select>
      </FormControl>
    </div>
    <div className={styles.player__button}>
      <Button variant="contained" sx={{color: '#1F2327', bgcolor: '#bdbdbd'}} endIcon={<AddIcon />}>
        Daily Report
      </Button>
    </div>
    <div className={styles.player__button}>
      <Button variant="contained" sx={{color: '#1F2327', bgcolor: '#bdbdbd'}} endIcon={<EditIcon />}>
        Edit Report
      </Button>
    </div>
  </div>
  )
}

export default PlayerBordDailyReport