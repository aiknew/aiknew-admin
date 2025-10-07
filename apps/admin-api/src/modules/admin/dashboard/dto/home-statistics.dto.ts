class NationCount {
  nation: string
  count: number
}

class TimesCount {
  day: string
  count: string
}

export class HomeStatisticsDto {
  nations: NationCount[]

  times: TimesCount[]
}
