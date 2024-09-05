const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  genre: { type: String, required: true },
});

const Song = mongoose.model("Song", songSchema);

const createSong = async (title, artist, album, genre) => {
  const song = new Song({ title, artist, album, genre });
  await song.save();
  return song;
};

const getAllSongs = async () => {
  const songs = await Song.find();
  return songs;
};

const getSongById = async (id) => {
  const song = await Song.findById(id);
  return song;
};
const getStatistics = async () => {
    try {
      // Aggregate pipeline to get overall statistics
      const statistics = await Song.aggregate([
        {
          $facet: {
            totalSongs: [
              { $count: "count" }
            ],
            totalArtists: [
              { $group: { _id: "$artist" } },
              { $count: "count" }
            ],
            totalAlbums: [
              { $group: { _id: "$album" } },
              { $count: "count" }
            ],
            totalGenres: [
              { $group: { _id: "$genre" } },
              { $count: "count" }
            ],
            songsPerGenre: [
              { $group: { _id: "$genre", songCount: { $sum: 1 } } },
              { $sort: { songCount: -1 } } // Sort by the number of songs in each genre
            ],
            songsPerAlbum: [
              { $group: { _id: "$album", songCount: { $sum: 1 } } },
              { $sort: { songCount: -1 } } // Sort by the number of songs in each album
            ],
            songsPerArtist: [
              { $group: { _id: "$artist", songCount: { $sum: 1 } } },
              { $sort: { songCount: -1 } } // Sort by the number of songs per artist
            ]
          }
        },
        {
          $project: {
            totalSongs: { $arrayElemAt: ["$totalSongs.count", 0] },
            totalArtists: { $arrayElemAt: ["$totalArtists.count", 0] },
            totalAlbums: { $arrayElemAt: ["$totalAlbums.count", 0] },
            totalGenres: { $arrayElemAt: ["$totalGenres.count", 0] },
            songsPerGenre: 1,
            songsPerAlbum: 1,
            songsPerArtist: 1
          }
        }
      ]);
  
      // Return the statistics
      return statistics[0];
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  };

const updateSong = async (id, title, artist, album, genre) => {
  const song = await Song.findByIdAndUpdate(
    id,
    { title, artist, album, genre },
    { new: true }
  );
  return song;
};

const deleteSong = async (id) => {
  const song = await Song.findByIdAndDelete(id);
  return song;
};
module.exports = {
  Song,
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,    
  getStatistics
};
