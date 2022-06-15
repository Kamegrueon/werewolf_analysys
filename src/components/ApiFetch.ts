import axiosBase from 'axios'

// axiosのインスタンス作成
const api = axiosBase.create ({
    baseURL: 'https://jsonplaceholder.typicode.com/posts/',
    responseType: "json",
})

export const playersRequest = async(days: number) =>{
  return await api.get(`${days}`)
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