<template>
  <div class="container" style="overflow-y: scroll">
    <div class="l-card">
      <div class="l-row" style="align-items: center">
        <div class="title">{{ tableName }}</div>
        <el-button type="primary" :icon="Plus()" style="margin: 0 10px 0 auto">新增数据</el-button>
      </div>
      <div class="l-row l-center">
        <el-input
            v-model="input2"
            class="w-50 m-2"
            placeholder="检索数据"
            :prefix-icon="Search()"
            style="width: 95%;margin-bottom: 10px;"
        />
      </div>
      <div class="l-row l-center">
        <div class="collapse-box" style="margin-bottom: 10px">
          <el-collapse v-model="activeNames" @change="handleChange" style="width: 100%;">
            <el-collapse-item v-for="(item,index) in tableData" :key="index" :name="item.id">
              <template #title>
                <div class="table-head">{{ item.name }}</div>
              </template>
              <div class="table-content-box">
                <div class="table-content">
                  型号：{{ item.model }}
                </div>
                <div class="table-content">
                  批次：{{ item.batch }}
                </div>
                <div class="table-content">
                  价格：{{ item.priceUnit }}{{ item.price }}
                </div>
                <div class="table-content">
                  库存：{{ item.inventory }} ({{ item.inventoryUnit }})
                </div>
              </div>
              <div class="l-row" style="margin: 10px 0 0 10px;">
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
              </div>
            </el-collapse-item>

          </el-collapse>
        </div>
      </div>

    </div>

  </div>

</template>

<script lang="ts">

import {ElIcon, ElDialog, ElButton, ElSelect, ElOption, ElCollapse, ElCollapseItem, ElInput} from 'element-plus'
import {Search, Trophy, Suitcase,Plus} from '@element-plus/icons-vue'
import {Options, Vue} from "vue-class-component";
import 'element-plus/es/components/collapse/style/css'
import 'element-plus/es/components/collapse-item/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/input/style/css'

@Options({
  data() {
    return {
      loadingInstance: "",
      activeNames: "",
      tableName: "产品信息",
      input2: "",
      tableData: [{
        name: "医疗器械保护支架",
        id: "100001",
        inventory: 100,
        price: "5,000",
        priceUnit: "￥",
        batch: "106521",
        model: "10006",
        inventoryUnit: "件"
      }, {
        name: "医用仪",
        id: "100002",
        inventory: 15,
        price: "3,500",
        priceUnit: "￥",
        batch: "106521",
        model: "10006",
        inventoryUnit: "件"
      }, {
        name: "绑带",
        id: "100003",
        inventory: 15,
        price: "3,500",
        priceUnit: "￥",
        batch: "106521",
        model: "10006",
        inventoryUnit: "件"
      }, {
        name: "创可贴",
        id: "100004",
        inventory: 15,
        price: "3,500",
        priceUnit: "￥",
        batch: "106521",
        model: "10006",
        inventoryUnit: "件"
      }]
    }
  },
  components: {
    ElDialog,
    ElButton,
    ElSelect,
    ElOption,
    ElIcon,
    Document,
    Search,
    Suitcase,
    ElCollapse,
    ElCollapseItem,
    ElInput,
    Plus,
  },
  mounted() {

  },
  methods: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    },
    handleChange(val: string[]) {
      console.log(val)
    }
  }
})
export default class TableData extends Vue {
}
</script>
<style scoped src="./../assets/css/TableData.css"></style>