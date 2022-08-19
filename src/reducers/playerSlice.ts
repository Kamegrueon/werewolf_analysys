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



const initialState = {
  players:  [
    {
      id: '',
      player_name: '',
      co_id: null,
      roll_name: null,
      roll_color: '',
      cause_of_death: '',
      death_date: null,
      dead_style: {opacity: 1}
    }
  ],
  abilityLogs: [
    {
      id: 1,
      coming_out_player_id: 1,
      date_progress: 1,
      target_player_id: 1,
      ability_result: '',
      roll_color: '',
    }
  ],
  selectPlayerDate: '1',

}

export const dailySlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSelectPlayerDate(state, action){
      state.selectPlayerDate = action.payload;
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
  }
})

// export const { setSelectGame } = playerSlice.actions

// export const selectGames = (state: RootState) => state.game.games
// export const selectRolls = (state: RootState) => state.game.rolls
// export const selectGameId = (state: RootState) => state.game.selectGameId

export default dailySlice.reducer