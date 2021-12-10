import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth', 'Auth/Main.store')
Route.get('/auth', 'Auth/Main.show').middleware('auth')
Route.delete('/auth', 'Auth/Main.destroy').middleware('auth')
