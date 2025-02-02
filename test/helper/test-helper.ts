import { execSync } from 'child_process';
import { DatabaseService } from '../../src/database/database.service';
import { sql } from 'drizzle-orm';

export class TestHelper {
  constructor(private readonly databaseService: DatabaseService) {}

  async setUpTestDB(): Promise<void> {
    this.databaseService.onModuleInit();
    await this.setSchema();
  }

  private async setSchema() {
    execSync(`NODE_ENV=${process.env.NODE_ENV} npx drizzle-kit push`, {
      stdio: 'inherit',
    });
    // const db = this.databaseService.getDb();
    // await migrate(db, { migrationsFolder: './drizzle' });
  }

  async clearDatabase() {
    const db = this.databaseService.getDb();
    const query = sql`SELECT table_name
                      FROM information_schema.tables
                      WHERE table_schema = ${process.env.DATABASE_SCHEMA};
    `;
    const [tables] = await db.execute(query);

    await db.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 0'));
    for (const table of tables as unknown as Array<{ TABLE_NAME: string }>) {
      await db.execute(sql`TRUNCATE TABLE ${sql.raw(table.TABLE_NAME)}`);
    }
    await db.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 1'));
  }
}
