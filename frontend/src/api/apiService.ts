import axios from 'axios';
import { Song } from '../features/songs/songsSlice';

// Base URL for the APIs
const BASE_API_URL = 'http://localhost:5000/api';

// Song-related API calls
export const fetchSongsApi = async () => {
  const response = await axios.get(`${BASE_API_URL}/getAll`);
  console.log(response.data ,'jjjjjjjjjjjjjjj')
  return response.data;
};

export const addSongApi = async (song: { title: string; artist: string; album: string; genre: string }) => {
  const response = await axios.post(`${BASE_API_URL}/create`, song);
  console.log('from post')
  return response.data;
};

export const updateSongApi = async (song: Song) => {
  if (!song._id) {
    throw new Error('Song ID is missing');
  }
  const response = await axios.put(`${BASE_API_URL}/update/${song._id}`, song);
  return response.data;
};


export const deleteSongApi = async (id: string) => {
  await axios.delete(`${BASE_API_URL}/delete/${id}`);
};

// Stats-related API call
export const fetchStatsApi = async () => {
  const response = await axios.get(`${BASE_API_URL}/getStatistics`);
  return response.data;
};
