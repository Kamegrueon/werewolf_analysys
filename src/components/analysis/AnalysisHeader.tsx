import React from 'react'
import styles from "./Analysis.module.css"
import MenuIcon from '@mui/icons-material/Menu';

const MenuIconStyle = { 
  bgcolor: '#363C43',
  color: '#DADADA',
  display: 'block',
  borderRadius: 0.8,
  p: 1.25,
  width: 40,
  height: 40
}

const AnalysisHeader: React.FC = () => {
  return (
    <header className={styles.analysis__header}>
      <div className={styles.analysis__title}>WereWolf Analysis</div>
      <MenuIcon sx={MenuIconStyle} />
    </header>
  )
}

export default AnalysisHeader