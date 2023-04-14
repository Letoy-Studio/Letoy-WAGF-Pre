<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          系统用户管理
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px)">
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
          <el-table-column prop="username" label="用户名" width="200" align="center"/>
          <el-table-column prop="avatar" label="头像" width="80" align="center">
            <template #default="scope">
              <t-avatar shape="round" :image="scope.row.avatar"></t-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号" width="180" align="center"/>
          <el-table-column prop="active" label="账户状态" width="100" align="center">
            <template #default="scope">
              <t-tag v-if="scope.row.active" shape="round" theme="success" variant="light-outline">
                已激活
              </t-tag>
              <t-tag v-if="!scope.row.active" shape="round" theme="danger" variant="light-outline">
                未激活
              </t-tag>
            </template>
          </el-table-column>

          <el-table-column prop="role" label="权限" width="100" align="center">
            <template #default="scope">
              <t-tag v-if="scope.row.role===0" shape="round" theme="default" variant="light-outline">
                普通用户
              </t-tag>
              <t-tag v-if="scope.row.role===1" shape="round" theme="primary" variant="light-outline">
                管理员
              </t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="操作" align="center">
            <template #default="scope">
              <t-button theme="primary" style="margin: 0 10px;" >编辑用户</t-button>
              <t-button theme="success" style="margin: 0 10px;" >手动绑定公司</t-button>
              <t-button v-if="scope.row.customerBaseInfoList.length!==0" theme="warning" style="margin: 0 10px;" >取消绑定公司</t-button>
              <t-button theme="danger" style="margin: 0 10px;" >删除用户</t-button>
            </template>
          </el-table-column>
          <el-table-column prop="role" label="绑定的公司" align="center">
            <template #default="scope">
              <t-link style="margin: 0 10px" v-for="(item,index) in scope.row.customerBaseInfoList" :key="index" theme="primary">{{item.customerName}}</t-link>
              {{(scope.row.customerBaseInfoList.length===0) ? "暂未绑定公司":""}}
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

@Options({
  components: {
    ElTable, ElTableColumn,
    AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon
  },
  data() {
    return {
      createForm: {},
      roleMap:{
        0:"普通用户",
        1:"系统管理员"
      },
      createNewProjectDialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalPage:10,
    }
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      MyRequest.authRequest(
          "/CustomerBaseInfo/GetAllUserInfoCustomerBaseInfos",
          {}, {})
          .then((response: any) => {
            if (response.status === 0) {
              this.tableData = Object.freeze(response.data);
            }
          })
    }
  },
  computed: {}
})
export default class SetProjectManage extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>