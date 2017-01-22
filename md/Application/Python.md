<!--
# vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:
-->
# Python

## Generatorを返す関数

### 痛い目

Generatorを返す関数には、

1. ジェネレータ関数 (**yield** をふくむ関数)
2. ジェネレータオブジェクト(ジェネレータ式など)を返す **普通の** 関数

がありますが、1と2をごっちゃにして痛い目にあったので自分メモ。


### コード例

指定した値が偶数なら偶数、奇数なら奇数を返す
ジェネレータ関数はこんな感じ。

```python
# ジェネレータ関数
def counter_genfunc(max):
    if max % 2 == 0:
        for i in range(0,max):
            if i % 2 == 0:
                yield i
    else:
        for i in range(0,max):
            if i % 2 != 0:
                yield i
```

一方ジェネレータ式を返す普通の関数なら、

```python
# ジェネレータ式を返す関数
def counter_genexp(max):
    if max % 2 == 0:
        return ( i for i in range(0,max) if i % 2 == 0 )
    else:
        return ( i for i in range(0,max) if i % 2 != 0 )
```

で、それをごっちゃにしてやっちゃいけない関数

   _NOTE1: Python 2.7 ではエラーになるので無問題_


```python
# やっちゃいけない関数
def counter_gen_mixed(max):
    if max % 2 == 0:
        for i in range(0,max):
            if i % 2 == 0: yield i
    else:
        return ( i for i in range(0,max) if i % 2 != 0 )
```

理由は歴然、_mixed_ の関数はジェネレータ関数なので、_return_ は
単にジェネレータ関数を **抜ける** だけで、意図した値を返して
くれるわけじゃない。

```python
print(list(counter_gen_mixed(10)))
print(list(counter_gen_mixed(11)))
```

は、上は `[0, 2, 4, 6, 8]` 、下は `[]` となる。
