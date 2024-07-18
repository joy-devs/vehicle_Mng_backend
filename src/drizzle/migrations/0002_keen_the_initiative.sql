ALTER TABLE "auth_on_users" DROP CONSTRAINT "auth_on_users_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "auth_on_users" DROP COLUMN IF EXISTS "user_id";