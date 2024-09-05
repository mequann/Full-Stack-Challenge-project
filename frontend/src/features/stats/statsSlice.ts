// /src/features/stats/statsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatsState {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: { _id: string; songCount: number }[];
  songsPerAlbum: { _id: string; songCount: number }[];
  songsPerArtist: { _id: string; songCount: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songsPerGenre: [],
  songsPerAlbum: [],
  songsPerArtist: [],
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequest(state) {
      state.loading = true;
    },
    fetchStatsSuccess(
      state,
      action: PayloadAction<{
        totalSongs: number;
        totalArtists: number;
        totalAlbums: number;
        totalGenres: number;
        songsPerGenre: { _id: string; songCount: number }[];
        songsPerAlbum: { _id: string; songCount: number }[];
        songsPerArtist: { _id: string; songCount: number }[];
      }>
    ) {
      state.totalSongs = action.payload.totalSongs;
      state.totalArtists = action.payload.totalArtists;
      state.totalAlbums = action.payload.totalAlbums;
      state.totalGenres = action.payload.totalGenres;
      state.songsPerGenre = action.payload.songsPerGenre;
      state.songsPerAlbum = action.payload.songsPerAlbum;
      state.songsPerArtist = action.payload.songsPerArtist;
      state.loading = false;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  fetchStatsRequest, 
  fetchStatsSuccess, 
  fetchStatsFailure } =statsSlice.actions;

export default statsSlice.reducer;
