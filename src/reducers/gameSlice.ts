import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const games_api = axios.create ({
  baseURL: 'http://localhost:3000/api/v1/games',
  responseType: "json",
})

// games Request
export const fetchAsyncGetGames = createAsyncThunk(
  'game/getGames',
  async() =>{
    const res = await games_api.get('/')
    return res.data
  }
)

export const fetchAsyncDeleteGames = createAsyncThunk(
  'game/deleteGame',
  async (gameId: string) => {
    await games_api.delete(`/${gameId}`)
  return gameId
  }
)

interface gameCreateParams {
  gameName: string | null,
  players: string[], 
  positionIds: string[],
}

export const fetchAsyncCreateGames = createAsyncThunk(
  'game/createGame',
  async (params: gameCreateParams) => {
    const res = await games_api.post('/',{
      game: {
        game_name: params.gameName, 
        players: params.players, 
        position_ids: params.positionIds
      }})
    return res.data.id
    }
  )

export const fetchAsyncGetRolls = createAsyncThunk(
  'game/getRolls',
  async (gameId: string) => {
  const res = await games_api.get(`/${gameId}/game_rolls`) 
  return res.data
  }
)


const initialState = {
  games:  [
    {
      id: '1', 
      game_name: '', 
      is_win: true, 
      date_progress: 1, 
      created_at: ''
    }
  ],
  rolls: [
    {
      attributes:
        {
          id: '1', 
          roll_name: '人狼'
        }
    }
  ],
  selectGameId: '',
  castings: [
    {
      id: 1,
      roll_id: 1, 
      roll_name: ''
    }
  ],
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectGame(state, action){
      state.selectGameId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetGames.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          games: action.payload.games,
          rolls: action.payload.rolls,
        }
      }
    );
    builder.addCase(
      fetchAsyncDeleteGames.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          games: state.games.filter((game) => game.id !== action.payload),
        }
      }
    );
    builder.addCase(
      fetchAsyncCreateGames.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          selectGameId: action.payload,
        }
      }
    );
    builder.addCase(
      fetchAsyncGetRolls.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          castings: action.payload,
        }
      }
    );
  }
})

export const { setSelectGame } = gameSlice.actions

export const selectGames = (state: RootState) => state.game.games
export const selectRolls = (state: RootState) => state.game.rolls
export const selectGameId = (state: RootState) => state.game.selectGameId
export const selectCastings = (state: RootState) => state.game.castings

export default gameSlice.reducer