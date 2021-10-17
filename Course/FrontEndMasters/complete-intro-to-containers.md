# Complete Intro to Containers (feat. Docker)

> [Complete Intro to Containers (feat. Docker)](https://frontendmasters.com/courses/complete-intro-containers) 수강후 정리한 글.

## Containers

### 왜 컨테이너가 필요한가?

**Bare Metal**

Bare Metal 이란 별도의 추상화(가상화) 없이 직접 프로세서에서 실행되는 것을 뜻한다.
성능에 민감하고 서버 관리 인력이 충분한 경우 웹 서버를 Bare Metal 로 관리하는 것이 유용할 수도 있다.

하지만 유연성이 많이 떨어진다. 서버 확장, 운영체제 업데이트, 하드웨어 드라이버등 대응, 관리해야 할 요소가 많다.

**Virtual Machines**

Virtual Machine 은 Bare Metal 의 다음 단계로 Bare Metal 과 사용자 사이에 추상화 층을 더한 것이다.
예를 들어 물리 머신 하나에서 하나의 Linux 인스턴스를 실행하는 것 대신 여러개의 Linus 게스트 인스턴스를 실행 할 수 있다.

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
