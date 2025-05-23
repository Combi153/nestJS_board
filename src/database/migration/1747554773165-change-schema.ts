import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeSchema1747554773165 implements MigrationInterface {
  name = 'ChangeSchema1747554773165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user"
        ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
