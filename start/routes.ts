/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/v1/users_controller'

router.get('/', async () => {
  return {
    message: 'Tinda API v1',
  }
})

router
  .group(() => {
    router.get('/users', [UsersController, 'index'])
    router.post('/users', [UsersController, 'store'])
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id', [UsersController, 'update'])
  })
  .prefix('api/v1')
