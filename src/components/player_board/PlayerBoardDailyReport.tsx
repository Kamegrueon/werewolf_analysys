import { useEffect, useState } from 'react'
import styles from './PlayerBoard.module.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import SelectMain from '../select/SelectMain'
import ModalMain from '../modal/ModalMain';
import { useSelector } from 'react-redux';
import { selectDailies, selectPlayerDate } from '../../reducers/playerSlice';

const PlayerBoardDailyReport = () => {
  
  const daily_button_style = {
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    width: 180,
    mr: 2
  }

  const [isOpen, setIsOpen] = useState(false);
  const [reportBody, setReportBody] = useState('');

  const dailies = useSelector(selectDailies)
  const playerDate = useSelector(selectPlayerDate)
  const [isExistReport, setIsExistReport] = useState(false)

  useEffect(() => {
    let maxDateProgress = String(dailies.map((date) => date.date_progress).reduce((pre, cur) => Math.max(pre, cur)))
    let isExistReport = maxDateProgress === '1' ? false : playerDate !== maxDateProgress
    setIsExistReport(isExistReport)

    return () => { 
      console.log('DailyReportがアンマウントされた')
    };
  },[dailies, playerDate])


  const handleOpen = (body: string) => {
    setReportBody(body)
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
      {isExistReport
      ? ( 
        <div className={styles.player__daily_button}>
          <Button onClick={()=>handleOpen('editReport')} variant="contained" sx={daily_button_style} endIcon={<EditIcon />}>
            Edit Report
          </Button>
        </div>
      )
      : (
        <div className={styles.player__daily_button}>
          <Button onClick={()=>handleOpen('createReport')} variant="contained" sx={daily_button_style} endIcon={<AddIcon />}>
            Create Report
          </Button>
        </div>
        )
      }
      <ModalMain 
        isOpen={isOpen} 
        handleClose={handleClose}
        body={reportBody}
      />
    </div>
  )
}

export default PlayerBoardDailyReport