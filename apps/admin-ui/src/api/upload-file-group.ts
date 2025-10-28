import { useApiData } from "@/composables"
import type {
  ApiGetData,
  ApiPatchReqBody,
  ApiPostReqBody,
} from "@/types/type-utils"
import { fetchClient } from "@/utils/openapi-fetch-client"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { ref } from "vue"

export type CreateUploadFileGroupDto =
  ApiPostReqBody<"/admin/upload-file-group">

export type UploadFileGroupDto =
  ApiGetData<"/admin/upload-file/filesAndGroups">["groupList"][number]

export type UpdateUploadFileGroupDto =
  ApiPatchReqBody<"/admin/upload-file-group/{id}">

export const useUploadFileGroupCreate = () => {
  return useMutation({
    mutationKey: ["create-upload-file-group"],
    mutationFn: (body: CreateUploadFileGroupDto) => {
      return useApiData(() =>
        fetchClient.POST("/admin/upload-file-group", {
          body,
        }),
      )
    },
  })
}

export const useUploadFileGroupUpdate = () => {
  return useMutation({
    mutationKey: ["update-upload-file"],
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: UpdateUploadFileGroupDto
    }) => {
      return useApiData(() =>
        fetchClient.PATCH("/admin/upload-file-group/{id}", {
          params: {
            path: {
              id,
            },
          },
          body,
        }),
      )
    },
  })
}

export const useUploadFileGroupDelete = () => {
  return useMutation({
    mutationKey: ["delete-upload-file-group"],
    mutationFn: (id: string) => {
      return useApiData(() =>
        fetchClient.DELETE("/admin/upload-file-group/{id}", {
          params: {
            path: {
              id,
            },
          },
        }),
      )
    },
  })
}

export const useUploadFileGroupChildren = () => {
  const id = ref<string>("")
  const query = useQuery({
    queryKey: ["upload-file-group-children", id],
    enabled: false,
    queryFn: () => {
      return useApiData(() =>
        fetchClient.GET("/admin/upload-file-group/{id}", {
          params: {
            path: {
              id: id.value,
            },
          },
          showMsg: false,
        }),
      )
    },
  })

  return {
    id,
    query,
  }
}
