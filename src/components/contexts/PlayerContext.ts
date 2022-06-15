import { createContext } from 'react'
import { AVATAR } from '../types'

const players:AVATAR[] = [
  {user_id: 1, name:"", avatar:'', cause_of_death:'alive', date_of_death: 1}
]

const PlayerContext = createContext(players)

export default PlayerContext