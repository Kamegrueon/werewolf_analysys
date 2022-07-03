import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { GameSelectContext, RolesContext } from '../../utils/AnalysisContext';
import { gamesIndexRequest } from '../../utils/ApiFetch'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';
import ModalMain from '../modal/ModalMain';

const GameMain: React.FC = () => {

  const { setGameSelect } = useContext(GameSelectContext)
  const { setRolesState } = useContext(RolesContext)

  const [rows, setGames] = useState([{id: 1, game_name: '', is_win: true, date_progress: 1, created_at: ''}])

  console.log(rows)

  useEffect(() => {
    gamesIndexRequest().then((res: any) => {
      setGames(res.data.games)
      setRolesState(res.data.roles)
    })
  },[setRolesState])

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }


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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.game_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{color: 'white'}}>
              <Link 
                to={{pathname: `/games/${row.id}`}} 
                style={{textDecoration: 'none', color: 'inherit'}} 
                onClick={() => setGameSelect(String(row.id))}
              >
                  {row.game_name}
              </Link>
              </TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{row.created_at}</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{row.is_win ? '勝利' : row.is_win===null ? '' :'敗北'}</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{row.date_progress}</TableCell>
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
}

export default GameMain