<template>
<div class="player">
    <div class="control-panel">
        <button class="control" @click="play">Play/Pause</button>
        <button class="control" @click="mute">Mute/Unmute</button>
        <button class="control" @click="prev">Prev</button>
        <button class="control" @click="next">Next</button>
    </div>
</div>
</template>


<script>
import axios from 'axios'

export default {
    methods: {
        play() {
            this.command('play')
        },
        next() {
            this.command('next')
        },
        prev() {
            this.command('prev')
        },
        mute() {
            this.command('mute')
        },
        command(command) {
            axios.put(`/player/${command}`)
        }
    },
    computed: {
        host() {
            if (process.client) {
                return window.location.hostname
            }
        }
    }
}
</script>

<style scoped>
.player {
    display: flex;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.control-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}
.control {
    display: inline-block;
    padding: 30px;
}
</style>