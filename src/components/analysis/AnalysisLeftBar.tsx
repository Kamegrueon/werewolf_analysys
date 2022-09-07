import { Avatar, List, ListItem, ListItemIcon } from '@mui/material'
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import styles from './Analysis.module.css'
import { NavLink, useLocation } from 'react-router-dom';
import { selectGameId } from '../../reducers/gameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { setSelectPlayerDate } from '../../reducers/playerSlice';
import { setSelectVoteDate } from '../../reducers/voteSlice';

const AnalysisLeftBar: React.FC = () => {  
  const location = useLocation();
  const path = location.pathname;
  const dispatch: AppDispatch = useDispatch()
  const gameId = useSelector(selectGameId)

  const resetSelectDate = () => {
     dispatch(setSelectPlayerDate('1'))
     dispatch(setSelectVoteDate('1'))
  }

  const LeftListItemStyle = {backgroundColor: 'white', borderRadius: 2, mb: 3, pointerEvents: 'none'}

  return (
    <div className={styles.left_bar__main}>
      <div className={styles.left_bar__avatar}>
        <Avatar />
      </div>
      <List>
        <NavLink exact to="/games" onClick={resetSelectDate}>
          {/* ここ修正 */}
          <ListItem sx={path === "/games" ? LeftListItemStyle : {mb: 3}}>
            <ListItemIcon >
              <FeaturedPlayListIcon fontSize="large" sx={{color: '#545F69'}}/>
            </ListItemIcon>
          </ListItem>
        </NavLink>
        {gameId !== '' 
        ? (<NavLink exact to="/board">
            <ListItem sx={path === "/board" ? LeftListItemStyle : {mb: 3}}>
              <ListItemIcon>
                <DesktopMacIcon fontSize="large" sx={{color: '#545F69'}}/>
              </ListItemIcon>
            </ListItem>
          </NavLink>)
       : (<NavLink exact to="/games">
          {/* ここ修正 */}
            <ListItem sx={path === "/board" ? LeftListItemStyle : {mb: 3}}>
              <ListItemIcon>
                <DesktopMacIcon fontSize="large" sx={{color: '#545F69'}}/>
              </ListItemIcon>
            </ListItem>
          </NavLink>
        )}
      </List>
    </div>
  )
}

export default AnalysisLeftBar