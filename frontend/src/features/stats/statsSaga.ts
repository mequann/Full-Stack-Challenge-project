// /src/features/stats/statsSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } from './statsSlice';
import { addSongSuccess, updateSongSuccess, deleteSongSuccess } from '../songs/songsSlice';
import { fetchStatsApi } from '../../api/apiService';

function* fetchStats() {
  try {
    const stats = yield call(fetchStatsApi);

    console.log(stats,'bbbbbbbbbbbbbbb')
    yield put(fetchStatsSuccess(stats));
  } catch (error) {
    yield put(fetchStatsFailure((error as Error).message));
  }
}

export default function* statsSaga() {
  yield takeLatest([
    addSongSuccess.type,
    updateSongSuccess.type,
    deleteSongSuccess.type
  ], fetchStats);
  yield takeLatest(fetchStatsRequest.type, fetchStats);
}
