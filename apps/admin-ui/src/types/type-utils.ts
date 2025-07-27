import type { GetData, PatchReqBody, PostReqBody } from '@aiknew/shared-ui-types'
import type { paths } from './open-api'

export type ApiGetData<P extends keyof paths> = GetData<paths, P>

export type ApiPostReqBody<P extends keyof paths> = PostReqBody<paths, P>

export type ApiPatchReqBody<P extends keyof paths> = PatchReqBody<paths, P>
