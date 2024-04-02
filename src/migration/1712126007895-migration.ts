import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712126007895 implements MigrationInterface {
    name = 'Migration1712126007895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book_instance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`imprint\` varchar(50) NOT NULL, \`status\` enum ('available', 'on_loan', 'lost') NOT NULL DEFAULT 'available', \`due_back\` date NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(50) NOT NULL, \`family_name\` varchar(50) NOT NULL, \`day_of_birth\` date NULL, \`day_of_death\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(50) NOT NULL, \`summary\` varchar(300) NOT NULL, \`isbn\` varchar(30) NULL, \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_genres_genre\` (\`bookId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_31d658e0af554165f4598158c5\` (\`bookId\`), INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` (\`genreId\`), PRIMARY KEY (\`bookId\`, \`genreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_instance\` ADD CONSTRAINT \`FK_0ae696d2366c8a89f5bc0d90181\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_66a4f0f47943a0d99c16ecf90b2\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_31d658e0af554165f4598158c55\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_83bd32782d44d9db3d68c3f58c1\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_83bd32782d44d9db3d68c3f58c1\``);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_31d658e0af554165f4598158c55\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_66a4f0f47943a0d99c16ecf90b2\``);
        await queryRunner.query(`ALTER TABLE \`book_instance\` DROP FOREIGN KEY \`FK_0ae696d2366c8a89f5bc0d90181\``);
        await queryRunner.query(`DROP INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_31d658e0af554165f4598158c5\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`genre\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`author\``);
        await queryRunner.query(`DROP TABLE \`book_instance\``);
    }

}
