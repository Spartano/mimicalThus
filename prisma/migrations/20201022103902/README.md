# Migration `20201022103902`

This migration has been generated by The Innovation Factory S.r.l. at 10/22/2020, 12:39:02 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL DEFAULT 'http://placeimg.com/640/480/animals'
);
INSERT INTO "new_User" ("id", "createdAt", "email", "name") SELECT "id", "createdAt", "email", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201022090208..20201022103902
--- datamodel.dml
+++ datamodel.dml
@@ -3,16 +3,17 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 model User {
-  id        Int      @id @default(autoincrement())
-  createdAt DateTime @default(now())
-  email     String   @unique
-  name      String
+  id         Int      @id @default(autoincrement())
+  createdAt  DateTime @default(now())
+  email      String   @unique
+  name       String
+  pictureUrl String   @default("http://placeimg.com/640/480/animals")
   UserPassion  UserPassion[]
   UserBehavior UserBehavior[]
 }
```

