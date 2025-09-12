import type { MaybeRef } from 'vue'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type ShallowMaybeRef<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

export type UnwrapMaybeRefOrGetter<T> = T extends () => infer R
  ? R
  : T extends { value: infer R }
  ? R
  : T

export type TreeList<T, D = T & { disabled?: boolean, children?: D[] }> = D[]

export type GetData<Paths, P extends keyof Paths> = Paths extends {
  [k: string]: any
}
  ? Paths[P] extends {
    get: {
      responses: {
        200: {
          content: {
            'application/json': {
              data: infer D
            }
          }
        }
      }
    }
  }
  ? D
  : never
  : never

export type GetQuery<Paths, P extends keyof Paths> = Paths extends {
  [k: string]: any
}
  ? Paths[P] extends {
    get: {
      parameters: {
        query?: infer Q
      }
    }
  }
  ? Q
  : never
  : never

export type PostReqBody<Paths, P extends keyof Paths> = Paths extends {
  [k: string]: any
}
  ? Paths[P] extends {
    post: {
      requestBody: {
        content: {
          'application/json': infer B
        }
      }
    }
  }
  ? B
  : never
  : never

export type PutReqBody<Paths, P extends keyof Paths> = Paths extends {
  [k: string]: any
}
  ? Paths[P] extends {
    put: {
      requestBody: {
        content: {
          'application/json': infer B
        }
      }
    }
  }
  ? B
  : never
  : never

export type PostResBody<Paths, P extends keyof Paths> = Paths extends {
  [k: string]: any
}
  ? Paths[P] extends {
    post: {
      responses: {
        201: {
          content: {
            'application/json': infer B
          }
        }
      }
    }
  }
  ? B
  : never
  : never

export type PatchReqBody<Paths, P extends keyof Paths> = Paths extends {
  [k: string]: any
}
  ? Paths[P] extends {
    patch: {
      requestBody: {
        content: {
          'application/json': infer B
        }
      }
    }
  }
  ? B
  : never
  : never
