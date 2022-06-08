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


// PlayerBord

export interface DAILIES {
  date_progresses: number[]
}