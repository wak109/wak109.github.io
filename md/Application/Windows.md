# Windows

Windowsのことについて。

## SendTo emacsclient to SendTo

1. Create the shortcut to `emacsclientw.exe` under the forlder `~\AppData\Roaming\Microsoft\Windows\SendTo\`
   
   
2. Change Properties like below
   Note that tha part `%HOME%` should be replaced by the home directory path

   ```
   C:\local_data\app\emacs-24.5-IME-patched-generic-cpu\bin\emacsclientw.exe -n --server-file %HOME%\.emacs.d\server\server --alternate-editor C:\local_data\app\emacs-24.5-IME-patched-generic-cpu\bin\runemacs.exe
   ```

## Surface Pro 3

Ins Keyがないので[Sharp Key][SharpKey]で[Ins Keyを他のキーに割り当てられる][MapInsKey]。


[SharpKey]:http://sharpkeys.codeplex.com/
[MapInsKey]:http://www.hanselman.com/blog/HowToMapAnInsertKeyOnYourSurfacePro3Keyboard.aspx
