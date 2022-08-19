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
// import { GameSelectContext, RollsContext } from '../../utils/AnalysisContext';
// import { gamesIndexRequest, gamesDeleteRequest } from '../../utils/ApiFetch'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalMain from '../modal/ModalMain';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { selectGames, fetchAsyncGetGames, fetchAsyncDeleteGames, setSelectGame, fetchAsyncGetRolls } from "../../reducers/gameSlice";

const GameMain: React.FC = memo(() => {

  // const { setGameSelect } = useContext(GameSelectContext)
  // const { setRollsState } = useContext(RollsContext)

  // const [games, setGames] = useState([{id: '1', game_name: '', is_win: true, date_progress: 1, created_at: ''}])

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     await gamesIndexRequest().then(
  //       data => {
  //         setGames(data.games)
  //         setRollsState(data.rolls)
  //       }          
  //     )
  //   };
  //   fetchGames();
  // },[setRollsState])

  // ここから
  const dispatch: any = useDispatch()
  const games = useSelector(selectGames)

  useEffect(() => {
    console.log('effect呼ばれた')
    dispatch(fetchAsyncGetGames())
  },[dispatch])

  // ここまで

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // const deleteAction = (id:string) => {
  //   gamesDeleteRequest(id).then(() => {
  //     setGameSelect('')
  //     setGames(games.filter((game) => game.id !== id))
  //   })
  // }

  return (
    <>
      <h2 style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Game List</h2>
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor: '#bdbdbd', color: '#1F2327', ml: 137, mt: 2, mb: 3}} endIcon={<AddIcon />}>
          New Game
        </Button>
      <TableContainer component={Paper} style={{ background: '#292E33' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Game Name</TableCell>
            <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Play Date</TableCell>
            <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}>isWin</TableCell>
            <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Date Progress</TableCell>
            <TableCell align="right" sx={{color: 'white', fontWeight: 'bold', fontSize: 18}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game: any) => (
            <TableRow
              key={game.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{color: 'white'}}>
              <Link 
                to={{pathname: `/board/`}} 
                style={{textDecoration: 'none', color: 'inherit'}} 
                // onClick={() => setGameSelect(game.id)}
                onClick={
                  () => {dispatch(setSelectGame(game.id))}
                }
              >
                  {game.game_name}
                  {console.log('map呼ばれた')}
              </Link>
              </TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{dayjs(game.created_at).locale('ja').format('YYYY/MM/DD(dd)')}</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{game.is_win ? '勝利' : game.is_win===null ? '' :'敗北'}</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{game.date_progress}</TableCell>
              {/* <TableCell><DeleteOutlineIcon sx={{color: 'white'}} onClick={()=>{deleteAction(game.id)}} /></TableCell> */}
              <TableCell><DeleteOutlineIcon sx={{color: 'white'}} 
                onClick={()=>{dispatch(fetchAsyncDeleteGames(game.id))}}
              /></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalMain 
        isOpen={isOpen} 
        handleClose={handleClose}
        body='createGame'
      />
    </>
  )
})

export default GameMain