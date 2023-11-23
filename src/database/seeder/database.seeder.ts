import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import PostEntity from 'src/posts/post.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const post = em.create(PostEntity, {
      title: 't2',
      content: 'Andrew.Tran',
    });
    em.persist(post);
  }
}
