# よく忘れる、こんな時使うコマンド

## rsyncによるディレクトリの同期

```
rsync -auzz --delete -e ssh <id>@<host>:<remote-path> <local-path>
```
