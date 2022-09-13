import React from 'react'
import styles from "./Analysis.module.css"
// import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSignedIn, signOut } from '../../reducers/userSlice';
import { AppDispatch } from '../../store';
import { setSelectGame } from '../../reducers/gameSlice';

const MenuIconStyle = { 
  backgroundColor: '#363C43',
  color: '#DADADA',
  display: 'block',
  borderRadius: 0.8,
  p: 0.5,
  width: 40,
  height: 40
}



const AnalysisHeader: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const isSignedIn = useSelector(selectIsSignedIn)

  return (
    <header className={styles.analysis__header}>
      <div className={styles.analysis__title}>WereWolf Analysis</div>
      {isSignedIn 
        ? <ExitToAppIcon sx={MenuIconStyle} onClick={()=>{
            dispatch(signOut())
            dispatch(setSelectGame(''))
          }} /> 
        : <></>}
    </header>
  )
}

export default AnalysisHeader