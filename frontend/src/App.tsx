// /src/App.tsx
import './App.css';
import SongsList from './components/SongList/SongList';
import Stats from './components/Stats/Stats';
import { Route, Routes } from 'react-router-dom';
import SongForm from './components/SongForm/SongForm';
import { useDispatch } from 'react-redux';
import { addSongRequest, Song } from './features/songs/songsSlice';

function App() {
  const dispatch = useDispatch();

  return (
    <>
      
      <Routes>
        <Route path="/" element={<SongsList />} />
        <Route
          path="/addsong"
          element={<SongForm onSubmit={(song: Song) => dispatch(addSongRequest(song))} />}
        />
      </Routes>
      
      <Stats />
     
    </>
  );
}

export default App;
