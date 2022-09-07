export interface RENDER_STATE {
  renderState: number
  rerender: React.Dispatch<React.SetStateAction<number>>
}

export interface SELECT_STYLE_PROP {
  select_days:{
    width: number;
    height: number;
    color?: string;
    backgroundColor: string;
    textAlign?: string;
  }
}

export interface GET_DATA_PARAMS {
  gameId: string;
  dateProgress: string;
}

// gameSlice
export interface GAME_STATE {
  games:  GAME[];
  rolls: ROLL[];
  selectGameId: string;
  castings: CASTING[];
}

export interface GAME {
    id: string;
    game_name: string;
    is_win: boolean;
    date_progress: number;
    created_at: string;
}

export interface GAME_CREATE_PARAMS {
  gameName: string | null;
  players: string[];
  positionIds: string[];
}

export interface GET_GAMES {
  games: GAME[];
  rolls: ROLL[];
}

export interface ROLL {
  attributes:
    {
      id: string;
      roll_name: string;
    }
}

export interface CASTING {
  id: number;
  roll_id: number;
  roll_name: string;
}

// playerSlice

export interface PLAYER_STATE {
  players: PLAYER[];
  abilityLogs: ABILITY_LOG[];
  dailies: DAILY[];
  selectPlayerDate: string;
  dailyCod: {
    executed_player_id: string;
    murdered_player_id: string | null;
    perished_player_id: string | null;
  }
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

export type CAUSE_Of_DEATH = '突然死' | '処刑' | '殺害' | null

export interface ABILITY_LOG {
  id: number;
  coming_out_player_id: number;
  date_progress: number;
  target_player_id: number;
  ability_result: string;
  roll_color: string;
}

export interface DAILY {
  id: string;
  game_id: string;
  date_progress: number;
}

export interface CREATE_ABILITY_LOGS_PARAMS {
  coId: string | null | undefined;
  targetPlayerId: string;
  dailyId: string;
  abilityResult: string;
}

export interface CREATE_COMING_OUTS_PARAMS {
  dailyId: string
  comingOutRoll: string | null
  coPlayerId: string
}

export interface CREATE_COD_PARAMS {
  dailyId: string
  executedPlayerId: string
  murderedPlayerId: string | null
  perishedPlayerId: string | null
}

// voteSlice
export interface VOTE_STATE{
  voteLogs: VOTE_LOG[];
  selectVoteDate: string;
  voterPlayerId: string;
  votedPlayerId: string;
  isOpenVoteForm: boolean;
}

export interface VOTE_LOG {
  id: string
  voter_id: string
  voted_id: string
  date_progress: number
}

export interface CREATE_VOTE_PARAMS {
  dailyId: string
  voterId: string
  votedId: string
}

export interface USER_STATE {
  loading: boolean,
  isSignedIn: boolean,
  currentUser: USER
}

// サインアップ
export interface SIGN_UP_PARAMS {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SIGN_IN_PARAMS {
  email: string
  password: string
}

// ユーザー
export interface USER {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}