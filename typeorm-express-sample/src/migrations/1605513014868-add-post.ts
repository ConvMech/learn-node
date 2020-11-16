import {MigrationInterface, QueryRunner} from "typeorm";

export class addPost1605513014868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO "public"."post" ("id", "title", "text", "accountId") VALUES ('0', '1', 'first', '0');`);
      await queryRunner.query(`INSERT INTO "public"."post" ("id", "title", "text", "accountId") VALUES ('1', '2', 'second', '0');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "public"."post" WHERE "id" = "0";');
      await queryRunner.query('DELETE FROM "public"."post" WHERE "id" = "1";');
    }

}
