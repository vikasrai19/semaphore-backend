import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11729004230145 implements MigrationInterface {
    name = 'Migration11729004230145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`userId\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isEmailValid\` tinyint NOT NULL DEFAULT 0, \`userTypeUserTypeId\` varchar(36) NULL, UNIQUE INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` (\`username\`), UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UserTypes\` (\`userTypeId\` varchar(255) NOT NULL, \`userType\` varchar(255) NOT NULL, \`orderNo\` int NOT NULL, PRIMARY KEY (\`userTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Status\` (\`statusId\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`statusId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_2d41ce54c9a13da8d5e64f5bd23\` FOREIGN KEY (\`userTypeUserTypeId\`) REFERENCES \`UserTypes\`(\`userTypeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_2d41ce54c9a13da8d5e64f5bd23\``);
        await queryRunner.query(`DROP TABLE \`Status\``);
        await queryRunner.query(`DROP TABLE \`UserTypes\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
