import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11729063190577 implements MigrationInterface {
    name = 'Migration11729063190577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`userId\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isEmailValid\` tinyint NOT NULL DEFAULT 0, \`userTypeId\` varchar(36) NULL, UNIQUE INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` (\`username\`), UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UserTypes\` (\`userTypeId\` varchar(255) NOT NULL, \`userType\` varchar(255) NOT NULL, \`orderNo\` int NOT NULL, PRIMARY KEY (\`userTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Status\` (\`statusId\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`statusId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_f715471331b9b7c81642e2d3b87\` FOREIGN KEY (\`userTypeId\`) REFERENCES \`UserTypes\`(\`userTypeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_f715471331b9b7c81642e2d3b87\``);
        await queryRunner.query(`DROP TABLE \`Status\``);
        await queryRunner.query(`DROP TABLE \`UserTypes\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
