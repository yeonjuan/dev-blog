# Cheat Sheet

* [Git](#Git)
  * [Fork한 레포지토리로 동기화](#Fork한-레포지토리로-동기화)

* [Kubernetes](#Kubernetes)
  * [시크릿 파일 마운트](#시크릿-파일-마운트)

## Git

#### Fork한 레포지토리로 동기화

```bash
$ git remote add upstream {Fork한 레포}
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
$ git push origin master
```

## Kubernetes

#### 시크릿 파일 마운트

```bash
$ kubectl create secret generic {시크릿 이름} --from-file={파일 경로}
```
