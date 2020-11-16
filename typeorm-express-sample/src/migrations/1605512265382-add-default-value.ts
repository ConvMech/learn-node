import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultValue1605512265382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO "public"."account" ("id", "name", "email", "password") VALUES ('0', 'test', 'test@test.com', '123');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "public"."account" WHERE "id" = "0";');
    }

}
