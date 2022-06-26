import React, { useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { GameSelectContext } from '../../utils/GameSelectContext';

function createData(
  gameId: string,
  gameName: string,
  playDate: string,
  isWin: string,
  dateProgress: number,
) {
  return { gameId, gameName, playDate, isWin, dateProgress };
}

const rows = [
  createData('1', 'Game1', '2022/1/1', 'Win', 2),
  createData('2', 'Game2', '2022/1/1', 'Lose', 3),
  createData('3', 'Game3', '2022/1/1', 'Win', 4),
  createData('4', 'Game4', '2022/1/1', 'Win', 7),
  createData('5', 'Game5', '2022/1/1', 'Lose', 9),
];

const GameMain: React.FC = () => {

  const { setGameSelect } = useContext(GameSelectContext)

  return (
    <>
      <h2 style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Game List</h2>
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
              key={row.gameName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{color: 'white'}}>
              <Link 
                to={{pathname: `/games/${row.gameId}`}} 
                style={{textDecoration: 'none', color: 'inherit'}} 
                onClick={() => setGameSelect(row.gameId)}
              >
                  {row.gameName}
              </Link>
              </TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{row.playDate}</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{row.isWin}</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>{row.dateProgress}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default GameMain