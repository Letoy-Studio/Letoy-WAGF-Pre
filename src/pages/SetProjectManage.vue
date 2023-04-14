<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          立項管理
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px)">
        <t-button theme="primary" @click="createNewProjectDialogVisible = true">
          <template #icon>
            <add-icon/>
          </template>
          新增項目
        </t-button>
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
          <el-table-column prop="name" label="項目名稱" align="center"/>
          <el-table-column prop="status" label="項目狀態" width="200" align="center">
            <template #default="scope">
              <t-tag theme="warning" v-if="scope.row.status === 1">進行中</t-tag>
              <t-tag theme="success" v-if="scope.row.status === 2">已完成</t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="responsePersonName" label="負責人" width="200" align="center"/>
          <el-table-column prop="startDate" label="創建日期" width="250" align="center"/>
          <el-table-column prop="progress" label="操作" align="center" width="400">
            <template #default="scope">
              <t-button theme="primary" style="margin: 0 10px;" @click="$router.push('ProjectDetails')">查看項目</t-button>
              <t-button theme="danger" style="margin: 0 10px;">提交審核</t-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>


  <t-dialog
      width="80%"
      placement="center"
      header="新建項目"
      :visible="createNewProjectDialogVisible"
      :cancel-btn="null"
      :confirm-btn="null"
      :on-close="()=>{createNewProjectDialogVisible = false}"
  >

    <template #footer></template>

    <div class="l-container">
      <table class="form-table">
        <tr>
          <td class="table-label-td">
            <div class="table-row">
              <div class="red-spot">*</div>
              項目名稱：
            </div>
          </td>
          <td class="table-content-td">
            <t-input placeholder="請輸入項目名稱..."></t-input>
          </td>

          <td>
            <div class="table-row">
              機會合同編號：
            </div>
          </td>
          <td>
            <t-input placeholder="提交後自動生成" disabled></t-input>
          </td>

          <td>
            <div class="table-row">
              <div class="red-spot">*</div>
              項目類別：
            </div>
          </td>
          <td>
            <t-select placeholder="請選擇類目...">
              <t-option v-for="(item,index) in projectCategoryMap" :key="index" :label="item" :value="index"/>
            </t-select>
          </td>
        </tr>

        <tr>
          <td>
            <div class="table-row">
              <div class="red-spot">*</div>
              供應商類型：
            </div>
          </td>
          <td>
            <t-select placeholder="請選擇供應商...">
              <t-option v-for="(item,index) in supplierTypeMap" :key="index" :label="item" :value="index"/>
            </t-select>
          </td>

          <td>
            <div class="table-row">
              <div class="red-spot">*</div>
              聯繫人：
            </div>
          </td>
          <td>
            <t-input placeholder="请输入聯繫人..."></t-input>
          </td>

          <td>
            <div class="table-row">
              <div class="red-spot">*</div>
              聯繫方式：
            </div>
          </td>
          <td>
            <t-input placeholder="請填寫電話/座機..."></t-input>
          </td>
        </tr>


        <tr style="height: 10px"></tr>


        <tr>
          <td>
            <div class="table-row">
              <div class="red-spot">*</div>
              項目所在地：
            </div>
          </td>
          <td colspan="6">
            <div class="l-row">
              <t-select placeholder="請選擇類目..." v-model="provinceCode" style="margin: 0 5px 0 0;width: 150px">
                <t-option v-for="(item,index) in provinceMap" :key="index" :label="item" :value="index"/>
              </t-select>
              <t-select placeholder="請選擇類目..." v-model="cityCode" style="margin: 0 5px;width: 150px">
                <t-option v-for="(item,index) in cityMap[provinceCode]" :key="index" :label="item" :value="index"/>
              </t-select>
              <t-select placeholder="請選擇類目..." v-model="districtCode" style="margin: 0 5px;width: 150px">
                <t-option v-for="(item,index) in districtMap[provinceCode+'-'+cityCode]" :key="index" :label="item"
                          :value="index"/>
              </t-select>
            </div>
          </td>
        </tr>

        <tr>
          <td style="height: 100%;display:flex;align-items: flex-start">
            <div class="table-row">
              <div class="red-spot">*</div>
              項目簡介：
            </div>
          </td>
          <td colspan="5">
            <t-textarea
                style="width: 490px"
                placeholder="請輸入項目簡介..."
                name="description"
                :autosize="{ minRows: 3 }"
            />
          </td>
        </tr>

        <tr>
          <td class="table-label-td">
            <div class="table-row">
              所屬部門：
            </div>
          </td>
          <td class="table-content-td">
            <t-select placeholder="請選擇類目...">
              <t-option v-for="(item,index) in projectCategoryMap" :key="index" :label="item" :value="index"/>
            </t-select>
          </td>

          <td>
            <div class="table-row">
              負責人：
            </div>
          </td>
          <td>
            <t-select placeholder="請選擇類目...">
              <t-option v-for="(item,index) in projectCategoryMap" :key="index" :label="item" :value="index"/>
            </t-select>
          </td>
        </tr>

        <tr>
          <td class="table-label-td">
            <div class="table-row">
              項目金額：
            </div>
          </td>
          <td class="table-content-td">
            <t-input placeholder="请输入数值，含两位小数" suffix="万元">
            </t-input>
          </td>

          <td>
            <div class="table-row">
              <div class="red-spot">*</div>
              結算方式：
            </div>
          </td>
          <td colspan="3" style="text-align: left">
            <t-checkbox style="margin: 0 5px">信用證（L/C）</t-checkbox>
            <t-checkbox style="margin: 0 5px">賒銷（O/A 或 後T/T）</t-checkbox>
            <t-checkbox style="margin: 0 5px">付款交單（D/P 或 中T/T）</t-checkbox>
            <t-checkbox style="margin: 0 5px">承兌交單（D/A）</t-checkbox>
            <t-checkbox style="margin: 0 5px">預付款（前T/T）</t-checkbox>
          </td>

        </tr>

        <tr>
          <td class="table-label-td">
            <div class="table-row">
              成本預估：
            </div>
          </td>
          <td class="table-content-td">
            <t-input placeholder="请输入数值，含两位小数" suffix="万元">
            </t-input>
          </td>
          <td class="table-label-td">
            <div class="table-row">
              收益預估：
            </div>
          </td>
          <td class="table-content-td">
            <t-input placeholder="请输入数值，含两位小数" suffix="万元">
            </t-input>
          </td>
        </tr>

        <tr>
          <td class="table-label-td">
            <div class="table-row">
              結算方式：
            </div>
          </td>
          <td class="table-content-td">
            <t-select placeholder="請選擇...">
              <t-option v-for="(item,index) in projectCategoryMap" :key="index" :label="item" :value="index"/>
            </t-select>
          </td>
        </tr>

      </table>

      <div class="l-row l-center" style="margin-top: 40px;">
        <t-button theme="primary" type="submit" size="large" style="width: 200px;margin-right: 20px;">提交</t-button>
        <t-button theme="default" variant="base" type="reset"  style="width: 200px;margin-left: 20px;" @click="createNewProjectDialogVisible = false"
                  size="large">取消
        </t-button>
      </div>


    </div>
  </t-dialog>

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
      projectCategoryMap: {
        1: "金融服務採購",
        2: "工程",
        3: "物料採購",
        4: "技術服務",
      },
      supplierTypeMap: {
        1: "商業銀行",
        2: "保險公司",
        3: "證券公司",
        4: "財務公司",
        5: "第三方理財公司",
        6: "中外合資金融機構",
        7: "其他",
      },
      createForm: {},
      createNewProjectDialogVisible: false,
      projectTypeMap: {
        1: "招標",
        2: "競標",
        3: "報價"
      },
      tableData: [
        {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 1,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 2,
          responsePersonName: "段鹏",
          status: 2,
          progress: 100,
          startDate: "2023-02-23"
        }, {
          opportuneContractNumber: '00120220324123',
          name: 'G集团A出口业务结算金融服务采购项目',
          quotaSettlementMethod: 3,
          responsePersonName: "段鹏",
          status: 1,
          progress: 30,
          startDate: "2023-02-23"
        }, {
          opportuneContractNumber: '00120220324123',
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
      ],
      provinceMap: Object.freeze({
        1: "澳門",
        2: "廣東省",
      }),
      cityMap: Object.freeze({
        1: {
          1: "特別行政區"
        },
        2: {
          1: "深圳市",
          2: "广州市",
          3: "珠海市",
          4: "东莞市",
          5: "佛山市",
          6: "中山市",
          7: "惠州市",
          8: "汕头市",
          9: "江门市",
          10: "湛江市",
          12: "肇庆市",
          13: "梅州市",
          14: "茂名市",
          15: "阳江市",
          16: "清远市",
          17: "韶关市",
          18: "揭阳市",
          19: "汕尾市",
          20: "潮州市",
          21: "河源市",
          22: "云浮市",
        }
      }),
      districtMap: Object.freeze({
        "1-1": {
          101: "花地玛堂区",
          102: "圣安多尼堂区",
          103: "大堂区",
          104: "望德堂区",
          105: "圣老楞佐堂区",
          106: "嘉模堂区",
          107: "圣方济各堂区"
        },
        "2-1": {
          2101: "罗湖区",
          2102: "福田区",
          2103: "南山区",
          2104: "盐田区",
          2105: "宝安区",
          2106: "龙华区",
          2107: "龙岗区",
          2108: "坪山区",
          2109: "光明区",
          2110: "大鹏新区",
          2111: "深汕特别合作区",
        }, "2-2": {
          2201: "荔湾区",
          2202: "越秀区",
          2203: "海珠区",
          2204: "花都区",
          2205: "天河区",
          2206: "白云区",
          2207: "黄埔区",
          2208: "南沙区",
          2209: "增城区",
          2210: "从化区",
          2211: "番禺区",
        }, "2-3": {
          2301: "香洲区",
          2302: "斗門区",
          2303: "金灣区",
        },
      }),
      provinceCode: null,
      cityCode: null,
      districtCode: null
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