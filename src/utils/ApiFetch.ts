import axiosBase from 'axios'

// axiosのインスタンス作成
const dailies_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/games/',
  responseType: "json",
})

export const dailiesIndexRequest = async(game_id: string) =>{
  return await dailies_api.get(`${game_id}/dailies`)
}

