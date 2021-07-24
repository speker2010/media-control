const spawn = require('child_process').spawn
const path = require('path')
const app = require('express')()

const PLAY = 'play-pause'
const PAUSE = 'play-pause'
const MUTE = 'mute-unmute'
const UNMUTE = 'mute-unmute'
const NEXT = 'next'
const PREV = 'prev'
const VOLUME_UP = 'volume-up'
const VOLUME_DOWN = 'volume-down'

function execFile(filename) {
    const child = spawn('powershell.exe', [path.resolve(__dirname, `../commands/${filename}.ps1`)])

    child.stdout.on('data', (data) => {
        console.log(`data ${data}`)
    })

    child.stderr.on('data', (data) => {
        console.log(`errors ${data}`)
    })

    child.on('exit', () => {
        console.log('exit')
    })


    child.stdin.end()
}

app.put('/:cmd', (req, res) => {
    const commands = {
        play: PLAY,
        pause: PAUSE,
        next: NEXT,
        prev: PREV,
        volume_up: VOLUME_UP,
        volume_down: VOLUME_DOWN,
        mute: MUTE,
        unmute: UNMUTE
    }
    execFile(commands[req.params.cmd])
    
    res.json({ok: true})
})

module.exports = app