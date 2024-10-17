import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration21729172593993 implements MigrationInterface {
    name = 'NewMigration21729172593993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`EventRules\` (\`eventRulesId\` varchar(255) NOT NULL, \`eventRule\` varchar(255) NOT NULL, \`ruleNo\` int NOT NULL, \`eventId\` varchar(36) NULL, PRIMARY KEY (\`eventRulesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Events\` (\`eventId\` varchar(255) NOT NULL, \`eventName\` varchar(255) NOT NULL, \`eventLogoUrl\` varchar(255) NOT NULL, \`memberCount\` int NOT NULL, \`noOfRounds\` int NOT NULL, \`staffCoordinatorId\` varchar(36) NULL, \`eventHead1Id\` varchar(36) NULL, \`eventHead2Id\` varchar(36) NULL, \`juniorHeadId\` varchar(36) NULL, UNIQUE INDEX \`IDX_7cb8baf2bc816197e4783276e7\` (\`eventName\`), UNIQUE INDEX \`REL_027b35bdd6754fec7f73fc4c2d\` (\`staffCoordinatorId\`), UNIQUE INDEX \`REL_7d27460780fd57d5bd4defcc19\` (\`eventHead1Id\`), UNIQUE INDEX \`REL_863de6bcb5f41db4561ccbb169\` (\`eventHead2Id\`), UNIQUE INDEX \`REL_395c985a61f279d4d363991ea0\` (\`juniorHeadId\`), PRIMARY KEY (\`eventId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`EventRules\` ADD CONSTRAINT \`FK_2b64e2ebdfb7d4e26c522fd8ac2\` FOREIGN KEY (\`eventId\`) REFERENCES \`Events\`(\`eventId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_027b35bdd6754fec7f73fc4c2d9\` FOREIGN KEY (\`staffCoordinatorId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_7d27460780fd57d5bd4defcc19c\` FOREIGN KEY (\`eventHead1Id\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_863de6bcb5f41db4561ccbb1695\` FOREIGN KEY (\`eventHead2Id\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_395c985a61f279d4d363991ea0e\` FOREIGN KEY (\`juniorHeadId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_395c985a61f279d4d363991ea0e\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_863de6bcb5f41db4561ccbb1695\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_7d27460780fd57d5bd4defcc19c\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_027b35bdd6754fec7f73fc4c2d9\``);
        await queryRunner.query(`ALTER TABLE \`EventRules\` DROP FOREIGN KEY \`FK_2b64e2ebdfb7d4e26c522fd8ac2\``);
        await queryRunner.query(`DROP INDEX \`REL_395c985a61f279d4d363991ea0\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`REL_863de6bcb5f41db4561ccbb169\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`REL_7d27460780fd57d5bd4defcc19\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`REL_027b35bdd6754fec7f73fc4c2d\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`IDX_7cb8baf2bc816197e4783276e7\` ON \`Events\``);
        await queryRunner.query(`DROP TABLE \`Events\``);
        await queryRunner.query(`DROP TABLE \`EventRules\``);
    }

}
