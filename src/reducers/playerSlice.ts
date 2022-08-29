import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "axios";
import { CREATE_ABILITY_LOGS_PARAMS, CREATE_COD_PARAMS, GET_DATA_PARAMS } from "../components/types";
import { RootState } from "../store";


const games_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/games',
  responseType: "json",
})

const dailies_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/dailies',
  responseType: "json",
})

const coming_outs_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/coming_outs',
  responseType: "json",
})

const cod_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/cause_of_deaths',
  responseType: "json",
})

export const fetchAsyncGetPlayers = createAsyncThunk(
  'player/getPlayers',
  async(params: GET_DATA_PARAMS) =>{
    const res = await games_api.get(`/${params.gameId}/players?date_progress=${params.dateProgress}`)
    console.log('playersIndex',res.data)
    return res.data
  }
)

export const fetchAsyncGetAbilityLogs = createAsyncThunk(
  'player/getComingOuts',
  async(params: GET_DATA_PARAMS) => {
    const res = await coming_outs_api.get(`?game_id=${params.gameId}&date_progress=${params.dateProgress}`)
    return res.data
  }
)

export const fetchAsyncGetDailies = createAsyncThunk(
  'player/getDailies',
  async(gameId: string) =>{
    const res = await games_api.get(`/${gameId}/dailies`)
    return res.data
  }
)

export const fetchAsyncCreateDailies = createAsyncThunk(
  'player/createCauseOfDeaths',
  async(params: CREATE_COD_PARAMS) => {
    const res = await dailies_api.post(`/${params.dailyId}/cause_of_deaths`,{
        cod: {
          executed_player_id: params.executedPlayerId,
          murdered_player_id: params.murderedPlayerId, 
          perished_player_id: params.perishedPlayerId,
        }
      })
    return res.data
  }
)

export const fetchAsyncGetCOD = createAsyncThunk(
  'player/GetCauseOfDeaths',
  async(params: GET_DATA_PARAMS) => {
    const res = await cod_api.get(`?game_id=${params.gameId}&date_progress=${params.dateProgress}`)
    return res.data
  }
)

export const fetchAsyncCreateAbilityLogs = createAsyncThunk(
  'player/createAbilityLogs',
  async(params: CREATE_ABILITY_LOGS_PARAMS) => {
    const res = await coming_outs_api.post(`/${params.coId}/ability_logs`,{
      ability_log: {
        target_player_id: params.targetPlayerId,
        daily_id: params.dailyId,
        ability_result: params.abilityResult,
      }})
    return res.data
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
      cause_of_death: null,
      death_date: null,
      dead_style: {opacity: 1}
    }
  ],
  abilityLogs: [
    {
      id: 0,
      coming_out_player_id: 0,
      date_progress: 0,
      target_player_id: 0,
      ability_result: '',
      roll_color: '',
    }
  ],
  dailies: [
    {
      id: '',
      game_id: '', 
      date_progress: 1
    }
  ],
  selectPlayerDate: '1',
  dailyCod: {
    executed_player_id: '',
    murdered_player_id: null,
    perished_player_id: null,
  }

}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSelectPlayerDate(state, action){
      state.selectPlayerDate = action.payload;
    },
    resetPlayerState(state){
      state.players = initialState.players;
      state.abilityLogs = initialState.abilityLogs;
      state.dailies = initialState.dailies;
      state.dailyCod = initialState.dailyCod;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetPlayers.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          players: action.payload
        }
      }
    );
    builder.addCase(
      fetchAsyncGetDailies.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          dailies: action.payload,
        }
      }
    );
    builder.addCase(
      fetchAsyncCreateDailies.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          selectPlayerDate: String(action.payload.date_progress),
          dailies: [...state.dailies, action.payload]
        }
      }      
    );
    builder.addCase(
      fetchAsyncGetCOD.fulfilled,
      (state, action: any) => {
        const cod = {
          executed_player_id: action.payload.executed_player_id ? action.payload.executed_player_id[0].player_id : null,
          murdered_player_id: action.payload.murdered_player_id ? action.payload.murdered_player_id[0].player_id : null,
          perished_player_id: action.payload.perished_player_id ? action.payload.perished_player_id[0].player_id : null,
        }
        return {
          ...state,
          dailyCod: cod
        }
      }      
    );
    builder.addCase(
      fetchAsyncGetAbilityLogs.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          abilityLogs: action.payload
        }
      }      
    );
    builder.addCase(
      fetchAsyncCreateAbilityLogs.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          abilityLogs: [...state.abilityLogs, action.payload]
        }
      }      
    );
  }
})

export const { setSelectPlayerDate, resetPlayerState } = playerSlice.actions

export const selectPlayers = (state: RootState) => state.player.players
export const selectAbilityLogs = (state: RootState) => state.player.abilityLogs
export const selectPlayerDate = (state: RootState) => state.player.selectPlayerDate
export const selectDailies = (state: RootState) => state.player.dailies
export const selectDailyCod = (state: RootState) => state.player.dailyCod

export default playerSlice.reducer