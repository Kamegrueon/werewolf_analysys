import { createContext } from 'react'
import { 
  GAME_SELECT_STATE, 
  ROLLS_CONTEXT, 
  DAILIES, 
  SELECT_PLAYER_DATE, 
  SELECT_VOTE_DATE, 
  VOTE_LOG_STATE, 
  VOTE_FORM_CONTEXT, 
  PLAYER,
  CASTING,
  RENDER_STATE
} from '../components/types'

export const DailiesContext = createContext([{id: '1', date_progress: 1}] as DAILIES[])

export const GameSelectContext = createContext({} as GAME_SELECT_STATE)

export const PlayersContext = createContext({} as PLAYER[])

export const RollsContext = createContext({} as ROLLS_CONTEXT)

export const SelectPlayerBoardDateContext = createContext({} as SELECT_PLAYER_DATE)

export const SelectVoteBoardDateContext = createContext({  selectVoteDate: '1', setSelectVoteDate: ()=>{}} as SELECT_VOTE_DATE)

export const VoteLogsContext = createContext({} as VOTE_LOG_STATE)

export const VoteFormContext = createContext({} as VOTE_FORM_CONTEXT)

export const CastingsContext = createContext({} as CASTING[])

export const RerenderContext = createContext({} as RENDER_STATE)