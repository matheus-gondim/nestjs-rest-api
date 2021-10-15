import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddInvoiceTable1634314634113 implements MigrationInterface {
  private readonly table = new Table({
    name: 'invoices',
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
      { name: 'path', type: 'varchar' },
      { name: 'userId', type: 'int' },
      { name: 'isPublic', type: 'bool' },
    ],
    foreignKeys: [
      {
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
