export type CAUSE_Of_DEATH = '突然死' | '処刑' | '殺害' | null

export interface ROLL_STATE {
  id: string
  roll_name: string  
}

export interface ROLLS_CONTEXT {
  rollsState: ROLL_STATE[]
  setRollsState: React.Dispatch<React.SetStateAction<ROLL_STATE[]>>
}

export interface PLAYER {
  id: string
  player_name: string
  co_id: string | null
  roll_name: string | null
  roll_color: string
  cause_of_death: CAUSE_Of_DEATH
  death_date: number | null
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
  id: string
  voter_id: string
  voted_id: string
  date_progress: number
}

export interface VOTE_LOG_STATE {
  voteLogs: VOTE_LOG[]
  setVoteLogs: React.Dispatch<React.SetStateAction<VOTE_LOG[]>> 
};

export interface VOTE_FORM_CONTEXT {
  voteLogs: VOTE_LOG[]
  voterPlayerId: string
  setVoterPlayerId: React.Dispatch<React.SetStateAction<string>>
  votedPlayerId: string
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

export interface RENDER_STATE {
  renderState: number
  rerender: React.Dispatch<React.SetStateAction<number>>
}

export interface ABILITY_LOG {
  id: number,
  coming_out_player_id: number,
  date_progress: number,
  target_player_id: number,
  ability_result: string,
  roll_color?: string,
}

export interface ABILITY_LOG_STATE {
  abilityLogs: ABILITY_LOG[],
  setAbilityLogs: React.Dispatch<React.SetStateAction<ABILITY_LOG[]>>
};

// gameSlice
export interface GAME_STATE {
  games:  GAMES[]
  rolls: ROLLS[]
  selectGameId: string
  castings: CASTING[]
  dailies: DAILIES[]
}

export interface GAMES {
    id: string, 
    game_name: string, 
    is_win: boolean, 
    date_progress: number, 
    created_at: string
}

export interface GAME_CREATE_PARAMS {
  gameName: string | null,
  players: string[], 
  positionIds: string[],
}

export interface GET_GAMES {
  games: GAMES[],
  rolls: ROLLS[],
}

export interface ROLLS {
  attributes:
    {
      id: string, 
      roll_name: string
    }
}

export interface CASTING {
  id: number, 
  roll_id: number, 
  roll_name: string
}

export interface GET_DATA_PARAMS {
  gameId: string, 
  dateProgress: string
}

export interface CREATE_VOTE_PARAMS {
  dailyId: string
  voterId: string
  votedId: string
}

export interface CREATE_ABILITY_LOGS_PARAMS {
  coId: string | null | undefined
  targetPlayerId: string
  dailyId: string
  abilityResult: string
}

export interface CREATE_COMING_OUTS_PARAMS {
  dailyId: string
  comingOutRoll: string | null
  coPlayerId: string
}