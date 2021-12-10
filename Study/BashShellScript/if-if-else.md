<!--meta
title: Bash Shell Script 조건문
description: bash if, if-else
keywords: bash, if, if-else
-->

# Bash Shell Script - 조건문 (if-else)

## if 문 문법

```sh
if [ 조건 ] then
  실행문
fi
```

### if 문 예시

```sh
#!/bin/bash

name="foo"

if [ $name = "foo" ] then
    echo "hello ${name}"
fi
```

## if-else 문 문법

```sh
if [ 조건 ] then
    샐행문
else
    실행문
fi
```

## if-else 문 예시

```sh
#!/bin/bash

name="foo"

if [ $name = "bar" ] then
    echo "hello ${name}"
else
    echo "by ${name}";
fi
```
