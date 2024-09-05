import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from '../features/songs/songsSlice';
import statsReducer from '../features/stats/statsSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  stats: statsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
