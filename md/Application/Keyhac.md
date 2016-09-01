# Keyhac


このファイルを書き換える。

~/AppData/Roaming/Keyhac/config.py

以下を終わりに


```config.py
    #######################################################################
    # MY Customization
    #######################################################################

    def my_basic_keymap(_keymap):
        _keymap[ "C-H" ] = "Back"
        _keymap[ "C-M" ] = "Return"
        _keymap[ "C-D" ] = "Delete"
        _keymap[ "C-P" ] = "Up"                  # Move cursor up
        _keymap[ "C-N" ] = "Down"                # Move cursor down
        _keymap[ "C-F" ] = "Right"               # Move cursor right
        _keymap[ "C-B" ] = "Left"                # Move cursor left
        _keymap[ "C-A" ] = "Home"                # Move to beginning of line
        _keymap[ "C-E" ] = "End"                 # Move to end of line
        _keymap[ "C-V" ] = "PageDown"            # Page down
        _keymap[ "A-V" ] = "PageUp"              # page up
        _keymap[ "C-K" ] = "S-End","C-X"         # Removing following text
        _keymap[ "C-Y" ] = "C-V"                 # Paste


    if 1:
        my_basic_keymap(keymap.defineWindowKeymap(exe_name="OUTLOOK.EXE"))
        my_basic_keymap(keymap.defineWindowKeymap(exe_name="ONENOTE.EXE"))
```
