import { AVATAR } from '../types'

// axiosでバックエンドから取得
const Players:AVATAR[] = [
    {user_id: 1, name:"Kengo", avatar:'../../static/images/Bitmap.png', position:'fortune-teller', cause_of_death:'murdered', date_of_death: 3},
    {user_id: 2, name:"Kengo", avatar:'',position:'were-wolf', cause_of_death:'executed', date_of_death: 2},
    {user_id: 3, name:"Kengo", avatar:'', cause_of_death:'perished', date_of_death: 2},
    {user_id: 4, name:"Kengo", avatar:'../../static/images/Bitmap.png'},
  ]

export default Players