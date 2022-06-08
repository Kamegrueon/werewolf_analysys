// Avatar 

export interface  POSITION_STATE {
  position_color: string;
  position_order: string;
}

export type CAUSE_Of_DEATH = 'perished' | 'executed' | 'murdered' | 'alive'

export interface AVATAR {
  user_id: number
  name: string | null
  cause_of_death: CAUSE_Of_DEATH
  avatar: string //avatarの画像データどうするか検討
  dead_style?: {opacity: number}
}


// PlayerBord

export interface DAILIES {
  date_progresses: number[]
}