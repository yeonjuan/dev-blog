# 도커 사용법 정리

* [Docker 명령어](#Docker-명령어)
  * [이미지 빌드](#이미지-빌드)
  * [이미지 푸시](#이미지-푸시)
  * [이미지 실행](#이미지-실행)
* [Dockerfile 지시어](#Dockerfile-지시어)
  * [FROM](#FROM)
  * [ADD](#ADD)
  * [COPY](#COPY)
  * [ARG](#ARG)
  * [ENV](#ENV)
  * [RUN](#RUN)
  * [ENTRYPOINT](#ENTRYPOINT)
  * [CMD](#CMD)
* [Tips](#Tips)
  * [Docker OSX: No space left on device](#Docker-OSX-No-space-left-on-device)

## Docker 명령어

#### 이미지 빌드

작성한 Dockerfile 과 같은 디렉터리 위치에서 아래 명령어를 통해 이미지를 빌드할 수 있습니다.

```
docker build -t {이미지 이름} .
```

`-f` 옵션을 사용해 Dockerfile의 경로를 지정해 줄 수도 있습니다.

```
docker build -f {Dockerfile 경로} -t {이미지 이름} .
```

#### 이미지 푸시

아래 명령어를 통해 Docker Hub에 이미지를 업로드 할 수 있습니다.

```
docker push {이미지 이름}
```

#### 이미지실행

아래 명령어를 통해 이미지를 실행 시킬 수 있습니다.

```
docker run {이미지 이름}
```

## Dockerfile 지시어

#### `FROM`

베이스로 사용할 이미지를 지정하는 지시어 입니다.

`FROM {베이스 이미지}` 포맷으로 사용합니다.

```dockerfile
FROM node:alpine
```

#### `ADD`

파일, 디렉터리를 도커 이미지상 특정 경로로 복사 합니다.

복사하려고 하는 파일이 `tar` 압축 파일 일 경우, 자동으로 압축을 풀어서 복사합니다.

`ADD {복사할 파일 1} {복사할 파일 2} ... {복사본이 위치할 경로}` 포맷으로 사용합니다.

```dockerfile
ADD file1 file2 /dest/path
```

#### `COPY`

파일, 디렉터리를 도커 이미지상 특정 경로로 복사합니다.

`COPY {복사할 파일 1} {복사할 파일 2} ... {복사본이 위치할 경로}` 포맷으로 사용합니다.

```dockerfile
COPY file1 file2 /dest/path
```

#### `ARG`

도커 이미지 빌드시에만 사용할 변수를 지정하는 지시어입니다.

`ARG {변수 이름}={값}` 포맷으로 사용합니다.

```dockerfile
ARG NAME=value
```

#### `ENV`

환경변수를 지정하는 지시어입니다.

`ENV {이름}={값}` 포맷으로 사용합니다.

```dockerfile
ENV NAME=value
```

#### `RUN`

실행할 쉘 커맨드를 지정합니다.

```dockerfile
RUN ["npm", "run", "start"]
```

#### `ENTRYPOINT`

이미지가 실행될 때 실행되어야할 기본 커맨드를 지정합니다. 

```dockerfile
ENTRYPOINT ["npm", "run", "start"]
```

#### `CMD`

실행할 쉘 커맨드를 지정합니다.

```dockerfile
RUN ["npm", "run", "start"]
```

## Tips

#### Docker OSX: No space left on device

Docker 이미지 빌드를 하다보면 뜨는 디스크 공간이 부족하다는 에러입니다.
아래 명렁어로 이미지를 정리해주면 해결됩니다.

```
docker rm $(docker ps -q -f 'status=exited')
docker rmi $(docker images -q -f "dangling=true")
```
