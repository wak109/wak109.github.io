## SendToでemacsを開く

1. `~\AppData\Roaming\Microsoft\Windows\SendTo\`の下に
   `emacsclientw.exe`のショートカットを作成する。
   
2. Propertiesを以下に書き換える。但し`%HOME%`の部分は自分の
   ホームディレクトリに書きかえないとうまくいかなかった。

   ```
   C:\local_data\app\emacs-24.5-IME-patched-generic-cpu\bin\emacsclientw.exe -n --server-file %HOME%\.emacs.d\server\server --alternate-editor C:\local_data\app\emacs-24.5-IME-patched-generic-cpu\bin\runemacs.exe
   ```
