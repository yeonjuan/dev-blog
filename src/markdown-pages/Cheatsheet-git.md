---
slug: "/cheatsheet/git"
date: "2019-05-04"
title: "Git"
---

- [Delete remote tag](#delete-remote-tag)
- [Sync forked repo](#sync-forked-repo)

### Delete remote tag

Delete remote tag.

```bash
$ git push --delete origin {tagname}
```

### Sync forked repo

Sync forked repo.

```bash
$ git remote add upstream {upstream github.git}
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
$ git push origin master
```
