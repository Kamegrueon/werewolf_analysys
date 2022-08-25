import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import gameReducer from './reducers/gameSlice'
import playerSlice from './reducers/playerSlice';
import voteSlice from './reducers/voteSlice';

export const store = configureStore({
  reducer:{
    game: gameReducer,
    player: playerSlice,
    vote: voteSlice,
  } 
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;