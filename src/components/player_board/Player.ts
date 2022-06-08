import { AVATAR } from '../types'

// axiosでバックエンドから取得
const Players:AVATAR[] = [
    {user_id: 1, name:"Jon", avatar:'', position:'fortune-teller', cause_of_death:'murdered', date_of_death: 3},
    {user_id: 2, name:"Jack", avatar:'',position:'were-wolf', cause_of_death:'executed', date_of_death: 2},
    {user_id: 3, name:"Mike", avatar:'', cause_of_death:'perished', date_of_death: 2},
    {user_id: 4, name:"Noah", avatar:'../../static/images/Bitmap.png'},
    {user_id: 5, name:"Lucas", avatar:'',position:'medium'},
  ]

export default Players