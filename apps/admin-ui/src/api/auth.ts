import { useMutation, useQuery } from "@tanstack/vue-query"
import { useApiData } from "@/composables/use-api"
import { fetchClient } from "@/utils/openapi-fetch-client"
import type {
  ApiPatchReqBody,
  ApiPostReqBody,
  ApiPostResBody,
} from "@/types/type-utils"

export type LoginBody = ApiPostReqBody<"/admin/auth/login">

export type LoginSuccessData = ApiPostResBody<"/admin/auth/login">["data"]

export type UpdateUserInfo = ApiPatchReqBody<"/admin/auth/update">

export type UserInfo = LoginSuccessData["userInfo"]

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginBody) => {
      return useApiData(() =>
        fetchClient.POST("/admin/auth/login", {
          body,
        }),
      )
    },
  })
}

export const useLoginCaptcha = () => {
  return useQuery({
    queryKey: ["login-captcha"],
    queryFn: async () => {
      return await useApiData(() =>
        fetchClient.GET("/admin/auth/captcha", {
          showMsg: false,
        }),
      )
    },
  })
}

export const useUserInfoUpdate = () => {
  return useMutation({
    mutationKey: ["user-update"],
    mutationFn: async (body: UpdateUserInfo) => {
      return await useApiData(() =>
        fetchClient.PATCH("/admin/auth/update", {
          body,
        }),
      )
    },
  })
}
