import { MigrationInterface, QueryRunner } from 'typeorm';
import * as moment from 'moment';

export class DbSetUp1661860035294 implements MigrationInterface {
  name = 'DbSetUp1661860035294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`menu_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`parent_id\` int NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`workshops\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start\` datetime NOT NULL, \`end\` datetime NOT NULL, \`event_id\` int NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(`INSERT INTO \`menu_items\` (\`id\`, \`name\`, \`url\`, \`parent_id\`, \`created_at\`, \`updated_at\`) VALUES
        (1, 'All events', '/events', NULL, '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (2, 'Laracon', '/events/laracon', 1, '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (3, 'Illuminate your knowledge of the laravel code base', '/events/laracon/workshops/illuminate', 2, '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (4, 'The new Eloquent - load more with less', '/events/laracon/workshops/eloquent', 2, '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (5, 'Reactcon', '/events/reactcon', 1, '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (6, '#NoClass pure functional programming', '/events/reactcon/workshops/noclass', 5, '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (7, 'Navigating the function jungle', '/events/reactcon/workshops/jungle', 5, '2022-05-27 02:38:54', '2022-05-27 02:38:54')`);

    const date1 = moment().subtract(1, 'years').format('YYYY').toString();
    const date2 = moment().add(1, 'years').format('YYYY').toString();

    await queryRunner.query(
      `INSERT INTO \`events\` (\`id\`, \`name\`, \`created_at\`, \`updated_at\`) VALUES
        (1, 'Laravel convention ` +
        date1 +
        `', '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (2, 'Laravel convention ` +
        date2 +
        `', '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (3, 'React convention ` +
        date2 +
        `', '2022-05-27 02:38:54', '2022-05-27 02:38:54')`,
    );

    const time1 = moment().subtract(1, 'years').set('month', 1).set('date', 21);
    const time2 = moment().add(1, 'years');
    const month21 = time2.set('month', 9);
    const month22 = time2.set('month', 10);
    const month23 = time2.set('month', 8);
    const month24 = time2.set('month', 11);

    await queryRunner.query(
      `INSERT INTO \`workshops\` (\`id\`, \`start\`, \`end\`, \`event_id\`, \`name\`, \`created_at\`, \`updated_at\`) VALUES
        (1, '` +
        time1.set('hour', 10).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', '` +
        time1.set('hour', 16).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', 1, 'Illuminate your knowledge of the laravel code base', '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (2, '` +
        month21.set('hour', 10).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', '` +
        month21.set('hour', 16).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', 2, 'The new Eloquent - load more with less', '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (3, '` +
        month22.set('hour', 10).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', '` +
        month22.set('hour', 17).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', 2, 'AutoEx - handles exceptions 100% automatic', '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (4, '` +
        month23.set('hour', 10).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', '` +
        month23.set('hour', 18).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', 3, '#NoClass pure functional programming', '2022-05-27 02:38:54', '2022-05-27 02:38:54'),
        (5, '` +
        month24.set('hour', 9).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', '` +
        month24.set('hour', 17).format('YYYY-MM-DD HH:mm:ss').toString() +
        `', 3, 'Navigating the function jungle', '2022-05-27 02:38:54', '2022-05-27 02:38:54')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //empty
  }
}
