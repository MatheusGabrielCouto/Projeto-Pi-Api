import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

import Product from 'App/Models/Product'
import { UpdateValidator } from 'App/Validators/Products'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'

export default class ImageController {
  public async update({ params, request }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const { file } = await request.validate(UpdateValidator)
      const product = await (await Product.findOrFail(params.id)).useTransaction(trx)

      const searchPayload = {}
      const savePayload = {
        fileCategory: 'image' as any,
        fileName: `${new Date().getTime()}.${file.extname}`
      }

      const image = await product.related('image').firstOrCreate(searchPayload, savePayload)

      await file.move(Application.tmpPath('uploads'), {
        name: image.fileName,
        overwrite: true
      })

      return image
    })

    return response
  }

  public async destroy({ params }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const product = await (await Product.findOrFail(params.id)).useTransaction(trx)

      const image = await product
        .related('image')
        .query()
        .where({ fileCategory: 'image' })
        .firstOrFail()

      await image.delete()

      fs.unlinkSync(Application.tmpPath('uploads', image.fileName))
    })
  }
}
