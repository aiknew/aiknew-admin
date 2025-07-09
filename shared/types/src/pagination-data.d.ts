export interface IPaginationData<Data> {
  current: number

  pageSize: number

  total: number

  list: Data
}
