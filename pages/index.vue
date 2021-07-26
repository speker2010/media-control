<template>
<div class="player">
    <div class="control-panel">
        <button class="btn btn__secondary" @click="play">Play/Pause</button>
        <button class="btn btn__secondary" @click="mute">Mute/Unmute</button>
        <button class="btn btn__secondary" @click="prev">Prev</button>
        <button class="btn btn__secondary" @click="next">Next</button>
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

<style lang="scss" scoped>


$shadow: .3rem .3rem .6rem var(--greyLight-2), 
-.2rem -.2rem .5rem var(--white);
$inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2), 
inset -.2rem -.2rem .5rem var(--white);

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
    border-radius: 12px;
    box-shadow:.8rem .8rem 1.4rem var(--greyLight-2), 
                -.2rem -.2rem 1.8rem var(--white);
    padding: 4rem;
}

.btn {
    color: #000;
    border: 0;
    height: 4rem;
    border-radius: 1rem;
    box-shadow: $shadow;
    cursor: pointer;
    transition: .3s ease;

    &__primary {
        background: var(--primary);
        box-shadow:inset .2rem .2rem 1rem var(--primary-light), 
                inset -.2rem -.2rem 1rem var(--primary-dark),
                $shadow;
        color: var(--greyLight-1);
        &:hover { color: var(--white); }
        &:active {
        box-shadow:inset .2rem .2rem 1rem var(--primary-dark), 
                inset -.2rem -.2rem 1rem var(--primary-light);
        }
    }

    &__secondary {
        background: transparent;
        &:hover { color: var(--primary); }
        &:active {
        box-shadow: $inner-shadow;
        }
    }

    p { 
        font-size: 1.6rem;
    }
}
</style>