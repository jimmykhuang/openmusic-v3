const { Pool } = require('pg');


class SongsService {

    constructor() {
        this._pool = new Pool();
    }


    async getSongs(userId) {
        const query = {
            //         text: `SELECT notes.* FROM notes
            //   LEFT JOIN collaborations ON collaborations.note_id = notes.id
            //   WHERE notes.owner = $1 OR collaborations.user_id = $1
            //   GROUP BY notes.id`,
            text: `SELECT playlists.* FROM playlists
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      WHERE playlists.owner = $1 OR collaborations.playlist_id = $1
      GROUP BY playlists.id`,
            values: [userId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = SongsService;