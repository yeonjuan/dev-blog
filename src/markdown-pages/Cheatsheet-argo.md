---
slug: "/cheatsheet/argo"
date: "2019-05-04"
title: "Argo"
---

- [Create cron workflow](#create-cron-workflow)
- [Submit workflow](#submit-workflow)

### Create cron workflow

Create cron workflow with argo cli.

```bash
$ argo cron create {cron-workflow.yaml}
```

### Submit workflow

Submit workflow with argo cli.

```bash
$ argo submit {workflow.yaml}
```

### Access the argo workflow ui

```bash
$ kubectl -n argo port-forward svc/argo-server 2746:2746
```
