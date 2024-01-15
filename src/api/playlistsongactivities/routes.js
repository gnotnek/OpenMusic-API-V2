const routes = (handler) => [
    {
        method: 'GET',
        path: '/playlists/{playlistId}/activities',
        handler: handler.getActionsHandler,
        options: {
            auth: 'openmusic_jwt',
        },
    }
]