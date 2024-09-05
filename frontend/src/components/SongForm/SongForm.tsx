/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Song } from '../../features/songs/songsSlice';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

interface SongFormProps {
  onSubmit: (song: Song) => void;
  initialSong?: Song;
}

const SongForm: React.FC<SongFormProps> = ({ onSubmit, initialSong }) => {
  const [song, setSong] = useState<Song>({
    title: '',
    artist: '',
    album: '',
    genre: ''
  });

  useEffect(() => {
    if (initialSong) {
      setSong(initialSong);
    }
  }, [initialSong]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(song);
    // Reset form after submission if not editing
    if (!initialSong) {
      setSong({ title: '', artist: '', album: '', genre: '' });
    }
  };

  return (
    <div css={songFormStyles}>
      <h2>{initialSong ? 'Edit Song' : 'Add Song'}</h2>
      <Link to='/'><button>Back to Song List</button></Link>
      <form onSubmit={handleSubmit} css={songFormStyles}>
        <input
          type="text"
          name="title"
          value={song.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="artist"
          value={song.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
        />
        <input
          type="text"
          name="album"
          value={song.album}
          onChange={handleChange}
          placeholder="Album"
          required
        />
        <input
          type="text"
          name="genre"
          value={song.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <button type="submit">{initialSong ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

const songFormStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;

  h2 {
    margin-bottom: 16px;
    font-size: 24px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 16px;
  }

  input {
    margin-bottom: 12px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #6c7;
    }
  }
    
  }
`;


export default SongForm;
