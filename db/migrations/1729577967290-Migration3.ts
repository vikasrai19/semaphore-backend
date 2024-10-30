import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31729577967290 implements MigrationInterface {
    name = 'Migration31729577967290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`orderNo\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD UNIQUE INDEX \`IDX_499f6a440106979a4b063f006d\` (\`orderNo\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP INDEX \`IDX_499f6a440106979a4b063f006d\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`orderNo\``);
    }

}
