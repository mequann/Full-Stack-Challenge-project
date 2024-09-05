// /src/components/SongCard/SongCard.tsx
import React from "react";
import { Song } from "../../features/songs/songsSlice";
import { css } from "@emotion/react";

interface SongCardProps {
  song: Song;
  onDelete: (id: string) => void;
  onEdit: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (song.id) {
      onDelete(song.id);
    } else {
      console.warn("Song ID is missing.");
    }
  };

  return (
    <tr>
      <td>{song.title}</td> 
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.genre}</td>
      <td>
        <button onClick={() => onEdit(song)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default SongCard;
