# Windows

Windowsのことについて。

## SendTo emacsclient to SendTo

1. Create the shortcut to `emacsclientw.exe` under the forlder `~\AppData\Roaming\Microsoft\Windows\SendTo\`
   
   
2. Change Properties like below
   Note that tha part `%HOME%` should be replaced by the home directory path

   ```
   C:\local_data\app\emacs-24.5-IME-patched-generic-cpu\bin\emacsclientw.exe -n --server-file %HOME%\.emacs.d\server\server --alternate-editor C:\local_data\app\emacs-24.5-IME-patched-generic-cpu\bin\runemacs.exe
   ```
