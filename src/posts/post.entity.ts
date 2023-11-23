import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { ObjectType, Field } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType()
@Entity()
class PostEntity {
  @Field()
  @PrimaryKey({ type: 'uuid', onCreate: () => v4() })
  id: string;

  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  content: string;

  @Field(() => Date, { nullable: true })
  @Property({
    type: 'timestamptz',
    onCreate: () => null,
    onUpdate: () => new Date(),
    nullable: true,
  })
  deleted_at?: Date;

  @Field(() => Date, { nullable: true })
  @Property({ type: 'timestamptz', onCreate: () => new Date(), nullable: true })
  created_at?: Date;

  @Field(() => Date, { nullable: true })
  @Property({
    type: 'timestamptz',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
    nullable: true,
  })
  updated_at?: Date;
}

export default PostEntity;
