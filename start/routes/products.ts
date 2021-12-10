import Route from '@ioc:Adonis/Core/Route'

Route.get('/products', 'Products/Main.index')
Route.get('/products/:id', 'Products/Main.show')
Route.post('/products', 'Products/Main.store').middleware('auth')
Route.put('/products/:id', 'Products/Main.update').middleware('auth')
Route.delete('/products/:id', 'Products/Main.destroy').middleware('auth')

Route.put('/products/:id/image', 'Products/Image.update').middleware('auth')
Route.delete('/products/:id/image', 'Products/Image.destroy').middleware('auth')
