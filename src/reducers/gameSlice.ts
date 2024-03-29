import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "axios";
import { RootState } from "../store";
import { CASTING, GAME_CREATE_PARAMS, GAME_STATE, GET_GAMES } from "../components/types";

const games_api = axiosBase.create ({
  baseURL: `${process.env.REACT_APP_API_DOMEIN}/api/v1/games`,
  responseType: "json",
})

// games Request
export const fetchAsyncGetGames = createAsyncThunk(
  'game/getGames',
  async(userId: string) =>{
    const res = await games_api.get<GET_GAMES>(`?user_id=${userId}`)
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

export const fetchAsyncCreateGames = createAsyncThunk(
  'game/createGame',
  async (params: GAME_CREATE_PARAMS) => {
    const res = await games_api.post('/',{
      game: {
        game_name: params.gameName, 
        players: params.players, 
        position_ids: params.positionIds,
        user_id: params.userId
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


const initialState: GAME_STATE = {
  games:  [
    {
      id: '', 
      game_name: '', 
      user_id: '',
      created_at: ''
    }
  ],
  rolls: [
    {
      attributes:
        {
          id: '', 
          roll_name: ''
        }
    }
  ],
  castings: [
    {
      id: 0,
      roll_id: 0, 
      roll_name: ''
    }
  ],
  selectGameId: ''
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectGame(state, action: PayloadAction<string>){
      state.selectGameId = action.payload;
    },
    resetGameState(state){
      state.rolls = initialState.rolls
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetGames.fulfilled,
      (state, action: PayloadAction<GET_GAMES>) => {
        return {
          ...state,
          games: action.payload.games,
          rolls: action.payload.rolls,
        }
      }
    );
    builder.addCase(
      fetchAsyncDeleteGames.fulfilled,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          games: state.games.filter((game) => game.id !== action.payload),
          selectGameId: initialState.selectGameId,
        }
      }
    );
    builder.addCase(
      fetchAsyncCreateGames.fulfilled,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          selectGameId: action.payload,
        }
      }
    );
    builder.addCase(
      fetchAsyncGetRolls.fulfilled,
      (state, action: PayloadAction<CASTING[]>) => {
        return {
          ...state,
          castings: action.payload,
        }
      }
    );
  }
})

export const { setSelectGame, resetGameState } = gameSlice.actions

export const selectGames = (state: RootState) => state.game.games
export const selectRolls = (state: RootState) => state.game.rolls
export const selectGameId = (state: RootState) => state.game.selectGameId
export const selectCastings = (state: RootState) => state.game.castings

export default gameSlice.reducer