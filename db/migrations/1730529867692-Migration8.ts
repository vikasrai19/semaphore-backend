import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration81730529867692 implements MigrationInterface {
    name = 'Migration81730529867692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`modelName\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`modelName\``);
    }

}
