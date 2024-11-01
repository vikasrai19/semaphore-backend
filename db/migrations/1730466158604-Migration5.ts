import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration51730466158604 implements MigrationInterface {
    name = 'Migration51730466158604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`currentRound\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`currentRound\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`description\``);
    }

}
