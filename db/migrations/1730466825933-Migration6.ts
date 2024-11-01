import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration61730466825933 implements MigrationInterface {
    name = 'Migration61730466825933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`phoneNumber\` varchar(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`phoneNumber\``);
    }

}
