<template>
  <div class="l-container">
    <div class="l-card" style="position: relative;">
      <div class="l-row">
        <div class="home-card">
          <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
            <t-progress theme="circle" :label="'6/40'" :percentage="(6/40)*100"/>
          </t-space>
          <div class="l-col">
            <div class="progress-title" style="color: #c2c2c2;font-size: 20px;margin-top: 20px;">每日工作</div>
            <div class="progress-title">未完成量</div>
          </div>
        </div>

        <div class="home-card">
          <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
            <t-progress theme="circle" :label="'45%'" :status="'success'" :percentage="(45/100)*100"/>
          </t-space>
          <div class="l-col">
            <div class="progress-title" style="color: #c2c2c2;font-size: 20px;margin-top: 20px;">談判任務</div>
            <div class="progress-title">完成進度</div>
          </div>
        </div>

        <div class="home-card">
          <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
            <t-progress theme="circle" :label="'3 / 10'" :status="'warning'" :percentage="(30/100)*100"/>
          </t-space>
          <div class="l-col">
            <div class="progress-title" style="color: #c2c2c2;font-size: 20px;margin-top: 20px;">提示</div>
            <div class="progress-title">待處理事件</div>
          </div>
        </div>
      </div>

    </div>
    <div class="l-card" style="position: relative;">
      <div class="l-row" style="margin: 20px 0 10px 20px;">
        <div class="page-head">
          結算服務談判信息
        </div>
      </div>
      <div class="l-row" style="margin: 0 10px 20px 10px;width: calc( 100% - 20px)">
        <t-list style="max-height: 300px;height:300px;width:100%">
          <t-list-item v-for="(item,index) in listData" :key="index">
            <div class="l-row">
              <div class="list-item-date">{{ item.projectCreateDate.split(" ")[0] }}</div>
              <div class="list-item-time">{{ item.projectCreateDate.split(" ")[1] }}</div>
              <div class="list-item-username">{{ item.username }}</div>
              <div class="list-item-action-name">{{ item.actionName }}</div>
              <div class="list-item-project-name">{{ item.projectName }}</div>
              <div class="list-item-project-type">{{ projectTypeMap[item.projectType] }}</div>
              <!--              <div class="list-item-action-name" style="margin: 0"></div>-->
              <div class="list-item-link">查看相关情况</div>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          所有項目
        </div>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <el-table :data="tableData" stripe border style="width: fit-content;">
          <el-table-column prop="id" label="項目編號" width="170" align="center"/>
          <el-table-column prop="name" label="項目名稱" width="500" align="center"/>
          <el-table-column prop="quotaSettlementMethod" label="報價結算方式" width="130" align="center">
            <template #default="scope">
              <t-tag theme="danger" v-if="scope.row.quotaSettlementMethod === 1">L/C</t-tag>
              <t-tag theme="primary" v-if="scope.row.quotaSettlementMethod === 2">D/A</t-tag>
              <t-tag theme="danger" v-if="scope.row.quotaSettlementMethod === 3">D/P 或 中 T/T</t-tag>
              <t-tag theme="primary" v-if="scope.row.quotaSettlementMethod === 4">O/A 或 後 T/T</t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="responsePersonName" label="負責人" width="130" align="center"/>
          <el-table-column prop="status" label="項目狀態" width="150" align="center">
            <template #default="scope">
              <t-tag theme="warning" v-if="scope.row.status === 1">進行中</t-tag>
              <t-tag theme="success" v-if="scope.row.status === 2">已完成</t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="項目進度" width="200" align="center">
            <template #default="scope">
              <t-progress theme="plump" :status="'warning'" :percentage="scope.row.progress"/>
            </template>
          </el-table-column>
          <el-table-column prop="startDate" label="開始日期" width="130" align="center"/>
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
import * as echarts from 'echarts';

@Options({
  components: {ElTable, ElTableColumn},
  data() {
    return {
      projectTypeMap: {
        1: "招標",
        2: "競標",
        3: "報價"
      },
      tableData: [
        {
          id: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 1,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23"
        }, {
          id: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 2,
          responsePersonName: "段鹏",
          status: 2,
          progress: 100,
          startDate: "2023-02-23"
        }, {
          id: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 3,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23"
        }, {
          id: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 4,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23"
        },
      ],
      listData: [
        {
          projectId: "1000001",
          projectCreateDate: "2023-03-14 10:23:03",
          username: "中興科技",
          actionName: "參加",
          projectName: "G集团AA出口贸易业务结算金融服务招标信息",
          projectType: 2,
        }, {
          projectId: "1000002",
          projectCreateDate: "2023-03-15 10:23:03",
          username: "中國工銀",
          actionName: "修改",
          projectName: "G集团AA出口贸易业务招标信息",
          projectType: 3,
        }, {
          projectId: "1000002",
          projectCreateDate: "2023-03-15 10:23:03",
          username: "C機構",
          actionName: "修改",
          projectName: "G集团AA业务结算金融服务招标信息",
          projectType: 3,
        }, {
          projectId: "1000002",
          projectCreateDate: "2023-03-15 10:23:03",
          username: "澳門國際銀行",
          actionName: "修改",
          projectName: "G集团AA出口贸易业务结算金融服务招标信息",
          projectType: 3,
        }, {
          projectId: "1000002",
          projectCreateDate: "2023-03-15 10:23:03",
          username: "C機構",
          actionName: "修改",
          projectName: "G集团AA出口贸易业务结算金融服务招标信息",
          projectType: 3,
        }, {
          projectId: "1000002",
          projectCreateDate: "2023-03-15 10:23:03",
          username: "C機構",
          actionName: "修改",
          projectName: "G集团AA出口贸易业务结算金融服务招标信息",
          projectType: 3,
        }, {
          projectId: "1000002",
          projectCreateDate: "2023-03-15 10:23:03",
          username: "C機構",
          actionName: "修改",
          projectName: "G集团AA出口贸易业务结算金融服务招标信息",
          projectType: 3,
        },
      ]
    }
  },

  mounted() {
  },
  methods: {},
  computed: {}
})
export default class Home extends Vue {
}
</script>
<style scoped src="./../assets/css/Home.css"></style>