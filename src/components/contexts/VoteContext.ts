import { createContext } from 'react'
import { VOTE_LOG } from '../types'

const Votes:VOTE_LOG[] = [
  {vote_id: 1, voter_id: 1, destination_player_id: 2, date_progress: 1}
]

const VoteContext = createContext(Votes)

export default VoteContext