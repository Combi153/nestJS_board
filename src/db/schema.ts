import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { nanoid } from 'nanoid';
import { PostCategory } from '../posts/domain/enum/category.enum';

const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
};

export const postModel = mysqlTable('posts', {
  id: varchar('id', { length: 21 })
    .$defaultFn(() => nanoid(21))
    .primaryKey(),
  writer: varchar({ length: 20 }).notNull(),
  type: mysqlEnum([PostCategory.PRIVATE, PostCategory.PUBLIC]).notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 300 }).notNull(),
  ...timestamps,
});
