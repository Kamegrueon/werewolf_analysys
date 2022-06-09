// Avatar 

// export interface  POSITION_STATE {
//   position: string;
// }

export type CAUSE_Of_DEATH = 'perished' | 'executed' | 'murdered' | 'alive'

export interface AVATAR {
  user_id: number
  name: string | null
  avatar: string //avatarの画像データどうするか検討
  position?: string
  cause_of_death?: CAUSE_Of_DEATH
  date_of_death?: number
  dead_style?: {opacity: number}
}

export interface SELECT_STYLE_PROP {
  select_days:{
    width: number,
    height: number,
    color?: string,
    backgroundColor: string,
    textAlign?: string
  }
}

export interface VOTE_LOG {
  vote_id: number, 
  voted_user_id: number,
  be_voted_user_id: number,
  date_progress: number
}