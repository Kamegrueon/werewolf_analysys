import React, { useState, useEffect } from 'react'
import Axios, { AxiosResponse } from 'axios'

// interface Fetch {
//   userId: number
//   id: number
//   title: string
//   body: string
// }

const ApiFetch = () => {
  const axios = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true
  })

  const fetchPosts = async () => {
    const options = {
      url: 'posts',
      method: 'GET'
    }

    try {
      const res: AxiosResponse = await axios(options)
      return res
    } catch (error: any) {
      console.log(error)
    }
  }
  return {
    fetchPosts
  }
}

export default ApiFetch