import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator)

    const token = await auth.attempt(email, password, {
      expiresIn: '30 days'
    })

    return token
  }
  public async show({ auth }: HttpContextContract) {
    return await auth.use('api').check()
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
