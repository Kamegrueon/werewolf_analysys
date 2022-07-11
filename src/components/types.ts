export type CAUSE_Of_DEATH = '突然死' | '処刑' | '殺害' | ''

export interface ROLE_STATE {
  id: string
  role_name: string  
}

export interface ROLES_CONTEXT {
  rolesState: ROLE_STATE[]
  setRolesState: React.Dispatch<React.SetStateAction<ROLE_STATE[]>>
}

export interface PLAYER {
  id: string
  player_name: string
  position?: string
  position_order?: number
  cause_of_death?: CAUSE_Of_DEATH
  date_of_death?: number
  dead_style?: {opacity: number}
}

export interface GAME_SELECT_STATE {
  gameSelect: string
  setGameSelect: React.Dispatch<React.SetStateAction<string>> 
};

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
  id: string, 
  voter_id: string,
  voted_id: string,
  date_progress: number,
}

export interface VOTE_LOG_STATE {
  voteLogs: VOTE_LOG[]
  setVoteLogs: React.Dispatch<React.SetStateAction<VOTE_LOG[]>> 
};

export interface VOTE_FORM_CONTEXT {
  setVoterPlayerId: React.Dispatch<React.SetStateAction<string>>
  setVotedPlayerId: React.Dispatch<React.SetStateAction<string>>
  isOpenForm: boolean
};

export interface DAILIES_ACTION {
  dailies_props: {
    select_days_style:{
      width: number,
      height: number,
      color?: string,
      backgroundColor: string,
      textAlign?: string
      paddingLeft?: number
    }
    // setDay?: React.Dispatch<React.SetStateAction<string>>
    action: 'playerDay' | 'voteDay' | undefined
  }
}

export interface DAILIES_STYLE_ACTION {
  select_days_style:{
    width: number,
    height: number,
    color?: string,
    backgroundColor: string,
    textAlign?: string
    paddingLeft?: number
  }
  action: 'playerDay' | 'voteDay' | undefined
}

export interface DAILIES {
  id: string
  game_id: string
  date_progress: number
}

export interface SELECT_PLAYER_DATE  {
  selectPlayerDate: string
  setSelectPlayerDate: React.Dispatch<React.SetStateAction<string>> 
};

export interface SELECT_VOTE_DATE {
  selectVoteDate: string
  setSelectVoteDate: React.Dispatch<React.SetStateAction<string>> 
};