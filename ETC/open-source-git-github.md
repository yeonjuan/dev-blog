# 오픈소스 Git/Github 사용법

# fork

fork는 다른 사람의 Github 저장소를 내 Github 레포지토리로 그대로 복사해 가져오는 기능입니다.

## fork 하는 방법

다른 사람의 레포지토리를 fork 하는 방법은 간단합니다.
fork 할 Github 레포지토리 페이지에서 "fork" 버튼을 클릭합니다.

![fork-upstream](./assets/fork-upstream.png)

잠시 기다리면, 내 Github 레포지토리에 fork 된 레포지토리가 생성됩니다.

![fork-origin](./assets/fork-origin.png)

# clone

clone 은 저장소를 원격 저장소를 복사해서 로컬에 가져오는 기능입니다.

## clone 하는 방법

레포지토리를 clone 하기 위해서 먼저 복사할 레포지토리의 주소를 가져옵니다.
레포지토리 주소는 Github 레포지토리 페이지에서 쉽게 복사할 수 있습니다.

![clone](./assets/clone.png)

이후 로컬 터미널에서 아래 명령어를 통해 레포지토리를 clone 합니다.

```bash
git clone [복사할 레포지토리.git]
```
