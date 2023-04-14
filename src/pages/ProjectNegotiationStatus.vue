<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          談判中
        </div>
      </div>

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head" style="font-size: 18px;margin-left: 50px;">
          甲方：<strong style="color: #369EFD">強盛集團</strong>
        </div>

        <div class="page-head" style="font-size: 18px;margin-left: 40px;">
          乙方：格力有限公司
        </div>
      </div>

      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px);">
        <table class="base-table" style="margin-left: 50px;">
          <tr>
            <th rowspan="2">谈判轮次</th>
            <th rowspan="2">业务应收本金</th>
            <th colspan="7">报价（%）</th>
            <th colspan="4">收益测算</th>
            <th rowspan="2">談判結果</th>
          </tr>
          <tr>
            <th>外汇存款利率</th>
            <th>结售汇价格</th>
            <th>手续費</th>
            <th>管理費</th>
            <th>融资利率</th>
            <th>贷款利率</th>
            <th>外汇汇兑利率</th>
            <th>结汇本金</th>
            <th>预计成本</th>
            <th>预计收益</th>
            <th>利润</th>
          </tr>
          <tr>
            <td>1</td>
            <td>￥300,000.00（BRL）</td>
            <td>5.1</td>
            <td>0.58</td>
            <td>0.39</td>
            <td>0.081</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>$ 57,930.00</td>
            <td>$  58,491.92（USD）</td>
            <td>$  60,884.43（USD）</td>
            <td>$  2,392.51（USD）</td>
            <td>談判失敗</td>
          </tr>
          <tr>
            <td>2</td>
            <td>￥300,000.00（BRL）</td>
            <td>5.1</td>
            <td>0.58</td>
            <td>0.39</td>
            <td>0.081</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>$ 57,930.00</td>
            <td>$  58,491.92（USD）</td>
            <td>$  60,884.43（USD）</td>
            <td>$  2,392.51（USD）</td>
            <td>談判失敗</td>
          </tr>
          <tr>
            <td>2</td>
            <td>￥300,000.00（BRL）</td>
            <td>5.1</td>
            <td>0.58</td>
            <td>0.39</td>
            <td>0.081</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>$ 57,930.00</td>
            <td>$  58,491.92（USD）</td>
            <td>$  60,884.43（USD）</td>
            <td>$  2,392.51（USD）</td>
            <td style="color: #089b08">談判成功</td>
          </tr>
        </table>
      </div>


    </div>

  </div>

</template>

<script lang="ts">
import {ElTable, ElTableColumn} from "element-plus";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import {Options, Vue} from "vue-class-component";
import {AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon, RoundIcon} from 'tdesign-icons-vue-next';


@Options({
  components: {
    ElTable, ElTableColumn,
    AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon, RoundIcon
  },
  data() {
    return {
    }
  },

  mounted() {
  },
  methods: {},
  computed: {}
})
export default class ProjectNegotiationStatus extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>