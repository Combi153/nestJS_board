import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeSchema1739086871197 implements MigrationInterface {
  name = 'ChangeSchema1739086871197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comments\`
       (
           \`id\`         varchar(36)  NOT NULL,
           \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
           \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
           \`writer\`     varchar(255) NOT NULL,
           \`content\`    varchar(255) NOT NULL,
           \`post_id\`    varchar(36) NULL,
           PRIMARY KEY (\`id\`)
       ) ENGINE=InnoDB`,
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
    await queryRunner.query(`DROP TABLE \`comments\``);
  }
}
