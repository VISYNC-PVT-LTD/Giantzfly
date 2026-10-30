import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, isSanityConfigured, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null

export const urlFor = (source: SanityImageSource) => {
  return builder?.image(source) ?? null
}
