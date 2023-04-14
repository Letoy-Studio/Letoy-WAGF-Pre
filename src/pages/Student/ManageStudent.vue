<template>
  <div class="container">
    <div class="l-card">
      <div class="l-row">
        <div class="card-title">
          查看學生信息
        </div>
      </div>
      <div class="card-l-row">
        <el-input
            v-model="studentName"
            style="width: 350px"
            placeholder="輸入學生姓名或學號..."
            :prefix-icon="Search"
        />
        <el-button type="primary" style="width: 110px; margin: 0 10px">搜索</el-button>
      </div>
      <div class="card-l-row">
        <el-select v-model="queryForm.grade" class="m-2" placeholder="Select">
          <el-option label="全部年級" :value="0"/>
          <el-option label="一年級" :value="1"/>
          <el-option label="二年級" :value="2"/>
          <el-option label="三年級" :value="3"/>
          <el-option label="五年級" :value="4"/>
        </el-select>
        <el-select v-model="queryForm.studentClass" class="m-2" placeholder="Select" style="margin: 0 10px">
          <el-option label="全部班級" :value="0"/>
          <el-option label="A班" :value="1"/>
          <el-option label="B班" :value="2"/>
          <el-option label="C班" :value="3"/>
        </el-select>
      </div>
      <div class="l-row">
        <el-table :data="tableData" style="width: calc( 100% - 40px );margin: 10px 20px" :border="true">
          <el-table-column label="學生姓名" width="100" align="center">
            <template #default="scope">
              <el-tag>{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="頭像" width="100" align="center">
            <template #default="scope">
              <img src="./../../assets/pics/avatar/avatar-demo.png" class="table-user-avatar" alt="">
            </template>
          </el-table-column>
          <el-table-column label="學號" prop="studentId" width="100" align="center" :sortable="true"></el-table-column>
          <el-table-column label="年級" prop="grade" width="100" align="center" :sortable="true">
            <template #default="scope">
              {{ gradeList[scope.row.grade] }}
            </template>
          </el-table-column>
          <el-table-column label="班級" prop="studentClass" width="100" align="center" :sortable="true">
            <template #default="scope">
              {{ studentClassList[scope.row.studentClass] }}
            </template>
          </el-table-column>
          <el-table-column label="當前平均成績" width="140" :sortable="true" :sort-by="'score'" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.score > 9">{{ scope.row.score }}</el-tag>
              <el-tag v-if="(scope.row.score >= 8)&&(scope.row.score < 9)" type="success">
                {{ scope.row.score }}
              </el-tag>
              <el-tag v-if="(scope.row.score >= 7)&&(scope.row.score < 8)" type="warning">
                {{ scope.row.score }}
              </el-tag>
              <el-tag v-if="(scope.row.score >= 6)&&(scope.row.score < 7)" type="danger">
                {{ scope.row.score }}
              </el-tag>
              <el-tag v-if="scope.row.score <6" type="success">{{ scope.row.score }}</el-tag>

            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" type="primary"
                         @click="editStudentDialogVisible=true"
              >编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>


  <t-dialog
      placement="center" header="修改學生信息"
      :visible="editStudentDialogVisible"
      :cancel-btn="null"
      :confirm-btn="null"
      :close-btn="false"
  >

    <template #footer></template>

    <div class="l-container">
      <div class="l-row l-center" style="margin: 0 0 20px 0 ">
        <t-upload
            ref="uploadRef1"
            v-model="studentAvatar"
            action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
            theme="image"
            accept="image/*"
            :locale="{
          triggerUploadText: {
            image: '请选择图片',
          },
        }"
        ></t-upload>
      </div>
      <table class="form-table">
        <tr>
          <td>學生姓名：</td>
          <td>
            <t-input v-model="editForm.name" placeholder="请输入内容"></t-input>
          </td>
        </tr>
        <tr>
          <td>學號：</td>
          <td>
            <t-input v-model="editForm.studentId" placeholder="请输入内容"></t-input>
          </td>
        </tr>
        <tr>
          <td>年級：</td>
          <td>
            <t-switch v-model="editForm.grade"></t-switch>
          </td>
        </tr>
        <tr>
          <td>性別：</td>
          <td>
            <t-radio-group v-model="editForm.gender">
              <t-radio value="1">男</t-radio>
              <t-radio value="2">女</t-radio>
            </t-radio-group>
          </td>
        </tr>
        <tr>
          <td>班級：</td>
          <td>
            <t-radio-group v-model="editForm.studentClass">
              <t-radio value="1">A班</t-radio>
              <t-radio value="2">B班</t-radio>
              <t-radio value="3">C班</t-radio>
            </t-radio-group>
          </td>
        </tr>
      </table>


      <t-space size="small">
        <t-button theme="primary" type="submit">保存</t-button>
        <t-button theme="default" variant="base" type="reset" @click="editStudentDialogVisible = false">取消</t-button>
      </t-space>


    </div>
  </t-dialog>

</template>

<script lang="ts">
import LetoyService from "@/utils/LetoyService";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import {
  ElMessage,
  ElTable,
  ElTableColumn,
  ElPopover,
  ElInput,
  ElTag,
  ElButton,
  ElSelect,
  ElOption,
  ElLoading
} from 'element-plus'
import {Options, Vue} from "vue-class-component";
import {Search} from "@element-plus/icons-vue";

@Options({
  computed: {
    Search() {
      return Search
    }
  },
  data() {
    return {
      studentAvatar: [{
        "raw": "",
        "lastModified": 1677955348445,
        "size": 937477,
        "type": "image/png",
        "percent": 100,
        "status": "success",
        "uploadTime": "2023-03-7",
        "url": require("@/assets/pics/avatar/student-avatar.jpg")
      }],
      editForm: {
        name: 'Marry',
        address: 'No. 189, Grove St, Los Angeles',
        score: 2.3,
        studentId: 405325666,
        grade: 3,
        studentClass: 1,
        gender: 0
      },
      queryForm: {
        grade: 0,
        studentClass: 0,
        gender: 0
      },
      studentClassList: {
        1: "A班",
        2: "B班",
        3: "C班"
      },
      gradeList: {
        1: "一年級",
        2: "二年級",
        3: "三年級"
      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'Jack',
          address: 'No. 189, Grove St, Los Angeles',
          score: 9.8,
          studentId: 405325667,
          grade: 1,
          studentClass: 3
        },
        {
          date: '2016-05-02',
          name: 'Marry',
          address: 'No. 189, Grove St, Los Angeles',
          score: 2.3,
          studentId: 405325666,
          grade: 3,
          studentClass: 1
        },
        {
          date: '2016-05-04',
          name: 'Din',
          address: 'No. 189, Grove St, Los Angeles',
          score: 4.5,
          studentId: 405325453,
          grade: 2,
          studentClass: 2
        },
        {
          date: '2016-05-01',
          name: 'Wng',
          address: 'No. 189, Grove St, Los Angeles',
          score: 6.7,
          studentId: 405325123,
          grade: 1,
          studentClass: 3
        }],
      studentName: "",
      editStudentDialogVisible: false
    }
  },
  components: {
    ElLoading,
    ElTable,
    ElTableColumn,
    ElPopover,
    ElButton,
    ElTag,
    ElInput,
    ElSelect,
    ElOption,
  },
  methods: {
    close1() {
      console.log("w")
    }
  },
})
export default class ManageStudent extends Vue {
}

</script>
<style scoped src="../../assets/css/ManageStudent.css"></style>