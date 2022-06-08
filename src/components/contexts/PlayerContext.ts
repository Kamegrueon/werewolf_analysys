import { createContext } from 'react'
import { AVATAR } from '../types'

const Players:AVATAR[] = [
  {user_id: 1, name:"", avatar:'', position: 'gray'}
]

const PlayerContext = createContext(Players)

export default PlayerContext