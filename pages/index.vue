<template>
<div class="player">
    <div class="dark-switch">
        <button @click="() => {$colorMode.preference = $colorMode.preference === 'light'? 'dark': 'light'}" class="btn btn__secondary">
            {{$colorMode.preference === 'light' ? 'To dark': 'To light'}}
        </button>
    </div>
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
$dark-shadow: -4.8px -4.8px 10px #494949, 3.2px 3.2px 10px #050606;
$inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2), 
inset -.2rem -.2rem .5rem var(--white);
$dark-inner-shadow: inset 3.2px 3.2px 8px #050606, inset -3.2px -3.2px 8px #494949;

.dark-switch {
    position: fixed;
    top: 20px;
    right: 20px;
}

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
    grid-gap: 40px;
    border-radius: 12px;
    box-shadow: $shadow;
    padding: 4rem;

    @media (max-width: 768px) {
        padding: 20px;
        
    }
}

.btn {
    color: #000;
    border: 0;
    padding: 15px 30px;
    border-radius: 8px;
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

.dark-mode {
    .control-panel {
        box-shadow: $dark-shadow;
    }
    .btn {
        color: #A7A8AA;
        box-shadow: $dark-shadow;
    }
    .btn__secondary {
        &:active {
            box-shadow: $dark-inner-shadow;
        }
    }
}


</style>