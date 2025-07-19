backup database initial data

```sql
pg_dump -U db_user -d db_name --inserts -T _prisma_migrations -f ./data.sql
```
