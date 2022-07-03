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
  const response = await games_api.post('/',{
    game: {
      game_name: gameName, 
      players: players, 
      position_ids: positionIds
    } 
  })
  return response
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

export const playersIndexRequest = async(game_id: string) =>{
  return await games_api.get(`/${game_id}/players`)
}