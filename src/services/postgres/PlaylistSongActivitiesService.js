const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongActivitiesService {
    constructor() {
        this._pool = new Pool();
    }

    async addAction({ playlistId, songId, userId, action }) {
        const id = `playlistSongActivity-${nanoid(16)}`;
        const time = new Date().toISOString();

        const query = {
            text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
            values: [id, playlistId, songId, userId, action, time],
        };

        await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Gagal menambahkan aktivitas');
        }

        return id;
    }

    async getActions(playlistId) {
        const query = {
            text: `SELECT playlist_song_activities.id, users.username, playlist_song_activities.action, playlist_song_activities.time FROM playlist_song_activities
            LEFT JOIN users ON users.id = playlist_song_activities.user_id
            WHERE playlist_song_activities.playlist_id = $1`,
            values: [playlistId],
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Tidak ada aktivitas pada playlist ini');
        }

        return result.rows;
    }
}

module.exports = PlaylistSongActivitiesService;
