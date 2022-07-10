import axiosBase from 'axios'

// axiosのインスタンス作成
// Games
const games_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/games',
  responseType: "json",
})

// games Request

export const gamesIndexRequest = async() =>{
    return await games_api.get('/')
}

export const gamesCreateRequest = async(gameName: string | null, players: string[], positionIds: string[]) =>{
   return await games_api.post('/',{
    game: {
      game_name: gameName, 
      players: players, 
      position_ids: positionIds
    } 
  })
}

// export const gamesShowRequest = async(game_id: string) =>{
//   return await games_api.get(`/${game_id}`)
// }

export const gamesDeleteRequest = async(game_id: string) =>{
  return await games_api.delete(`/${game_id}`)
}

// dailies Request

export const dailiesIndexRequest = async(game_id: string) =>{
  return await games_api.get(`/${game_id}/dailies`)
}

// players Request

export const playersIndexRequest = async(game_id: string, date_progress: string) =>{
  return await games_api.get(`/${game_id}/players?date_progress=${date_progress}`)
}

// Daily
const dailies_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/dailies',
  responseType: "json",
})

// cod Request

export const causeOfDeathsIndexRequest = async(daily_id: string) => {
  return await dailies_api.get(`/${daily_id}/cause_of_deaths`)
}

export const causeOfDeathsCreateRequest = async(daily_id: string, executedPlayerId: string, murderedPlayerId: string | null, perishedPlayerId: string | null) => {
  console.log('create', executedPlayerId, murderedPlayerId, perishedPlayerId)
  return await dailies_api.post(`/${daily_id}/cause_of_deaths`,{
    cod: {
      executed_player_id: executedPlayerId,
      murdered_player_id: murderedPlayerId, 
      perished_player_id: perishedPlayerId,
    } 
  })
}

export const causeOfDeathsUpdateRequest = async(dailyId: string, executedPlayerId: string, murderedPlayerId: string | null, perishedPlayerId: string | null) => {
  console.log('patch', executedPlayerId, murderedPlayerId, perishedPlayerId)
  return await dailies_api.patch(`/${dailyId}/cause_of_deaths`,{
    cod: {
      executed_player_id: executedPlayerId,
      murdered_player_id: murderedPlayerId, 
      perished_player_id: perishedPlayerId,
    } 
  })
}

// votes Request


export const votesCreateRequest = async(dailyId: string, voterId: string, votedId: string) => {
  return await dailies_api.post(`/${dailyId}/votes`,{
    vote: {
      voter_id: voterId,
      voted_id: votedId,
    } 
  })
}