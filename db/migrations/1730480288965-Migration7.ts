import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration71730480288965 implements MigrationInterface {
    name = 'Migration71730480288965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_027b35bdd6754fec7f73fc4c2d9\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_395c985a61f279d4d363991ea0e\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_7d27460780fd57d5bd4defcc19c\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP FOREIGN KEY \`FK_863de6bcb5f41db4561ccbb1695\``);
        await queryRunner.query(`DROP INDEX \`REL_027b35bdd6754fec7f73fc4c2d\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`REL_395c985a61f279d4d363991ea0\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`REL_7d27460780fd57d5bd4defcc19\` ON \`Events\``);
        await queryRunner.query(`DROP INDEX \`REL_863de6bcb5f41db4561ccbb169\` ON \`Events\``);
        await queryRunner.query(`CREATE TABLE \`EventHeads\` (\`eventHeadId\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, \`eventId\` varchar(36) NULL, PRIMARY KEY (\`eventHeadId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`eventHead1Id\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`eventHead2Id\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`juniorHeadId\``);
        await queryRunner.query(`ALTER TABLE \`Events\` DROP COLUMN \`staffCoordinatorId\``);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` ADD CONSTRAINT \`FK_2008b0c461ba0f3d3b12d1db37d\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` ADD CONSTRAINT \`FK_347b36c07ba93c29a627a85904e\` FOREIGN KEY (\`eventId\`) REFERENCES \`Events\`(\`eventId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`EventHeads\` DROP FOREIGN KEY \`FK_347b36c07ba93c29a627a85904e\``);
        await queryRunner.query(`ALTER TABLE \`EventHeads\` DROP FOREIGN KEY \`FK_2008b0c461ba0f3d3b12d1db37d\``);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`staffCoordinatorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`juniorHeadId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`eventHead2Id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD \`eventHead1Id\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`EventHeads\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_863de6bcb5f41db4561ccbb169\` ON \`Events\` (\`eventHead2Id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7d27460780fd57d5bd4defcc19\` ON \`Events\` (\`eventHead1Id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_395c985a61f279d4d363991ea0\` ON \`Events\` (\`juniorHeadId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_027b35bdd6754fec7f73fc4c2d\` ON \`Events\` (\`staffCoordinatorId\`)`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_863de6bcb5f41db4561ccbb1695\` FOREIGN KEY (\`eventHead2Id\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_7d27460780fd57d5bd4defcc19c\` FOREIGN KEY (\`eventHead1Id\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_395c985a61f279d4d363991ea0e\` FOREIGN KEY (\`juniorHeadId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Events\` ADD CONSTRAINT \`FK_027b35bdd6754fec7f73fc4c2d9\` FOREIGN KEY (\`staffCoordinatorId\`) REFERENCES \`Users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
