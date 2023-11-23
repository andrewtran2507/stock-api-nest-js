import { Migration } from '@mikro-orm/migrations';

export class Migration20231123085913 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "stock" ("id" uuid not null, constraint "stock_pkey" primary key ("id"));');

    this.addSql('drop index "post_entity_deleted_at_index";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "stock" cascade;');

    this.addSql('create index "post_entity_deleted_at_index" on "post_entity" ("deleted_at");');
  }

}
