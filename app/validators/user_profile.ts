import vine from '@vinejs/vine'

export const CreateUserProfileValidator = vine.compile(
  vine.object({
    first_name: vine.string().trim().maxLength(100),
    middle_name: vine.string().trim().maxLength(100),
    last_name: vine.string().trim().maxLength(100),
    profile_picture: vine.array(
      vine.file({
        size: '5mb',
        extnames: ['jpeg', 'jpg', 'png'],
      })
    ),
    cover_photo: vine.array(
      vine.file({
        size: '5mb',
        extnames: ['jpeg', 'jpg', 'png'],
      })
    ),
    phone_number: vine.string().trim().maxLength(20),
  })
)
