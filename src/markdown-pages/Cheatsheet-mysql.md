---
slug: "/cheatsheet/mysql"
date: "2019-05-04"
title: "MySQL"
---

- [Add column](#add-column)
- [Connecting to the MySQL](#connecting-to-the-mysql)

### Add column

Adding a new column in the existing table.

```sql
ALTER TABLE table_name ADD COLUMN column_name VARCHAR(200) NOT NULL;
```

### Connecting to the MySQL

Connecting to the MySQL using command.

```console
$ mysql -h 123.456.7.89 -P 3306 -u root -p
```
