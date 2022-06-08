import React from 'react'
import styles from './PlayerBoard.module.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import SelectDaily from '../select/SelectDaily'

const PlayerBoardDailyReport: React.FC = () => {
  
  const daily_button_style = {
    color: '#1F2327',
    bgcolor: '#bdbdbd',
    width: 165,
    mr: 2
  }

  return (
    <div className={styles.player__daily_reports}> 
      <SelectDaily />
      <div className={styles.player__daily_button}>
        <Button variant="contained" sx={daily_button_style} endIcon={<AddIcon />}>
          Daily Report
        </Button>
      </div>
      <div className={styles.player__daily_button}>
        <Button variant="contained" sx={daily_button_style} endIcon={<EditIcon />}>
          Edit Report
        </Button>
      </div>
    </div>
  )
}

export default PlayerBoardDailyReport