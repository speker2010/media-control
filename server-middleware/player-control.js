
const { exec } = require('child_process')
const app = require('express')()

const PLAY = 'play'
const PAUSE = 'play-pause'
const MUTE = 'mute'
const UNMUTE = 'mute-unmute'
const NEXT = 'next'
const PREV = 'prev'
const VOLUME_UP = 'volume-up'
const VOLUME_DOWN = 'volume-down'

const addType = `
Add-Type @"
using System;
using System.Threading;
using System.Runtime.InteropServices;

namespace ConsoleApplication1 
{
    public static class PressKeyForMe 
    { 
        [DllImport("user32.dll")] 
        static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

        //public static void Main(string[] args)
        public static void Main(string[] args)
        {            
            byte event_code = 0x00;
            switch (args[0]) {
                case "play":
                    event_code = 0xB3;
                    break;
                case "mute":
                    event_code = 0xAD;
                    break;
                case "prev":
                    event_code = 0xB1;
                    break;
                case "next":
                    event_code = 0xB0;
                    break;
                //volume up 0xAF
                //volume down 0xAE
                default:
                    break;
            }
            keybd_event(event_code, 0, 0, UIntPtr.Zero);
            
        }
    }

}
"@
`

function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, {'shell': 'powershell.exe'}, (error, stdout, stderr)=> {
            if (error) return reject(error)
            if (stderr) return reject(stderr)
            resolve(stdout)
        })
    })
}

async function execFile(filename) {
    
    try {
        const resultAddType = await execCommand(`${addType}\r\n[ConsoleApplication1.PressKeyForMe]::Main("${filename}")`)
        console.log('ps output addType', resultAddType)
        // const resultFireKbdEvent = await execCommand(`[ConsoleApplication1.PressKeyForMe]::Main("${filename}")`)
        // console.log('ps out fireKbdEvent', resultFireKbdEvent)
    } catch (e) {
        console.error(e)
    }
    
    // let ps = new Shell()
    // ps.on('output', console.log)
    // ps.on('error', console.error)
    // ps.on('end', console.log)
    // ps.addCommand(`
    // Add-Type @"
    // using System;
    // using System.Threading;
    // using System.Runtime.InteropServices;

    // namespace ConsoleApplication1 
    // {
    //     public static class PressKeyForMe 
    //     { 
    //         [DllImport("user32.dll")] 
    //         static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    //         //public static void Main(string[] args)
    //         public static void Main(string[] args)
    //         {            
    //             byte event_code = 0x00;
    //             switch (args[0]) {
    //                 case "play":
    //                     event_code = 0xB3;
    //                     break;
    //                 case "mute":
    //                     event_code = 0xAD;
    //                     break;
    //                 case "prev":
    //                     event_code = 0xB1;
    //                     break;
    //                 case "next":
    //                     event_code = 0xB0;
    //                     break;
    //                 //volume up 0xAF
    //                 //volume down 0xAE
    //                 default:
    //                     break;
    //             }
    //             keybd_event(event_code, 0, 0, UIntPtr.Zero);
                
    //         }
    //     }

    // }
    // "@
    // `)
    
    // ps.addCommand(`[ConsoleApplication1.PressKeyForMe]::Main("${filename}")`)
    // try {
    //     console.log('sdf')
    //     const result = await ps.invoke().then(console.log).catch(console.error)
    //     console.log('output ps', result)
    // } catch (e) {
    //     console.error('error ps', e)
    // } finally {
    //     console.log('final ps')
        
    // }
    
    return 'ok'
    // const child = spawn('powershell.exe', [path.resolve(__dirname, `../commands/${filename}.ps1`)])

    // child.stdout.on('data', (data) => {
    //     console.log(`data ${data}`)
    // })

    // child.stderr.on('data', (data) => {
    //     console.log(`errors ${data}`)
    // })

    // child.on('exit', () => {
    //     console.log('exit')
    // })


    // child.stdin.end()
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
    execFile(commands[req.params.cmd]).then(() => {
        res.json({ok: true})
    }).catch((e) => {
        console.log(e)
        res.json({ok: false, info: e})
    })
    
    
})

module.exports = app