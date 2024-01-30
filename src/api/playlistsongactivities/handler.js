const autoBind = require('auto-bind');

class PlaylistSongActivitiesHandler {
    consturctor(playlistSongActivitiesService, playlistsService, validator) {
        this._playlistSongActivitiesService = playlistSongActivitiesService;
        this._playlistsService = playlistsService;
        this._validator = validator;

        autoBind(this);
    }

    async getPlaylistSongActivitiesHandler(request) {
        const { playlistId } = request.params;

        const actions = await this._playlistSongActivitiesService.getActions(playlistId);

        return {
            status: 'success',
            data: {
                actions,
            },
        };
    }
}

module.exports = PlaylistSongActivitiesHandler;
