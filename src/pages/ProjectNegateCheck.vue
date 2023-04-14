<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          查看報價
        </div>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <div ref="mainChart" style="width: 100%;height: 500px"></div>
      </div>
      <div class="l-row l-center">
        <div class="l-row" style="margin: 0 20px 20px 20px;width: 1518px;flex-wrap: wrap;">
          <div ref="radar-1" style="width: 450px;height: 400px;margin:10px 25px" class="chart-box" @click="$router.push('ProjectDetails')"></div>
          <div ref="radar-2" style="width: 450px;height: 400px;margin:10px 25px" class="chart-box" @click="$router.push('ProjectDetails')"></div>
          <div ref="radar-3" style="width: 450px;height: 400px;margin:10px 25px" class="chart-box" @click="$router.push('ProjectDetails')"></div>
          <div ref="radar-4" style="width: 450px;height: 400px;margin:10px 25px" class="chart-box" @click="$router.push('ProjectDetails')"></div>
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import * as echarts from 'echarts';
import {ElTable, ElTableColumn} from "element-plus";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import {Options, Vue} from "vue-class-component";
import {AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon} from 'tdesign-icons-vue-next';


@Options({
  components: {
    ElTable, ElTableColumn,
    AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon
  },
  data() {
    return {
      createForm: {},
      createNewProjectDialogVisible: false,
      tableData: [
        {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 1,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23",
          settlementCurrent: "美元",
          projectFound: "300,000.00"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 2,
          responsePersonName: "段鹏",
          status: 2,
          progress: 100,
          startDate: "2023-02-23",
          settlementCurrent: "人民幣",
          projectFound: "300,000.00"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 3,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23",
          settlementCurrent: "美元",
          projectFound: "300,000.00"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 4,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23",
          settlementCurrent: "人民幣",
          projectFound: "300,000.00"
        },
      ],
    }
  },

  mounted() {
    this.initChart();
    this.initRadarChart();
  },
  methods: {
    initChart() {
      let app: any = {};
      type EChartsOption = echarts.EChartsOption;
      let chartDom = this.$refs.mainChart;
      let myChart = echarts.init(chartDom);
      let option: EChartsOption;
      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ] as const;
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {} as Record<string, string>)
        },
        distance: {
          min: 0,
          max: 100
        }
      };
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          const labelOption: BarLabelOption = {
            rotate: app.config.rotate as BarLabelOption['rotate'],
            align: app.config.align as BarLabelOption['align'],
            verticalAlign: app.config
                .verticalAlign as BarLabelOption['verticalAlign'],
            position: app.config.position as BarLabelOption['position'],
            distance: app.config.distance as BarLabelOption['distance']
          };
          myChart.setOption<echarts.EChartsOption>({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };
      type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

      const labelOption: BarLabelOption = {
        show: true,
        position: app.config.position as BarLabelOption['position'],
        distance: app.config.distance as BarLabelOption['distance'],
        align: app.config.align as BarLabelOption['align'],
        verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
        rotate: app.config.rotate as BarLabelOption['rotate'],
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['澳门中银', '中国工商银行（澳门）', '中国建设银行', '中国农业银行']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: [
              '外汇存款利率报价(%)',
              '外汇汇兑利率(%)',
              '手续费报价(%)',
              '金融机构结售汇价格(%)',
              '融资利率(%)',
              '管理费(%)',
              '贷款利率报价(%)',
              '收取定金比例(%)'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '澳门中银',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [5.1, 5.6, 11.5, 5.6, 5.6, 8.1, 5.6, 0.37]
          },
          {
            name: '中国工商银行（澳门）',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [5.0, 5.2, 10.5, 5.2, 5.1, 8.5, 6.6, 0.24]
          },
          {
            name: '中国建设银行',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [4.6, 5.6, 12.3, 5.6, 5.6, 8.1, 5.6, 0.37]
          },
          {
            name: '中国农业银行',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [5.5, 5.6, 12.7, 5.6, 5.6, 8.1, 5.6, 0.37]
          }
        ]
      };

      option && myChart.setOption(option);
    },
    initRadarChart() {
      let chartDom1 = this.$refs["radar-1"];
      let chartDom2 = this.$refs["radar-2"];
      let chartDom3 = this.$refs["radar-3"];
      let chartDom4 = this.$refs["radar-4"];
      let myChart1 = echarts.init(chartDom1);
      let myChart2 = echarts.init(chartDom2);
      let myChart3 = echarts.init(chartDom3);
      let myChart4 = echarts.init(chartDom4);
      let option = {
        title: {
          text: '澳門中銀報價'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {name: '外汇存款利率报价', max: 10},
            {name: '外汇汇兑利率', max: 10},
            {name: '手续费报价', max: 10},
            {name: '金融机构结售汇价格', max: 10},
            {name: '融资利率', max: 10},
            {name: '贷款利率报价', max: 10}
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [1, 2, 3, 4, 5, 6],
              },
            ]
          }
        ]
      };
      option && myChart1.setOption(option);
      option.title.text = "澳门中银";
      option && myChart2.setOption(option);
      option.title.text = "中国工商银行（澳门）";
      option && myChart3.setOption(option);
      option.title.text = "中国建设银行";
      option && myChart4.setOption(option);
      option.title.text = "中国农业银行";
    },

  },
  computed: {}
})
export default class SetProjectManage extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>