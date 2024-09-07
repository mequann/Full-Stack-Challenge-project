// /src/features/songs/songsSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSucces,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from './songsSlice';
import { fetchSongsApi, addSongApi, updateSongApi, deleteSongApi } from '../../api/apiService';

function* fetchSongs(action: ReturnType<typeof fetchSongsRequest>) {
  try {
    const songs = yield call(fetchSongsApi);
    // console.log(songs,'mmmmmmmmmmmmm')
    yield put(fetchSongsSucces(songs));
  } catch (error) {
    yield put(fetchSongsFailure((error as Error).message));
  }
}

function* addSong(action: ReturnType<typeof addSongRequest>) {
  try {
    const newSong = yield call(addSongApi, action.payload);
    // console.log(newSong,'newwwwww')
    yield put(addSongSuccess(newSong));
  } catch (error) {
    yield put(addSongFailure((error as Error).message));
  }
}

function* updateSong(action: ReturnType<typeof updateSongRequest>) {
  try {
    const updatedSong = yield call(updateSongApi, action.payload);
    console.log(updatedSong, 'updated');
    yield put(updateSongSuccess(updatedSong));
  } catch (error) {
    yield put(updateSongFailure((error as Error).message));
  }
}


function* deleteSong(action: ReturnType<typeof deleteSongRequest>) {
  try {
    const deleted=yield call(deleteSongApi, action.payload);
    console.log(deleted, 'deleted');
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure((error as Error).message));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  // console.log('Saga is watching for fetchSongsRequest'); 
  yield takeLatest(addSongRequest.type, addSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}
