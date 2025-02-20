import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    name: vine.string(),
    alternative_text: vine.string().nullable(),
    caption: vine.string().nullable(),
    width: vine.number(),
    height: vine.number(),
    formats: vine.object({}),
    hash: vine.string(),
    ext: vine.string(),
    mime: vine.string(),
    size: vine.number(),
    url: vine.string(),
    provider: vine.string(),
    provider_metadata: vine.object({}),
  })
)
