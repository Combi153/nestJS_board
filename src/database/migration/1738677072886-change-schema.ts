import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeSchema1738677072886 implements MigrationInterface {
  name = 'ChangeSchema1738677072886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\`
          ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\`
          ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\`
          ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\`
          ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\`
          ADD CONSTRAINT \`FK_259bf9825d9d198608d1b46b0b5\` FOREIGN KEY (\`post_id\`) REFERENCES \`comments\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_259bf9825d9d198608d1b46b0b5\``,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`created_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
    await queryRunner.query(
      `ALTER TABLE \`posts\`
          ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\`
          ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\`
          ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\`
          ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
