import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalMain from '../modal/ModalMain';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { selectGames, fetchAsyncGetGames, fetchAsyncDeleteGames, setSelectGame } from "../../reducers/gameSlice";
import { AppDispatch } from '../../store';
import { GAME } from '../types';
import { selectCurrentUser } from '../../reducers/userSlice';

const GameMain: React.FC = memo(() => {

  const dispatch: AppDispatch = useDispatch()
  const games = useSelector(selectGames)
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(fetchAsyncGetGames(String(currentUser.id)))

    return () => { 
      console.log('GameMainがアンマウントされた')
    };

  },[dispatch, currentUser])

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor: '#bdbdbd', color: '#1F2327', ml: 137, mt: 5, mb: 3}} endIcon={<AddIcon />}>
          New Game
        </Button>
      {games.length ? (
      <TableContainer component={Paper} style={{ background: '#292E33' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Game Name</TableCell>
            <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Play Date</TableCell>
            <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game: GAME) => (
            <TableRow
              key={game.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{color: 'white'}}>
              <Link 
                to={{pathname: `/board/`}} 
                style={{textDecoration: 'none', color: 'inherit'}} 
                onClick={() => {dispatch(setSelectGame(game.id))}}
              >
                  {game.game_name}
              </Link>
              </TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{dayjs(game.created_at).locale('ja').format('YYYY/MM/DD(dd)')}</TableCell>
              <TableCell><DeleteOutlineIcon sx={{color: 'white'}} 
                onClick={()=>{dispatch(fetchAsyncDeleteGames(game.id))}}
              /></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      ) : <></> }
    <ModalMain 
        isOpen={isOpen} 
        handleClose={handleClose}
        body='createGame'
      />
    </>
  )
})

export default GameMain