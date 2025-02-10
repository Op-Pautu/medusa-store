import { Migration } from '@mikro-orm/migrations';

export class Migration20250210060204 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "test" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "test_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_test_deleted_at" ON "test" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "test" cascade;`);
  }

}
