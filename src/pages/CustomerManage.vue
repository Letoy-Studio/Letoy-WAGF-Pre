<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          帐无忧用户信息
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px)">
        <t-button theme="success" @click="syncData" :loading="syncLoading">
          同步帐无忧数据
        </t-button>
        <t-input style="margin-left: auto;margin-right: 10px;width: 200px;" placeholder="搜索用户名">
          <template #prefix-icon>
            <search-icon/>
          </template>
        </t-input>
        <t-button theme="primary">
          搜索
        </t-button>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <el-table :data="tableData" stripe border max-height="700">
          <el-table-column prop="customerName" label="客户名称" width="300" align="center"/>

          <el-table-column prop="bussinessLicense" label="信用统一代码" width="180" align="center"/>
          <el-table-column prop="startPeriod" label="建账账期  " width="100" align="center"/>
          <el-table-column prop="representative" label="法人代表" width="100" align="center"/>
          <el-table-column prop="idCardNo" label="法人身份证" width="250" align="center"/>
          <el-table-column prop="mobile" label="联系人手机号" width="250" align="center"/>
          <el-table-column prop="isshuikongpan" label="是否绑定税控盘" width="200" align="center">
            <template #default="scope">
              {{ scope.row.isshuikongpan ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="taxRealAccount" label="个税实名帐号" width="250" align="center"/>
          <el-table-column prop="sbAccount" label="社保帐号" width="250" align="center"/>
          <el-table-column prop="sbPassword" label="社保密码" width="250" align="center"/>
          <el-table-column prop="providentAccount" label="公积金帐号" width="250" align="center"/>
          <el-table-column prop="providentPassword" label="公积金密码" width="250" align="center"/>
          <el-table-column prop="progress" label="操作" width="200" align="center">
            <template #default="scope">
              <t-button theme="primary" style="margin: 0 10px;" @click="$router.push('ProjectNegateCheck')">查看項目
              </t-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <t-pagination
          style="margin: 30px 0"
          v-model="currentPage"
          v-model:pageSize="pageSize"
          :total="totalPage"
          :totalContent="false"
          @current-change="getData"
          @page-size-change="getData"
      />
    </div>

  </div>

</template>

<script lang="ts">
import {ElTable, ElTableColumn} from "element-plus";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import {Options, Vue} from "vue-class-component";
import {AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon} from 'tdesign-icons-vue-next';
import MyRequest from "@/utils/LetoyService";
import {MessagePlugin} from "tdesign-vue-next";

@Options({
  components: {
    ElTable, ElTableColumn,
    AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon
  },
  data() {
    return {
      createForm: {},
      createNewProjectDialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      totalPage: 10,
      syncLoading:false
    }
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      MyRequest.authRequest(
          "/CustomerBaseInfo/GetAllCustomerBaseInfoWithPaginationPageData",
          {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }, {})
          .then((response: any) => {
            if (response.status === 0) {
              this.tableData = Object.freeze(response.data.data);
              this.totalPage = response.data.totalPage;
            }
          })
    },
    syncData(){
      this.syncLoading = true
      MyRequest.authRequest(
          "/ThirdPlatform/UpdateCustomerBaseInfo",
          {}, {})
          .then((response: any) => {
            if (response.status === 0) {
              MessagePlugin.success("同步成功！");
              this.getData();
              this.syncLoading = false
            }
          });
      setTimeout(()=>{
        if(this.syncLoading){
          this.syncLoading = false
          MessagePlugin.warning("网络异常，请稍后再试！")
        }
      },8000)
    }
  },
  computed: {}
})
export default class SetProjectManage extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>