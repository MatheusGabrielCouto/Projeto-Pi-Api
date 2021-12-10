import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.all()

    return products
  }

  public async store({ request }: HttpContextContract) {
    const { title, description, price } = request.all()

    const product = await Product.create({ title, description, price })

    return product
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)

    await product.load('image')

    return product
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)

    const { title, description, price } = request.all()

    product.merge({ title, description, price })

    await product.save()

    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
  }
}
