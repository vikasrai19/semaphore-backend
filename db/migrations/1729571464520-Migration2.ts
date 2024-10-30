import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21729571464520 implements MigrationInterface {
    name = 'Migration21729571464520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`modelName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`title\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`modelName\``);
    }

}
