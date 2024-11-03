import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration101730553871361 implements MigrationInterface {
    name = 'Migration101730553871361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Notifications\` (\`notificationId\` varchar(255) NOT NULL, \`notificationTitle\` varchar(255) NOT NULL, \`notificationContent\` varchar(255) NOT NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`notificationTime\` varchar(255) NOT NULL, \`userUserId\` varchar(36) NULL, PRIMARY KEY (\`notificationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TeamScores\` (\`eventScoreId\` varchar(255) NOT NULL, \`roundNo\` int NOT NULL, \`score\` int NOT NULL, \`eventTeamEventTeamId\` varchar(255) NULL, PRIMARY KEY (\`eventScoreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`EventTeams\` (\`eventTeamId\` varchar(255) NOT NULL, \`currentRound\` int NOT NULL, \`registrationRegistrationId\` varchar(255) NULL, PRIMARY KEY (\`eventTeamId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`EventMembers\` (\`eventMemberId\` varchar(255) NOT NULL, \`memberName\` varchar(255) NOT NULL, \`memberPhoneNumber\` varchar(255) NOT NULL, \`eventTeamEventTeamId\` varchar(255) NULL, PRIMARY KEY (\`eventMemberId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Notifications\` ADD CONSTRAINT \`FK_2f8247063f508baf729646a5c21\` FOREIGN KEY (\`userUserId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TeamScores\` ADD CONSTRAINT \`FK_32dc8274831b752f98c24af81b2\` FOREIGN KEY (\`eventTeamEventTeamId\`) REFERENCES \`EventTeams\`(\`eventTeamId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` ADD CONSTRAINT \`FK_ef3a367a5396f2b76ce1893d1bf\` FOREIGN KEY (\`registrationRegistrationId\`) REFERENCES \`Registration\`(\`registrationId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventMembers\` ADD CONSTRAINT \`FK_55bdf2d36e5424b1af9a932bdea\` FOREIGN KEY (\`eventTeamEventTeamId\`) REFERENCES \`EventTeams\`(\`eventTeamId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`EventMembers\` DROP FOREIGN KEY \`FK_55bdf2d36e5424b1af9a932bdea\``);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` DROP FOREIGN KEY \`FK_ef3a367a5396f2b76ce1893d1bf\``);
        await queryRunner.query(`ALTER TABLE \`TeamScores\` DROP FOREIGN KEY \`FK_32dc8274831b752f98c24af81b2\``);
        await queryRunner.query(`ALTER TABLE \`Notifications\` DROP FOREIGN KEY \`FK_2f8247063f508baf729646a5c21\``);
        await queryRunner.query(`DROP TABLE \`EventMembers\``);
        await queryRunner.query(`DROP TABLE \`EventTeams\``);
        await queryRunner.query(`DROP TABLE \`TeamScores\``);
        await queryRunner.query(`DROP TABLE \`Notifications\``);
    }

}
