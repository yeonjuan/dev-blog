# Cheat Sheet

* [Git](#Git)
  * [Fork한 레포지토리로 동기화](#Fork한-레포지토리로-동기화)

* [Kubernetes](#Kubernetes)
  * [시크릿 파일 마운트](#시크릿-파일-마운트)
  * [SSL 인증서 마운트](#SSL-인증서-마운트)

* [Docker](#Docker)
  * [로컬 이미지, 컨테이너 제거](#로컬-이미지-컨테이너-제거)

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

#### SSL 인증서 마운트

```bash
$ kubectl create secret tls {시크릿 이름} --key {key 파일 경로} --cert {cert 파일 경로}
```

## Docker

#### 로컬 이미지, 컨테이너 제거

```bash
$ docker rm $(docker ps -q -f 'status=exited')
$ docker rmi $(docker images -q -f "dangling=true")
```
