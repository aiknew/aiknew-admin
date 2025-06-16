import { ref } from 'vue'

export const usePagination = () => {
  const currentPage = ref(1)
  const pageSize = ref(10)

  return {
    currentPage,
    pageSize,
  }
}
