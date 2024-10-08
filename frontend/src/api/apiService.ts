import axios from "axios";
import { Song } from "../features/songs/songsSlice";

// Base URL for the APIs
const BASE_API_URL = "https://full-stack-challenge-project-1.onrender.com/api";

// Song-related API calls
export const fetchSongsApi = async () => {
  const response = await axios.get(`${BASE_API_URL}/getAll`);
  // console.log(response.data, "jjjjjjjjjjjjjjj");
  return response.data;
};

export const addSongApi = async (song: Song) => {
  const response = await axios.post(`${BASE_API_URL}/create`, song);
  console.log("from post");
  return response.data;
};

export const updateSongApi = async (song: Song) => {
  if (!song._id) {
    throw new Error("Song ID is missing");
  }
  const response = await axios.put(`${BASE_API_URL}/update/${song._id}`, song);
  // console.log(response.data.song,"from update");
  return response.data.song;
};

export const deleteSongApi = async (id: string) => {
const xx=  await axios.delete(`${BASE_API_URL}/delete/${id}`);
// console.log(xx.data, "from delete")

  return xx.data
};

// Stats-related API call
export const fetchStatsApi = async () => {
  const response = await axios.get(`${BASE_API_URL}/getStatistics`);
  return response.data;
};
