/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  deleteSongRequest,
  updateSongRequest,
  addSongRequest,
  Song,
} from "../../features/songs/songsSlice";
import SongForm from "../SongForm/SongForm";
import { RootState } from "../../store/rootReducer";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

const SongsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songs, loading } = useSelector((state: RootState) => state.songs);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
   const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch, refresh]);

  const handleDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
    setRefresh(!refresh);
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setRefresh(!refresh);
  };

  const handleSubmit = (song: Song) => {
    if (editingSong) {
      dispatch(updateSongRequest(song));
      setEditingSong(null);
    } else {
      dispatch(addSongRequest(song));
      navigate("/");
    }
    setRefresh(!refresh);
  };

  return (
    <div css={tableStyles}>
      <h3>Song List</h3>
      {loading && <p>Loading...</p>}
      <Link to="/addsong">
        <button>Add New Song</button>
      </Link>
      {editingSong && (
        <SongForm onSubmit={handleSubmit} initialSong={editingSong} />
      )}
      {!editingSong && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs?.map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>
                  <button onClick={() => handleEdit(song)}>Edit</button>
                  <button onClick={() => handleDelete(song._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
const tableStyles = css`
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    border: 1px solid #ccc;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  button {
    margin-right: 8px;
  }
`;

export default SongsList;