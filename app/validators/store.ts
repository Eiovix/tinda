import vine from '@vinejs/vine'

export const createStoreValidator = vine.compile(
  vine.object({
    store_name: vine.string().maxLength(30).alphaNumeric().minLength(3),
    store_phone: vine.string().maxLength(15),
    store_email: vine.string(),
  })
)
