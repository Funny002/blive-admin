<template>
  <div class="SettingMenu">

    <div style="display: flex; width: 100%; margin-bottom: 10px;">
      <form-list :form-list="formList" :form-value="formValue" :form-gutter="10"/>
      <div style="display: flex; margin-left: 10px;">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="info" icon="el-icon-delete">清空</el-button>
        <el-button type="success" icon="el-icon-circle-plus">添加</el-button>
      </div>
    </div>

    <table-list :table-data="tableList.data" :table-head="tableList.head">
      <template slot="icon" slot-scope="{row}">
        <el-icon :name="row['icon']"/>
      </template>
      <template slot="status" slot-scope="{row}">
        <el-tag :type="row['statusType']">{{ row['statusName'] }}</el-tag>
      </template>
      <template slot="button" slot-scope="{row}">
        <el-button v-if="row['status']" type="text" @click.stop="TableListSave(row)">停用</el-button>
        <el-button v-else type="text" @click.stop="TableListSave(row)">启用</el-button>
        <el-button type="text" @click.stop="TableListSave(row)">修改</el-button>
        <el-button type="text" @click.stop="TableListRemove(row)">删除</el-button>
      </template>
    </table-list>

    <el-pagination
        :page-size="20"
        :total="page.total"
        layout="total, prev, pager, next"
        :current-page.sync="page.currPage"
        style="text-align: left; margin-top: 10px;"
    />

  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TableList from "@/components/tableList/tableList.vue";
import {menuList} from "@/api/menu";
import FormList from "@/components/formList/formList.vue";

@Component({
  components: {FormList, TableList}
})
export default class SettingMenu extends Vue {
  page = {currPage: 1, total: 0};
  //
  formValue = {};
  formList = [
    {span: 5, placeholder: "标题", type: 'input', name: "user"},
    {span: 8, placeholder: "创建时间", type: 'dates', name: "user"},
    {span: 8, placeholder: "修改时间", type: 'dates', name: "user"},
    {span: 3, placeholder: "状态", type: 'select', name: "user", select: [{label: '启用', value: 1}, {label: '停用', value: 0}]},
  ];
  //
  tableList = {
    head: [
      {label: '主键', prop: 'id', content: 'id', width: '68px'},
      {label: '图标', prop: 'icon', slot: 'icon', content: 'icon', width: '68px'},
      {label: '标题', prop: 'name', content: 'name', sortable: 'custom', width: ''},
      {label: '路径', prop: 'path', content: 'path', sortable: 'custom', width: ''},
      {label: '创建时间', prop: 'create_time', content: 'create_time', sortable: 'custom', width: ''},
      {label: '修改时间', prop: 'update_time', content: 'update_time', sortable: 'custom', width: ''},
      {label: '状态', prop: 'status', slot: 'status', content: 'status', sortable: 'custom', width: '68px'},
      {label: '操作', width: '150px', slot: 'button'},
    ],
    data: []
  };

  TableListSave(row) {
    console.log(row)
  }

  TableListRemove(row) {
    console.log(row)
  }

  getTableList() {
    menuList('get', {
      success: ({data: {list, param}}) => {
        list.forEach(item => {
          item.statusType = item.status ? 'success' : 'danger'
          item.statusName = item.status ? '启用' : '停用'
        })
        this.tableList.data = list
        this.page = param
      }
    })
  }

  mounted() {
    this.getTableList()
  }
}
</script>
<style scoped lang="scss">
.SettingMenu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .form-list {
    width: 100%;
    height: 32px;

    /deep/
    .el-form-item__content {
      width: 100% !important;
    }
  }
}
</style>
