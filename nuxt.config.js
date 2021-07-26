export default {
    css: ['~/assets/global.scss'],
    server: {
        host: '0.0.0.0'
    },
    serverMiddleware: [
        { path: "/player", handler: "~/server-middleware/player-control.js" }
    ],
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ]
    },
    buildModules: [
        '@nuxtjs/color-mode'
    ]
}