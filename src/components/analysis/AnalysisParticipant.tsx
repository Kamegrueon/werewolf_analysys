import React, { useState } from 'react'
import styles from './Analysis.module.css'
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const avatar = {
  mt: 1.875,
  mx: 'auto',
  width: 100,
  height: 100
}

const select_days = {
  width: 150,
  height: 30,
  color: '#1F2327',
  bgcolor: '#bdbdbd',
  // textDecoration: 'none',
}

const AnalysisParticipant: React.FC = () => {
  const [days, setDays] = React.useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value as any)
  }

  return (
    <div className={styles.participant__main}>
      <div className={styles.participant__above_bar}>
        <div className={styles.participant__title}>
          参加者
        </div>
        <div className={styles.participant__select_days}>
        <div className={styles.participant__label}>経過日数</div>
          <FormControl>
          {/* <InputLabel sx={{ color: '#1F2327' }} id='select-days'></InputLabel> */}
            <Select
              sx={select_days}
              id='select-days'
              value={days as any}
              // label="経過日数"
              onChange={handleChange}
            >
              <MenuItem value={1}>１日目</MenuItem>
              <MenuItem value={2}>２日目</MenuItem>
              <MenuItem value={3}>３日目</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.participant__users}>
        <div className={styles.participant__user}>
          <Avatar sx={avatar} alt='avatar' />
          <div className={styles.participant__user_name}>
            Name
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisParticipant