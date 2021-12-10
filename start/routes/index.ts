import Route from '@ioc:Adonis/Core/Route'

import './auth'
import './products'
import './uploads'

Route.get('/', async () => {
  return { hello: 'world' }
})
