import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "axios";
import { CREATE_ABILITY_LOGS_PARAMS, CREATE_COD_PARAMS, CREATE_COMING_OUTS_PARAMS, GET_DATA_PARAMS } from "../components/types";
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
  'game/getDailies',
  async(gameId: string) =>{
    const res = await games_api.get(`/${gameId}/dailies`)
    console.log(res.data)
    return res.data
  }
)

export const fetchAsyncCreateReport = createAsyncThunk(
  'game/createCauseOfDeaths',
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

export const fetchAsyncCreateComingOuts = createAsyncThunk(
  'player/createComingOuts',
  async(params: CREATE_COMING_OUTS_PARAMS) => {
    return await coming_outs_api.post('',{
      coming_out: {
        daily_id: params.dailyId,
        player_id: params.coPlayerId,
        roll_name: params.comingOutRoll,
      }
    })
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
      date_progress: 0
    }
  ],
  selectPlayerDate: '1',
  isExistReport: false,

}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSelectPlayerDate(state, action){
      state.selectPlayerDate = action.payload;
    },
    setIsExistReport(state, action){
      state.isExistReport = action.payload
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
      fetchAsyncCreateReport.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          selectPlayerDate: String(action.payload.date_progress),
          dailies: [...state.dailies, action.payload]
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

export const { setSelectPlayerDate, setIsExistReport } = playerSlice.actions

export const selectPlayers = (state: RootState) => state.player.players
export const selectAbilityLogs = (state: RootState) => state.player.abilityLogs
export const selectPlayerDate = (state: RootState) => state.player.selectPlayerDate
export const selectDailies = (state: RootState) => state.player.dailies
export const selectIsExistReport = (state: RootState) => state.player.isExistReport

export default playerSlice.reducer