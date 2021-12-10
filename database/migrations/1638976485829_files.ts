import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { filesCategories } from 'App/Utils'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('file_category', filesCategories).notNullable()
      table.integer('product_id').notNullable()
      table.string('file_name').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
