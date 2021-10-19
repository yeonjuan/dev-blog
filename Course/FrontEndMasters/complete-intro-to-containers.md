# Complete Intro to Containers (feat. Docker)

> [Complete Intro to Containers (feat. Docker)](https://frontendmasters.com/courses/complete-intro-containers) 수강후 정리한 글.

- [Containers](#containers)
- [Docker](#docker)
- [NodeJS on Docker](#nodejs-on-docker)
- [Tags](#tags)
- [Docker CLI](#docker-cli)

## Containers

### 왜 컨테이너가 필요한가?

**Bare Metal**

Bare Metal 이란 별도의 추상화(가상화) 없이 직접 프로세서에서 실행되는 것을 뜻한다.
성능에 민감하고 서버 관리 인력이 충분한 경우 웹 서버를 Bare Metal로 관리하는 것이 유용할 수도 있다.

하지만 유연성이 많이 떨어진다. 서버 확장, 운영체제 업데이트, 하드웨어 드라이버 등 대응, 관리해야 할 요소가 많다.

**Virtual Machines**

Virtual Machine 은 Bare Metal의 다음 단계로 Bare Metal 과 사용자 사이에 추상화 층을 더한 것이다.
예를 들어 물리 머신 하나에서 하나의 Linux 인스턴스를 실행하는 것 대신 여러 개의 Linus 게스트 인스턴스를 실행할 수 있다.

**Public Cloud**

Microsoft Azure 나 Amazon 와 같이 기업에서 제공하는 퍼블릭 클라우드 서비스를 통해 VM 을 획득할 수 있다.
비용에 따라 미리 할당된 메모리나 컴퓨터 성능을 사용한다.
직접 물리 서버를 관리할 필요는 없어졌지만 모든 소프트웨어는 직접 관리해야 한다.

**Container**

chroot, cgroup 을 사용하여 프로세스 그룹을 서로 구분해 보안과 리소스 관리를 더 안전하게 한다.

## Docker

아래 명령어로 `alpine:3.10` 버전의 이미지를 pull 받아 실행 시킬 수 있다. 실행시킨후 쉘에 연결된다. (`alpine` 은 경량화된 버전을 뜻한다.)

```bash
$ docker run --interactive --tty alpine:3.10
# or
$ docker run -it alpine:3.10
```

아래 명령어로 백드라운드에서 도커를 실행 시킬 수 있다.

```bash
$ docker run --detach -it ubuntu:bionic
# or
$ docker run -dit ubuntu:bionic
```

`docker ps` 를 통해 백그라운드에서 실행되는 컨테이너를 확인할 수 있다.

```bash
$ docker ps

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
527265773c63        ubuntu:bionic       "bash"              5 seconds ago       Up 5 seconds                            brave_euler
```

`docker kill` 을 통해 실행되는 컨테이너를 종료시킬 수 있다.

```bash
$ docker kill {CONTAINER_ID}
```

아래 명령어로 모든 컨테이너를 종료시킬 수 있다.

```
$ docker kill $(docker ps -q)
```

## NodeJS on Docker

아래 명령어로 node v 12, Debian 이미지를 실행 시킨다.

```bash
docker run -it node:12-stretch
```

node REPL 이 실행되기 때문에 바로 nodejs 스크립트를 실행시킬 수 있다.

```js
console.log("x");
> "x"
```

아래 명령어로 bash 를 실행 시킬 수 있다.

```bash
$ docker run -it node:12-stretch bash

$ node -v
v12.13.1
```

## Tags

이미지에 태그를 지정하지 않으면 배포된 최근 버전을 의미하는 `latest` 태그를 사용하게 된다.
[docker hub](https://hub.docker.com/) 에서 이미지가 제공하는 태그 목록을 확인할 수 있다.

## Docker CLI

**pull**

이미지를 받아올 수 있다.

```bash
$ docker pull {image}
```

**inspect**

이미지에 대한 여러 정보를 확인할 수 있다.

```bash
$ docker inspect {image}

[
    {
        //...
        "Cmd": [ # 실행하는 CMD
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"node\"]"
            ],
```

**pause/unpause**

pause, unpause 를 통해 프로세스를 멈추고 다시 실행할 수 있다.

```bash
$ docker pause {container id}
$ docker unpause {container id}
```

**kill**

```bash
$ docker kill {container id} # 실행중인 특정 도커 컨테이너를 제거한다.
$ docker kill $(docker ps -q) # 실행중인 모든 도커 컨테이너를 제거한다.
```

**run/exec**

- run: 새로운 컨테이너를 실행한다.

  ```bash
  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  ```

- exec: 현재 실행중인 컨테이너에 명령을 내린다.

  ```bash
  $ docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
  ```

**info**

Docker 호스팅 시스템에 대한 정보를 출력한다.

```
$ docker info
```

**image list**

도커 이미지 목록을 출력한다.

```bash
$ docker image list
```

## Dockerfile

```dockerfile
FROM node:12-stretch  # node:12-stretch 를 기본 이미지로 사용

CMD ["node", "-e", "console.log(\"omg hi lol\")"] # CMD 를 통해 명령어를 실행 가능하다.
CMD ["node", "-e", "console.log(\"last\")"] # 단, CMD 중에서 맨 마지막에 위치한 CMD 만 동작한다. (overwrite)
```

이미지 빌드 후 실행

```
$ docker build .
$ docker run {image}

last
```

`--tag` 옵션으로 이미지에 이름을 붙혀서 빌드할 수 있다.

```
$ docker build --tag my-node-app .
```
