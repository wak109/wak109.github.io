
# MSYS2インストール

以下の行を加える。

```/etc/fstab
C:/Users /home
```

## pacman

[pacman][https://wiki.archlinuxjp.org/index.php/Pacman]

- pacman -S <package_name1> [package_name2...] : 指定したパッケージをインストールする
- pacman -Sl [repository] : パッケージを一覧表示する（リポジトリを指定可能）
- pacman -Ss [regex...] : パッケージを一覧・検索する（キーワードを指定可能）
- pacman -Su : インストール済みのパッケージを更新する
- pacman -Sy : パッケージのデータベースを更新する
- pacman -Syu : -Su, -Sy の同時指定
- pacman -Q [package_name...] : インストール済みパッケージを一覧・検索する（パッケージを指定可能）
- pacman -Qs [regex...] : インストール済みパッケージを一覧・検索する（をキーワードを指定可能）
- pacman -R <package_name> : 指定したパッケージを削除する
- pacman -Rs <package_name> : 依存関係を含めて指定したパッケージを削除する（指定したパッケージにのみ依存するパッケージを削除）

## pkgfile.exe

足りないファイルがどのパッケージに含まれているのか
探すときに使う。

```
$ pkgfile.exe --update
:: Updating 3 repos...
  download complete: msys                 [   775.7 KiB   374K/s  2 remaining]
  download complete: mingw64              [  1920.9 KiB   572K/s  1 remaining]
  download complete: mingw32              [  1915.9 KiB   535K/s  0 remaining]
:: download complete in 3.65s             <     4.5 MiB  1262K/s  3 files    >
:: waiting for 1 process to finish repacking repos...
$ pkgfile.exe termios.h
msys/msys2-runtime-devel
```

## Symbolic Link

[参照](http://qiita.com/Ted-HM/items/4f2feb9fdacb6c72083c)

MSYS2ではデフォルトではlnでシンボリックリンクの作成ができないのだが、
起動batファイルの中にある行をアンコメントすると、
シンボリックリンクの作成ができるようになる。なお、
シンボリックリンクの作成には管理者権限が必要だ。

``` bat
rem To activate windows native symlinks uncomment next line
set MSYS=winsymlinks:nativestrict
```

## sshd

sshdを動かして、puttyっぽいアプリケーションで自分のMSYS2を動作させる。
ちょっと回りくどいけど、まあputtyっぽいアプリケーションがMSYS2を
対応させる必要はないのでよい。telnetdでもいいんだけど
さすがに過去の遺物すぎてパッケージがない。

### sshd_configを変更

```/etc/ssh/sshd_config
#UsePrivilegeSeparation sandbox
UsePrivilegeSeparation no
```

### ssh hostkeyの作成

```
$ ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa
$ ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N '' -t dsa
$ ssh-keygen -f /etc/ssh/ssh_host_ecdsa_key -N '' -t ecdsa
$ ssh-keygen -f /etc/ssh/ssh_host_ed25519_key -N '' -t ed25519
```

これで``ssh localhost``で、Windowsのpasswordを使ってlogin可能になる。
Windowsのpasswordが使える仕組みがわかってないけど、まあMSYS2が
がんばってるということ。これで、

[RLogin](http://www.letsplay-network.info/rlogin/)

というかっこいいterminal applicationでもMSYS2が使えるようになった。
ありがたい。
