import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeSchema1746968438343 implements MigrationInterface {
  name = 'ChangeSchema1746968438343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts"
       (
         "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
         "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
         "writer"     character varying NOT NULL,
         "content"    character varying NOT NULL,
         CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments"
       (
         "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
         "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
         "writer"     character varying NOT NULL,
         "content"    character varying NOT NULL,
         "post_id"    uuid,
         CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "user"
       (
         "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
         "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
         "name"       character varying NOT NULL,
         "email"      character varying NOT NULL,
         CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments"
        ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
