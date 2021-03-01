---
slug: "/cheatsheet/kubernetes"
date: "2019-05-04"
title: "Kubernetes"
---

- [Mount secret file](#mount-secret-file)
- [Mount SSL](#mount-ssl)

### Mount secret file

```bash
$ kubectl create secret generic {secret name} --from-file={file path}
```

### Mount SSL

```bash
$ kubectl create secret tls {secret name} --key {key file path} --cert {cert file path}
```
