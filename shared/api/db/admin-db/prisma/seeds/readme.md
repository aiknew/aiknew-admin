backup database initial data

```sql
pg_dump -U db_user -d db_name --clean --if-exists --inserts -O -T _prisma_migrations -f ./data.sql
```
