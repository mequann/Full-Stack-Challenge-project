const { Song,
    createSong,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong, 
    getStatistics   
} = require("../model/model");
module.exports= {
    createController:(req, res) => {
        const { title, artist, album, genre } = req.body;

        createSong(title, artist, album, genre)
            .then((song) => {
                res.status(201).json({
                    message: "Song created successfully",
                    song: song
                });
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    },
    getAllController: async(req, res) => {
        try {
            const songs = await getAllSongs();
            res.status(200).json(songs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getByIdController: async(req, res) => {
        try {
            const { id } = req.params;
            const song = await getSongById(id);
            res.status(200).json({
                message: "Song retrieved successfully",
                song: song
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateController: async(req, res) => {
        try {
            const { id } = req.params;
            const { title, artist, album, genre } = req.body;    
            const song = await updateSong(id, title, artist, album, genre);
            res.status(200).json({
                message: "Song updated successfully",
                song: song
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteController: async(req, res) => {
        try {
            const { id } = req.params;
            const song = await deleteSong(id);
            res.status(200).json({
                message: "Song deleted successfully",
                song: song
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getStatisticsController: async(req, res) => {
        try {
            const statistics = await getStatistics();
            res.status(200).json(statistics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}   