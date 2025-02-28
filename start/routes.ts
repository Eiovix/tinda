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
import UserProfilesController from '#controllers/v1/user_profiles_controller'
import { middleware } from './kernel.js'
import MediaController from '#controllers/v1/media_controller'
import StoresController from '#controllers/v1/stores_controller'

router.get('/', async () => {
  return {
    message: 'Tinda API v1',
  }
})

router
  .group(() => {
    router.get('/users', [UsersController, 'index'])
    router.post('/users', [UsersController, 'store'])
    router.post('/login', [UsersController, 'login']).as('auth.login')
    router.post('/logout', [UsersController, 'logout']).as('auth.logout').use(middleware.auth())
    router.get('/profile', [UsersController, 'profile']).as('auth.profile').use(middleware.auth())
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id', [UsersController, 'update'])
  })
  .prefix('api/v1')

router
  .group(() => {
    router.post('/stores', [StoresController, 'store'])
  })
  .use(middleware.auth())
  .prefix('api/v1')

router
  .group(() => {
    router.post('/media', [MediaController, 'store'])
  })
  .use(middleware.auth())
  .prefix('api/v1')

router
  .group(() => {
    router.post('/user/profiles', [UserProfilesController, 'store'])
  })
  .prefix('api/v1')
