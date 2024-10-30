import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration41729780941059 implements MigrationInterface {
    name = 'Migration41729780941059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`modelName\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`modelName\` varchar(255) NOT NULL`);
    }

}
