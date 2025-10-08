<script setup lang="ts">
import { AppContentBlock } from '@aiknew/shared-ui-components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'
import { useHomeStatistics } from '@/api/dashboard'
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
import type { ComposeOption } from 'echarts/core'
import { useI18n } from 'vue-i18n'

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const { t } = useI18n()
const { data } = useHomeStatistics()

const lineChartOption = computed<ComposeOption<LineSeriesOption>>(() => {
  const xAxisData =
    data.value?.times
      .map((item) => item.day)
      .slice(0)
      .reverse() ?? []
  const seriesData =
    data.value?.times
      .map((item) => item.count)
      .slice(0)
      .reverse() ?? []

  return {
    title: {
      text: t('homePage.loginsInLast30Days'),
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [t('homePage.loginCount')],
      top: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData
    },
    yAxis: {
      type: 'value',
      minInterval: 1
    },
    series: [
      {
        name: t('homePage.loginCount'),
        type: 'line',
        data: seriesData,
        smooth: true
      }
    ]
  }
})

const pieChartOption = computed<ComposeOption<PieSeriesOption>>(() => {
  const legendData = data.value?.nations.map((item) => item.nation) ?? []
  const seriesData =
    data.value?.nations.map((item) => {
      return {
        value: item.count,
        name: item.nation.trim().length === 0 ? 'unknown' : item.nation
      }
    }) ?? []

  return {
    title: {
      text: t('homePage.accessSource'),
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: legendData
    },
    series: [
      {
        name: t('homePage.loginCount'),
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: seriesData
      }
    ]
  }
})

const barChartOption = computed<ComposeOption<BarSeriesOption>>(() => {
  const xAxisData =
    data.value?.times
      .slice(0, 7)
      .map((item) => item.day)
      .slice(0)
      .reverse() ?? []
  const seriesData =
    data.value?.times
      .slice(0, 7)
      .map((item) => item.count)
      .slice()
      .reverse() ?? []

  return {
    title: {
      text: t('homePage.loginsInLast7Days'),
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      type: 'value',
      minInterval: 1
    },
    series: [
      {
        name: t('homePage.loginCount'),
        data: seriesData,
        type: 'bar'
      }
    ]
  }
})
</script>

<template>
  <div>
    <!-- About Project -->
    <div class="grid grid-cols-1 gap-4">
      <AppContentBlock>
        <div class="p-4">
          <div class="text-lg font-bold">{{ t('homePage.aboutProject') }}</div>
          <p class="mt-2">
            {{ t('homePage.aboutProjectDescription') }}
          </p>
        </div>
      </AppContentBlock>
    </div>

    <!-- Row 2: Two Charts -->
    <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AppContentBlock class="h-[400px]">
        <VChart :option="barChartOption" autoresize />
      </AppContentBlock>

      <AppContentBlock class="h-[400px]">
        <VChart :option="pieChartOption" autoresize />
      </AppContentBlock>
    </div>

    <!-- Row 3: Main Chart -->
    <div class="mt-4">
      <AppContentBlock class="h-[400px]">
        <VChart :option="lineChartOption" autoresize />
      </AppContentBlock>
    </div>
  </div>
</template>
