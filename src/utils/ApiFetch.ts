import axiosBase from 'axios'

// axiosのインスタンス作成
// Games
// const games_api = axiosBase.create ({
//   baseURL: 'http://localhost:3000/api/v1/games',
//   responseType: "json",
// })
// Daily
const dailies_api = axiosBase.create ({
  baseURL: `${process.env.REACT_APP_API_DOMEIN}/api/v1/dailies`,
  responseType: "json",
})

// // votes Request
// const votes_api = axiosBase.create ({
//   baseURL: 'http://localhost:3000/api/v1/votes',
//   responseType: "json",
// })

// ComingOut
const coming_outs_api = axiosBase.create ({
  baseURL: `${process.env.REACT_APP_API_DOMEIN}/api/v1/coming_outs`,
  responseType: "json",
})


// cod Request

// export const causeOfDeathsIndexRequest = async(daily_id: string) => {
//   return await dailies_api.get(`/${daily_id}/cause_of_deaths`)
// }

// export const causeOfDeathsCreateRequest = async(daily_id: string, executedPlayerId: string, murderedPlayerId: string | null, perishedPlayerId: string | null) => {
//   console.log('create', executedPlayerId, murderedPlayerId, perishedPlayerId)
//   return await dailies_api.post(`/${daily_id}/cause_of_deaths`,{
//     cod: {
//       executed_player_id: executedPlayerId,
//       murdered_player_id: murderedPlayerId, 
//       perished_player_id: perishedPlayerId,
//     } 
//   })
// }

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


// reduxに反映済み

// games Request

// export const gamesIndexRequest = async() =>{
//   const res = await games_api.get('/')
//   return res.data
// }

// export const gamesCreateRequest = async(gameName: string | null, players: string[], positionIds: string[]) =>{
//    return await games_api.post('/',{
//     game: {
//       game_name: gameName, 
//       players: players, 
//       position_ids: positionIds
//     } 
//   })
// }

// export const gamesDeleteRequest = async(gameId: string) =>{
//   return await games_api.delete(`/${gameId}`)
// }

// // rolls Request
// export const rollIndexRequest = async (gameId: string) => {
//   return await games_api.get(`/${gameId}/game_rolls`) 
// }

// // dailies Request

// export const dailiesIndexRequest = async(game_id: string) =>{
//   return await games_api.get(`/${game_id}/dailies`)
// }


// // players Request

// export const playersIndexRequest = async(game_id: string, date_progress: string) =>{
//   return await games_api.get(`/${game_id}/players?date_progress=${date_progress}`)
// }

// export const votesIndexRequest = async(dailyId: string) => {
//   return await votes_api.get(`?daily_id=${dailyId}`)
// }

// export const votesCreateRequest = async(dailyId: string, voterId: string, votedId: string) => {
//   return await votes_api.post('',{
//     vote: {
//       daily_id: dailyId,
//       voter_id: voterId,
//       voted_id: votedId,
//     } 
//   })
// }

// export const votesDeleteRequest = async(voteId: string) => {
//   return await votes_api.delete(`/${voteId}`)
// }

// 使用している
export const comingOutCreateRequest = async( dailyId: string, comingOutRoll: string | null, coPlayerId: string) => {
  return await coming_outs_api.post('',{
    coming_out: {
      daily_id: dailyId,
      player_id: coPlayerId,
      roll_name: comingOutRoll,
    }
  })
}

// // abilityLogのindexアクションで取得する形に修正
// export const comingOutIndexRequest = async(gameId: string, dateProgress: string) => {
//   return await coming_outs_api.get(`?game_id=${gameId}&date_progress=${dateProgress}`)
// }


// // AbilityLog
// export const abilityLogsCreateRequest = async( coId: string | null | undefined, targetPlayerId: string, dailyId: string, abilityResult: string) => {
//   return await coming_outs_api.post(`/${coId}/ability_logs`,{
//     ability_log: {
//       target_player_id: targetPlayerId,
//       daily_id: dailyId,
//       ability_result: abilityResult,
//     }
//   })
// }