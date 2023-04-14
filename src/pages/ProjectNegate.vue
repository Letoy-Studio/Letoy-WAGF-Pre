<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          談判中的項目
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px)">
        <t-input style="margin-left: auto;margin-right: 10px;width: 200px;" placeholder="搜索項目名稱/機會號">
          <template #prefix-icon>
            <search-icon/>
          </template>
        </t-input>
        <t-button theme="primary">
          搜索項目
        </t-button>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <el-table :data="tableData" stripe border>
          <el-table-column prop="opportuneContractNumber" label="機會合同編號" width="250" align="center"/>
          <el-table-column prop="name" label="項目名稱" width="400" align="center"/>
          <el-table-column prop="settlementCurrent" label="結算貨幣" width="100" align="center"/>
          <el-table-column prop="projectFound" label="項目資金" width="100" align="center"/>

          <el-table-column prop="responsePersonName" label="負責人" width="150" align="center"/>
          <el-table-column prop="startDate" label="創建日期" width="250" align="center"/>
          <el-table-column prop="status" label="項目狀態" width="200" align="center">
            <template #default="scope">
              <t-tag theme="warning" v-if="scope.row.status === 1">進行中</t-tag>
              <t-tag theme="success" v-if="scope.row.status === 2">已完成</t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="操作" align="center">
            <template #default="scope">
              <t-button theme="primary" style="margin: 0 10px;" @click="$router.push('ProjectNegateCheck')">查看項目</t-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
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
          projectFound:"300,000.00"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 2,
          responsePersonName: "段鹏",
          status: 2,
          progress: 100,
          startDate: "2023-02-23",
          settlementCurrent: "人民幣",
          projectFound:"300,000.00"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 3,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23",
          settlementCurrent: "美元",
          projectFound:"300,000.00"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 4,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23",
          settlementCurrent: "人民幣",
          projectFound:"300,000.00"
        },
      ],
    }
  },

  mounted() {
  },
  methods: {},
  computed: {}
})
export default class SetProjectManage extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>