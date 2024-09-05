/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatsRequest } from "../../features/stats/statsSlice";
import { RootState } from "../../store/rootReducer";
import { css } from "@emotion/react";

const statsStyles = css`
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

  caption {
    font-weight: bold;
    margin-bottom: 8px;
    text-align: left;
    color: #333;
  }

  .totals-row {
    font-weight: bold;
    background-color: #f0f0f0;
    border: none;
  }

  tfoot td {
    font-weight: bold;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
  }
`;

const Stats: React.FC = () => {
  const dispatch = useDispatch();
  const {
    totalSongs,
    totalGenres,
    totalArtists,
    totalAlbums,
    songsPerGenre,
    songsPerAlbum,
    songsPerArtist,
    loading,
  } = useSelector((state: RootState) => state.stats);

  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  // Determine the maximum length among the arrays
  const maxLength = Math.max(
    songsPerGenre.length,
    songsPerAlbum.length,
    songsPerArtist.length
  );

  return (
    <div css={statsStyles}>
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <table>
          <caption>Statistics Overview</caption>
          <thead>
            <tr>
              <th>Genre</th>
              <th>Song Count</th>
              <th>Album</th>
              <th>Song Count</th>
              <th>Artist</th>
              <th>Song Count</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxLength }).map((_, index) => (
              <tr key={index}>
                <td>{songsPerGenre[index]?._id || "-"}</td>
                <td>{songsPerGenre[index]?.songCount || "-"}</td>
                <td>{songsPerAlbum[index]?._id || "-"}</td>
                <td>{songsPerAlbum[index]?.songCount || "-"}</td>
                <td>{songsPerArtist[index]?._id || "-"}</td>
                <td>{songsPerArtist[index]?.songCount || "-"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td>Total Genres: {totalGenres}</td>
              <td></td>
              <td>Total Albums: {totalAlbums}</td>
              <td></td>
              <td>Total Artists: {totalArtists}</td>
              
              <td>Total Songs: {totalSongs}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Stats;
