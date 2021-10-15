import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatedUserEntity1634048083211 implements MigrationInterface {
  private readonly table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
      },
      { name: 'createdAt', type: 'timestamptz', default: 'now()' },
      { name: 'updatedAt', type: 'timestamptz', isNullable: true },
      { name: 'deletedAt', type: 'timestamptz', isNullable: true },
      { name: 'name', type: 'varchar' },
      { name: 'email', type: 'varchar', isUnique: true },
      { name: 'hash', type: 'varchar' },
      { name: 'salt', type: 'varchar' },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
