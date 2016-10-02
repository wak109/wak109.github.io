# Emacs

## tramp

### trampのデバッグ

```lisp
(setq tramp-verbose 10)
```

### Windows で named pipe が作れない対処

```lisp
(setq tramp-use-ssh-controlmaster-options nil)
```

### PTYの問題解決

### fakecygptyをMSYS2でコンパイルするときにはまったこと

/usr/bin/gcc をつかう。
/bin/gcc はだめ。


```
fakecygpty$ /bin/gcc -D_GNU_SOURCE -o fakecygpty fakecygpty.c
gcc: エラー: spawn: No such file or directory
fakecygpty$ /usr/bin/gcc -D_GNU_SOURCE -o fakecygpty fakecygpty.c
fakecygpty$ md5sum.exe /bin/gcc
6a4ece7eb8958b1e6093313c74c1b475 */bin/gcc
fakecygpty$ md5sum.exe /usr/bin/gcc
6a4ece7eb8958b1e6093313c74c1b475 */usr/bin/gcc
```

- [SSH with NTEmace][https://www.emacswiki.org/emacs/SshWithNTEmacs]
- [fakecygpty][https://github.com/d5884/fakecygpty]
- [fakecygpty を使うための設定][https://www49.atwiki.jp/ntemacs/pages/28.html]

