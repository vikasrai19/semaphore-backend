import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration91730550764318 implements MigrationInterface {
    name = 'Migration91730550764318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`College\` (\`collegeId\` varchar(255) NOT NULL, \`collegeName\` varchar(255) NOT NULL, \`collegeLocation\` varchar(255) NOT NULL, \`registrationRegistrationId\` varchar(255) NULL, UNIQUE INDEX \`IDX_fbcd3efed89e4c9394d8a9b935\` (\`collegeName\`), UNIQUE INDEX \`IDX_e7e889e3152332bdd3fdc0ca56\` (\`collegeLocation\`), UNIQUE INDEX \`REL_f27cc582b3cb80a2a658210820\` (\`registrationRegistrationId\`), PRIMARY KEY (\`collegeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Registration\` (\`registrationId\` varchar(255) NOT NULL, \`teamName\` varchar(255) NOT NULL, \`userUserId\` varchar(36) NULL, \`collegeCollegeId\` varchar(255) NULL, \`statusStatusId\` varchar(36) NULL, UNIQUE INDEX \`REL_21f9d3a7c95fb62167295cd5ae\` (\`userUserId\`), UNIQUE INDEX \`REL_28d6fd800398b22f7d36e2f3ed\` (\`collegeCollegeId\`), UNIQUE INDEX \`REL_93dfdbc3bcd26d0ebffe5043d8\` (\`statusStatusId\`), PRIMARY KEY (\`registrationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`College\` ADD CONSTRAINT \`FK_f27cc582b3cb80a2a658210820c\` FOREIGN KEY (\`registrationRegistrationId\`) REFERENCES \`Registration\`(\`registrationId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_21f9d3a7c95fb62167295cd5ae2\` FOREIGN KEY (\`userUserId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_28d6fd800398b22f7d36e2f3eda\` FOREIGN KEY (\`collegeCollegeId\`) REFERENCES \`College\`(\`collegeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_93dfdbc3bcd26d0ebffe5043d86\` FOREIGN KEY (\`statusStatusId\`) REFERENCES \`Status\`(\`statusId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_93dfdbc3bcd26d0ebffe5043d86\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_28d6fd800398b22f7d36e2f3eda\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_21f9d3a7c95fb62167295cd5ae2\``);
        await queryRunner.query(`ALTER TABLE \`College\` DROP FOREIGN KEY \`FK_f27cc582b3cb80a2a658210820c\``);
        await queryRunner.query(`DROP INDEX \`REL_93dfdbc3bcd26d0ebffe5043d8\` ON \`Registration\``);
        await queryRunner.query(`DROP INDEX \`REL_28d6fd800398b22f7d36e2f3ed\` ON \`Registration\``);
        await queryRunner.query(`DROP INDEX \`REL_21f9d3a7c95fb62167295cd5ae\` ON \`Registration\``);
        await queryRunner.query(`DROP TABLE \`Registration\``);
        await queryRunner.query(`DROP INDEX \`REL_f27cc582b3cb80a2a658210820\` ON \`College\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7e889e3152332bdd3fdc0ca56\` ON \`College\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbcd3efed89e4c9394d8a9b935\` ON \`College\``);
        await queryRunner.query(`DROP TABLE \`College\``);
    }

}
