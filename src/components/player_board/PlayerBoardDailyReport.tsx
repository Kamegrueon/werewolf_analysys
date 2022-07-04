import { useState } from 'react'
import styles from './PlayerBoard.module.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import SelectMain from '../select/SelectMain'
import ModalMain from '../modal/ModalMain';

const PlayerBoardDailyReport = () => {
  
  const daily_button_style = {
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    width: 165,
    mr: 2
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true)
    const elements:any = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC");
    Object.keys(elements).forEach((index: string) => {elements[index].style.zIndex = 0})
  }

  const handleClose = () => {
    setIsOpen(false)
    const elements:any = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC");
    Object.keys(elements).forEach((index: string) => {elements[index].style.zIndex = 5})
  }


  return (
    <div className={styles.player__daily_reports}> 
      <SelectMain body={'playerDay'}/>
      <div className={styles.player__daily_button}>
        <Button onClick={handleOpen} variant="contained" sx={daily_button_style} endIcon={<AddIcon />}>
          Daily Report
        </Button>
      </div>
      <div className={styles.player__daily_button}>
        <Button variant="contained" sx={daily_button_style} endIcon={<EditIcon />}>
          Edit Report
        </Button>
      </div>
      <ModalMain 
        isOpen={isOpen} 
        handleClose={handleClose}
        body='createReport'
      />
    </div>
  )
}

export default PlayerBoardDailyReport