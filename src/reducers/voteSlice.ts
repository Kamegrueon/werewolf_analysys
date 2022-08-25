import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "axios";
import { CREATE_VOTE_PARAMS, GET_DATA_PARAMS } from "../components/types";
// import { DAILIES } from "../components/types";
import { RootState } from "../store";

const votes_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/votes',
  responseType: "json",
})

export const fetchAsyncGetVotes = createAsyncThunk(
  'vote/getVotes',
  async(params: GET_DATA_PARAMS) =>{
    const res = await votes_api.get(`?game_id=${params.gameId}&date_progress=${params.dateProgress}`)
    console.log(res.data)
    return res.data
  }
)

export const fetchAsyncCreateVotes = createAsyncThunk(
  'vote/createVotes',
  async(params: CREATE_VOTE_PARAMS) => {
    const res = await votes_api.post('',{
      vote: {
        daily_id: params.dailyId,
        voter_id: params.voterId,
        voted_id: params.votedId,
      } 
    })
    return res.data
  }
)


export const fetchAsyncDeleteVotes = createAsyncThunk(
  'vote/deleteVotes',
  async(voteId: string) => {
    const res = await votes_api.delete(`/${voteId}`)
    return res.data.id
  }
)


const initialState = {
  voteLogs: [
    {
      id: '',
      voter_id: '',
      voted_id: '',
      date_progress: 0
    }
  ],
  selectVoteDate: '1',
}

export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    setSelectVoteDate(state, action){
      state.selectVoteDate = action.payload;
    },
    resetSelectVoteDate(state){
      state.selectVoteDate = initialState.selectVoteDate
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetVotes.fulfilled,
      (state, action: any) => {
        return {
          ...state,
          voteLogs: action.payload
        }
      }
    );
    builder.addCase(
      fetchAsyncDeleteVotes.fulfilled,
      (state, action: any) => {
        console.log('fetch呼ばれた')
        return {
          ...state,
          voteLogs: state.voteLogs.filter(vote => vote.id !== action.payload)
        }
      }
    );
  }
})

export const { setSelectVoteDate, resetSelectVoteDate } = voteSlice.actions

export const selectVoteDate = (state: RootState) => state.vote.selectVoteDate
export const selectVoteLogs = (state: RootState) => state.vote.voteLogs

export default voteSlice.reducer