import { useApiData } from "@/composables"
import { fetchClient } from "@/utils/openapi-fetch-client"
import { useQuery } from "@tanstack/vue-query"
import type { ApiGetData } from "@/types/type-utils"

export type HomeStatistics = ApiGetData<"/admin/dashboard/home-statistics">

export const useHomeStatistics = () => {
  return useQuery({
    queryKey: ["home-statistics"],
    queryFn: async () => {
      return useApiData(() =>
        fetchClient.GET("/admin/dashboard/home-statistics", {
          showMsg: false,
        }),
      )
    },
  })
}
