import axiosBase from 'axios'

// axiosのインスタンス作成
const api = axiosBase.create ({
    baseURL: 'https://jsonplaceholder.typicode.com/posts/',
    responseType: "json",
})

export const playersRequest = async(days: number) =>{
  return await api.get(`${days}`)
}

// axiosのインスタンス作成
const dailies_api = axiosBase.create ({
  baseURL: 'http://localhost:3000/api/v1/games/',
  responseType: "json",
})

export const dateProgressesRequest = async(game_id: string) =>{
  return await dailies_api.get(`${game_id}/dailies`)
}



// useEffect(() => {
//   (async () => {
//     const posts:any = await fetchPosts()
//     if (posts.data.length === 0) {
//       return
//     }
//     setPosts(posts.data)
//   })()
// },[])