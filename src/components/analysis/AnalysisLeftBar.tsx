import { Avatar, List, ListItem, ListItemIcon } from '@mui/material'
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { useContext } from 'react'
import { GameSelectContext, SelectPlayerBoardDateContext, SelectVoteBoardDateContext } from '../../utils/AnalysisContext';
import styles from './Analysis.module.css'
import { NavLink, useLocation } from 'react-router-dom';

const AnalysisLeftBar = () => {  
  const location = useLocation();
  const path = location.pathname;

  const { gameSelect } = useContext(GameSelectContext)
  const { setSelectPlayerDate } = useContext(SelectPlayerBoardDateContext)
  const { setSelectVoteDate } = useContext(SelectVoteBoardDateContext)

  const resetSelectDate = () => {
    setSelectPlayerDate('1')
    setSelectVoteDate('1')
  }

  const LeftListItemStyle = {backgroundColor: 'white', borderRadius: 2, mb: 3, pointerEvents: 'none'}

  return (
    <div className={styles.left_bar__main}>
      <div className={styles.left_bar__avatar}>
        <Avatar />
      </div>
      <List>
        <NavLink exact to="/games/" onClick={resetSelectDate}>
          <ListItem button sx={path === "/games/" ? LeftListItemStyle : {mb: 3}}>
            <ListItemIcon >
              <FeaturedPlayListIcon fontSize="large" sx={{color: '#545F69'}}/>
            </ListItemIcon>
          </ListItem>
        </NavLink>
        <NavLink exact to={`/games/${gameSelect}`}>
          <ListItem button sx={path.match(/games\/\d/) ? LeftListItemStyle : {mb: 3}}>
            <ListItemIcon>
              <DesktopMacIcon fontSize="large" sx={{color: '#545F69'}}/>
            </ListItemIcon>
          </ListItem>
        </NavLink>
      </List>
    </div>
  )
}

export default AnalysisLeftBar