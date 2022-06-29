import axiosBase from 'axios'

// axiosのインスタンス作成
// Games
const games_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/games',
  responseType: "json",
})

export const gamesIndexRequest = async() =>{
  // try{
    return await games_api.get('/')
  // } catch(e:any) {
  //   return e.response
  // }
}

export const gamesShowRequest = async(game_id: string) =>{
  return await games_api.get(`/${game_id}`)
}

export const dailiesIndexRequest = async(game_id: string) =>{
  return await games_api.get(`/${game_id}/dailies`)
}

export const playersIndexRequest = async(game_id: string) =>{
  return await games_api.get(`/${game_id}/players`)
}