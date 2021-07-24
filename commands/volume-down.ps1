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
        public static void Main()
        {            
            //This code will press and hold the '1' button for 3 secs, and then will release for 1 second
            //VK_F15 0x7E
            keybd_event((byte)0xAE, 0, 0, UIntPtr.Zero);
            
        }
    }

}
"@

[ConsoleApplication1.PressKeyForMe]::Main()