import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration111730570603958 implements MigrationInterface {
    name = 'Migration111730570603958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e7e889e3152332bdd3fdc0ca56\` ON \`College\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e7e889e3152332bdd3fdc0ca56\` ON \`College\` (\`collegeLocation\`)`);
    }

}
