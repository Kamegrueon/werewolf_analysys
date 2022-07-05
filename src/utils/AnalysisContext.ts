import { createContext } from 'react'
import { AVATAR, GAME_SELECT_STATE, ROLES_CONTEXT, DAILIES, SELECT_PLAYER_DATE, SELECT_VOTE_DATE } from '../components/types'

export const DailiesContext = createContext([{id: '1', date_progress: 1}] as DAILIES[])

export const GameSelectContext = createContext({} as GAME_SELECT_STATE)

export const PlayersContext = createContext({} as AVATAR[])

export const RolesContext = createContext({} as ROLES_CONTEXT)

export const SelectPlayerBoardDateContext = createContext({} as SELECT_PLAYER_DATE)

export const SelectVoteBoardDateContext = createContext({  selectVoteDate: '1', setSelectVoteDate: ()=>{}} as SELECT_VOTE_DATE)