import type {
  GetData,
  GetQuery,
  PatchReqBody,
  PostReqBody,
  PostResBody,
  PutReqBody
} from '@aiknew/shared-ui-types'
import type { paths } from './open-api'

export type ApiGetData<P extends keyof paths> = GetData<paths, P>

export type ApiGetQuery<P extends keyof paths> = GetQuery<paths, P>

export type ApiPostReqBody<P extends keyof paths> = PostReqBody<paths, P>

export type ApiPutReqBody<P extends keyof paths> = PutReqBody<paths, P>

export type ApiPostResBody<P extends keyof paths> = PostResBody<paths, P>

export type ApiPatchReqBody<P extends keyof paths> = PatchReqBody<paths, P>
