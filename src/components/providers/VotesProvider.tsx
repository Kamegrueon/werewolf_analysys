import { createContext } from 'react'
import { VOTE_LOG } from '../types'

const Votes = [{vote_id: 1, voter_id: 1, voted_id: 2, date_progress: 1}]

export const VotesContext = createContext(Votes as VOTE_LOG[])

export const VotesProvider = (props: any) => {

    const { children } = props

    // useEffectとaxiosでfetch
    const Votes:VOTE_LOG[] = [
      // {vote_id: 1, voter_id: 1, voted_id: 1, date_progress: 1},
      // {vote_id: 2, voter_id: 2, voted_id: 1, date_progress: 1},
      // {vote_id: 3, voter_id: 3, destination_player_id: 2, date_progress: 1},
      // {vote_id: 4, voter_id: 4, destination_player_id: 2, date_progress: 1},
      // {vote_id: 5, voter_id: 5, destination_player_id: 3, date_progress: 1}
    ]
      
    return (
      <VotesContext.Provider value={Votes}>
        {children}
      </VotesContext.Provider>
    )
}

