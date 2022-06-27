import { createContext } from 'react'
import { AVATAR, GAME_SELECT_STATE } from '../components/types'

export const DateProgressesContext = createContext(["1"] as string[])

export const GameSelectContext = createContext({} as GAME_SELECT_STATE)

export const PlayersContext = createContext({} as AVATAR[])