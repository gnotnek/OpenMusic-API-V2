const autoBind = require('auto-bind');

class PlaylistSongActivitiesHandler {
    consturctor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async getPlaylistSongActivitiesHandler(request) {
        const { playlistId } = request.params;

        const actions = await this._service.getActions(playlistId);

        return {
            status: 'success',
            data: {
                actions,
            },
        };
    }
}

module.exports = PlaylistSongActivitiesHandler;
