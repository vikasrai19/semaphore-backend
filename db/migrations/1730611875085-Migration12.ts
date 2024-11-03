import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration121730611875085 implements MigrationInterface {
    name = 'Migration121730611875085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`PaymentDetails\` (\`paymentDetailsId\` varchar(255) NOT NULL, \`accountHolderName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`upiId\` varchar(255) NOT NULL, \`transactionId\` varchar(255) NOT NULL, \`statusStatusId\` varchar(36) NULL, \`registrationRegistrationId\` varchar(255) NULL, UNIQUE INDEX \`REL_d64810cc06ab349ee520dd58cb\` (\`statusStatusId\`), PRIMARY KEY (\`paymentDetailsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD \`isPaid\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` ADD \`eventEventId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` ADD CONSTRAINT \`FK_d64810cc06ab349ee520dd58cb6\` FOREIGN KEY (\`statusStatusId\`) REFERENCES \`Status\`(\`statusId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` ADD CONSTRAINT \`FK_6a79342cd539b0a0e53f931be10\` FOREIGN KEY (\`registrationRegistrationId\`) REFERENCES \`Registration\`(\`registrationId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` ADD CONSTRAINT \`FK_80b3f2546ef5e6ee8633d0f19f0\` FOREIGN KEY (\`eventEventId\`) REFERENCES \`Events\`(\`eventId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`EventTeams\` DROP FOREIGN KEY \`FK_80b3f2546ef5e6ee8633d0f19f0\``);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` DROP FOREIGN KEY \`FK_6a79342cd539b0a0e53f931be10\``);
        await queryRunner.query(`ALTER TABLE \`PaymentDetails\` DROP FOREIGN KEY \`FK_d64810cc06ab349ee520dd58cb6\``);
        await queryRunner.query(`ALTER TABLE \`EventTeams\` DROP COLUMN \`eventEventId\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP COLUMN \`isPaid\``);
        await queryRunner.query(`DROP INDEX \`REL_d64810cc06ab349ee520dd58cb\` ON \`PaymentDetails\``);
        await queryRunner.query(`DROP TABLE \`PaymentDetails\``);
    }

}
