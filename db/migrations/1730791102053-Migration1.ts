import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11730791102053 implements MigrationInterface {
    name = 'Migration11730791102053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`UserTypes\` (\`userTypeId\` varchar(255) NOT NULL, \`userType\` varchar(255) NOT NULL, \`orderNo\` int NOT NULL, PRIMARY KEY (\`userTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`EventRules\` (\`eventRulesId\` varchar(255) NOT NULL, \`eventRule\` varchar(255) NOT NULL, \`ruleNo\` int NOT NULL, \`eventId\` varchar(36) NULL, PRIMARY KEY (\`eventRulesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`EventHeads\` (\`eventHeadId\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, \`eventId\` varchar(36) NULL, PRIMARY KEY (\`eventHeadId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Events\` (\`eventId\` varchar(255) NOT NULL, \`eventName\` varchar(255) NOT NULL, \`eventLogoUrl\` varchar(255) NOT NULL, \`memberCount\` int NOT NULL, \`noOfRounds\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`orderNo\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`currentRound\` int NOT NULL, \`modelName\` varchar(255) NULL, UNIQUE INDEX \`IDX_7cb8baf2bc816197e4783276e7\` (\`eventName\`), UNIQUE INDEX \`IDX_499f6a440106979a4b063f006d\` (\`orderNo\`), PRIMARY KEY (\`eventId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notifications\` (\`notificationId\` varchar(255) NOT NULL, \`notificationTitle\` varchar(255) NOT NULL, \`notificationContent\` varchar(255) NOT NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`notificationTime\` varchar(255) NOT NULL, \`userUserId\` varchar(36) NULL, PRIMARY KEY (\`notificationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`userId\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isEmailValid\` tinyint NOT NULL DEFAULT 0, \`phoneNumber\` varchar(15) NOT NULL, \`userTypeId\` varchar(36) NULL, UNIQUE INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` (\`username\`), UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`College\` (\`collegeId\` varchar(255) NOT NULL, \`collegeName\` varchar(255) NOT NULL, \`collegeLocation\` varchar(255) NOT NULL, \`registrationRegistrationId\` varchar(255) NULL, UNIQUE INDEX \`IDX_fbcd3efed89e4c9394d8a9b935\` (\`collegeName\`), UNIQUE INDEX \`REL_f27cc582b3cb80a2a658210820\` (\`registrationRegistrationId\`), PRIMARY KEY (\`collegeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Status\` (\`statusId\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`statusId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PaymentDetails\` (\`paymentDetailsId\` varchar(255) NOT NULL, \`accountHolderName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`upiId\` varchar(255) NOT NULL, \`transactionId\` varchar(255) NOT NULL, \`remarks\` varchar(255) NOT NULL, \`statusStatusId\` varchar(36) NULL, \`registrationRegistrationId\` varchar(255) NULL, PRIMARY KEY (\`paymentDetailsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Registration\` (\`registrationId\` varchar(255) NOT NULL, \`teamName\` varchar(255) NOT NULL, \`isPaid\` tinyint NOT NULL DEFAULT 0, \`isTeamReported\` tinyint NOT NULL DEFAULT 0, \`userUserId\` varchar(36) NULL, \`collegeCollegeId\` varchar(255) NULL, \`statusStatusId\` varchar(36) NULL, UNIQUE INDEX \`REL_21f9d3a7c95fb62167295cd5ae\` (\`userUserId\`), UNIQUE INDEX \`REL_28d6fd800398b22f7d36e2f3ed\` (\`collegeCollegeId\`), PRIMARY KEY (\`registrationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TeamScores\` (\`eventScoreId\` varchar(255) NOT NULL, \`roundNo\` int NOT NULL, \`score\` int NOT NULL, \`eventTeamEventTeamId\` varchar(255) NULL, PRIMARY KEY (\`eventScoreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`EventTeams\` (\`eventTeamId\` varchar(255) NOT NULL, \`currentRound\` int NOT NULL, \`registrationRegistrationId\` varchar(255) NULL, \`eventEventId\` varchar(36) NULL, PRIMARY KEY (\`eventTeamId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`EventMembers\` (\`eventMemberId\` varchar(255) NOT NULL, \`memberName\` varchar(255) NOT NULL, \`memberPhoneNumber\` varchar(255) NOT NULL, \`eventTeamEventTeamId\` varchar(255) NULL, PRIMARY KEY (\`eventMemberId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`EventRules\` ADD CONSTRAINT \`FK_2b64e2ebdfb7d4e26c522fd8ac2\` FOREIGN KEY (\`eventId\`) REFERENCES \`Events\`(\`eventId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` ADD CONSTRAINT \`FK_2008b0c461ba0f3d3b12d1db37d\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` ADD CONSTRAINT \`FK_347b36c07ba93c29a627a85904e\` FOREIGN KEY (\`eventId\`) REFERENCES \`Events\`(\`eventId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notifications\` ADD CONSTRAINT \`FK_2f8247063f508baf729646a5c21\` FOREIGN KEY (\`userUserId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_f715471331b9b7c81642e2d3b87\` FOREIGN KEY (\`userTypeId\`) REFERENCES \`UserTypes\`(\`userTypeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`College\` ADD CONSTRAINT \`FK_f27cc582b3cb80a2a658210820c\` FOREIGN KEY (\`registrationRegistrationId\`) REFERENCES \`Registration\`(\`registrationId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` ADD CONSTRAINT \`FK_d64810cc06ab349ee520dd58cb6\` FOREIGN KEY (\`statusStatusId\`) REFERENCES \`Status\`(\`statusId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` ADD CONSTRAINT \`FK_6a79342cd539b0a0e53f931be10\` FOREIGN KEY (\`registrationRegistrationId\`) REFERENCES \`Registration\`(\`registrationId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_21f9d3a7c95fb62167295cd5ae2\` FOREIGN KEY (\`userUserId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_28d6fd800398b22f7d36e2f3eda\` FOREIGN KEY (\`collegeCollegeId\`) REFERENCES \`College\`(\`collegeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_93dfdbc3bcd26d0ebffe5043d86\` FOREIGN KEY (\`statusStatusId\`) REFERENCES \`Status\`(\`statusId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TeamScores\` ADD CONSTRAINT \`FK_32dc8274831b752f98c24af81b2\` FOREIGN KEY (\`eventTeamEventTeamId\`) REFERENCES \`EventTeams\`(\`eventTeamId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` ADD CONSTRAINT \`FK_ef3a367a5396f2b76ce1893d1bf\` FOREIGN KEY (\`registrationRegistrationId\`) REFERENCES \`Registration\`(\`registrationId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` ADD CONSTRAINT \`FK_80b3f2546ef5e6ee8633d0f19f0\` FOREIGN KEY (\`eventEventId\`) REFERENCES \`Events\`(\`eventId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventMembers\` ADD CONSTRAINT \`FK_55bdf2d36e5424b1af9a932bdea\` FOREIGN KEY (\`eventTeamEventTeamId\`) REFERENCES \`EventTeams\`(\`eventTeamId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`EventMembers\` DROP FOREIGN KEY \`FK_55bdf2d36e5424b1af9a932bdea\``);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` DROP FOREIGN KEY \`FK_80b3f2546ef5e6ee8633d0f19f0\``);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` DROP FOREIGN KEY \`FK_ef3a367a5396f2b76ce1893d1bf\``);
        await queryRunner.query(`ALTER TABLE \`TeamScores\` DROP FOREIGN KEY \`FK_32dc8274831b752f98c24af81b2\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_93dfdbc3bcd26d0ebffe5043d86\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_28d6fd800398b22f7d36e2f3eda\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_21f9d3a7c95fb62167295cd5ae2\``);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` DROP FOREIGN KEY \`FK_6a79342cd539b0a0e53f931be10\``);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` DROP FOREIGN KEY \`FK_d64810cc06ab349ee520dd58cb6\``);
        await queryRunner.query(`ALTER TABLE \`College\` DROP FOREIGN KEY \`FK_f27cc582b3cb80a2a658210820c\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_f715471331b9b7c81642e2d3b87\``);
        await queryRunner.query(`ALTER TABLE \`Notifications\` DROP FOREIGN KEY \`FK_2f8247063f508baf729646a5c21\``);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` DROP FOREIGN KEY \`FK_347b36c07ba93c29a627a85904e\``);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` DROP FOREIGN KEY \`FK_2008b0c461ba0f3d3b12d1db37d\``);
        await queryRunner.query(`ALTER TABLE \`EventRules\` DROP FOREIGN KEY \`FK_2b64e2ebdfb7d4e26c522fd8ac2\``);
        await queryRunner.query(`DROP TABLE \`EventMembers\``);
        await queryRunner.query(`DROP TABLE \`EventTeams\``);
        await queryRunner.query(`DROP TABLE \`TeamScores\``);
        await queryRunner.query(`DROP INDEX \`REL_28d6fd800398b22f7d36e2f3ed\` ON \`Registration\``);
        await queryRunner.query(`DROP INDEX \`REL_21f9d3a7c95fb62167295cd5ae\` ON \`Registration\``);
        await queryRunner.query(`DROP TABLE \`Registration\``);
        await queryRunner.query(`DROP TABLE \`PaymentDetails\``);
        await queryRunner.query(`DROP TABLE \`Status\``);
        await queryRunner.query(`DROP INDEX \`REL_f27cc582b3cb80a2a658210820\` ON \`College\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbcd3efed89e4c9394d8a9b935\` ON \`College\``);
        await queryRunner.query(`DROP TABLE \`College\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_499f6a440106979a4b063f006d\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`IDX_7cb8baf2bc816197e4783276e7\` ON \`Events\``);
        await queryRunner.query(`DROP TABLE \`Events\``);
        await queryRunner.query(`DROP TABLE \`EventHeads\``);
        await queryRunner.query(`DROP TABLE \`EventRules\``);
        await queryRunner.query(`DROP TABLE \`UserTypes\``);
    }

}
