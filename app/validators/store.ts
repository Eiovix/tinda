import vine from '@vinejs/vine'

export const createStoreValidator = vine.compile(
  vine.object({
    store_name: vine
      .string()
      .maxLength(50)
      .minLength(3)
      .unique(async (db, value) => {
        const store = await db.from('stores').where('store_name', value).first()
        return !store
      }),

    store_slug: vine
      .string()
      .minLength(3)
      .maxLength(30)
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const store = await db.from('stores').where('store_slug', value).first()
        return !store
      }),
    store_phone: vine.string().regex(/^(09|\+639)\d{9}$/),
    store_email: vine.string().email(),
    store_logo: vine.number(),
    store_banner: vine.number(),
    uuid: vine.string().optional(),
  })
)
