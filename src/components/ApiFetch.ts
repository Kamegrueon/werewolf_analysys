import React from 'react'
import axios from 'axios'

// axiosのインスタンス作成
const FetchJson = axios.create ({
    baseURL: 'https://jsonplaceholder.typicode.com/posts/'
})

export const fetchJsonData = async(days: number) =>{
  return await FetchJson.get(`${days}`)
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