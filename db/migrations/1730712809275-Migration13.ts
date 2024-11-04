import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration131730712809275 implements MigrationInterface {
    name = 'Migration131730712809275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD \`isTeamReported\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP COLUMN \`isTeamReported\``);
    }

}
