// /src/features/songs/songsSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
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
} from "./songsSlice";
import { Song } from "./songsSlice";
import {
  fetchSongsApi,
  addSongApi,
  updateSongApi,
  deleteSongApi,
} from "../../api/apiService";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchSongs() {
  try {
    const songs: Song[] = yield call(fetchSongsApi);
    // console.log(songs,'mmmmmmmmmmmmm')
    yield put(fetchSongsSucces(songs));
  } catch (error) {
    yield put(fetchSongsFailure((error as Error).message));
  }
}

function* addSong(action: PayloadAction<Song>) {
  try {
    const newSong: Song = yield call(addSongApi, action.payload);
    // console.log(newSong, "newwwwww");
    yield put(addSongSuccess(newSong));
  } catch (error) {
    yield put(addSongFailure((error as Error).message));
  }
}

function* updateSong(action: PayloadAction<Song>) {
  try {
    const updatedSong: Song = yield call(updateSongApi, action.payload);
    console.log(updatedSong, "updated");
    yield put(updateSongSuccess(updatedSong));
  } catch (error) {
    yield put(updateSongFailure((error as Error).message));
  }
}

function* deleteSong(action: PayloadAction<string>) {
  try {
    const deleted: Song = yield call(deleteSongApi, action.payload);
    console.log(deleted, "deleted");
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
