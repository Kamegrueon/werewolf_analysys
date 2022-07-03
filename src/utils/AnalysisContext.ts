import { createContext } from 'react'
import { AVATAR, GAME_SELECT_STATE, ROLES_CONTEXT } from '../components/types'

export const DateProgressesContext = createContext(["1"] as string[])

export const GameSelectContext = createContext({} as GAME_SELECT_STATE)

export const PlayersContext = createContext({} as AVATAR[])

export const RolesContext = createContext({} as ROLES_CONTEXT)