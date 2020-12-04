<template>
  <div class="SettingMenu">
    <div style="display: flex; width: 100%; margin-bottom: 10px; height: 28px;">
      <form-list :form-list="formList" :form-value="formValue" :row-gutter="10" label-width="10px"/>
      <div style="display: flex; margin-left: 10px;">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="info" icon="el-icon-delete">清空</el-button>
        <el-button type="success" icon="el-icon-circle-plus">添加</el-button>
      </div>
    </div>

    <!--    <table-list :table-data="tableList.data" :table-head="tableList.head">-->
    <table-list :data="tableList.data" :table-head="tableList.head">
      <el-table-column slot="icon" slot-scope="{item}" :label="item.label" :prop="item.prop" :width="item.width" align="center" header-align="" :sortable="item.sortable">
        <template slot-scope="{row}">
          <el-icon :name="row['icon']"/>
        </template>
      </el-table-column>
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
import TableList from "@/components/table-list/table-list.vue";
// import TableList from "@/components/table-list/index.vue";
import {menuList} from "@/api/menu";
import FormList from "@/components/form-list/form-list.vue";
import {FormItem} from "@/components/form-list/interface";
import {TableHead} from "@/components/table-list/interface";

@Component({
  components: {FormList, TableList}
})
export default class SettingMenu extends Vue {
  page = {currPage: 1, total: 0};
  //
  formValue = {};
  formList: FormItem[] = [
    {span: 5, placeholder: "标题", type: 'text', name: "name"},
    {span: 8, placeholder: ['创建开始时间', '创建结束时间'], type: 'daterange', name: "create_time"},
    // {span: 8, placeholder: ['修改开始时间', '修改结束时间'], type: 'daterange', name: "update_time"},
    {span: 8, type: 'daterange', name: "update_time"},
    {span: 3, placeholder: "状态", type: 'select', name: "state", option: [{label: '启用', value: 1}, {label: '停用', value: 0}]},
  ];
  //
  tableList = {
    head: [
      {label: '序号', type: 'index'},
      // {label: '单选框', type: 'radio', width: '70px'},
      // {label: '序号', type: 'selection', width: '70px'},
      // {label: '主键', prop: 'id', content: 'id', width: '68px'},
      {label: '图标', prop: 'icon', slot: 'icon', content: 'icon', width: '68px'},
      {label: '标题', prop: 'name', content: 'name', sortable: 'custom', width: ''},
      {label: '路径', prop: 'path', content: 'path', sortable: 'custom', width: ''},
      {label: '创建时间', prop: 'create_time', content: 'create_time', sortable: 'custom', width: ''},
      {label: '修改时间', prop: 'update_time', content: 'update_time', sortable: 'custom', width: ''},
      {label: '权限', prop: 'authority', content: 'authority', sortable: 'custom', width: ''},
      {label: "状态", type: 'state', content: 'statusName', contentType: 'statusType', sortable: 'custom'},
      {label: "操作", type: 'button', content: 'state', operation: ['state', 'save', 'view', 'view']}
    ],
    data: []
  } as { head: TableHead[]; data: { [key: string]: string }[] };

  // TableListSave(row) {
  //   console.log(row)
  // }
  //
  // TableListRemove(row) {
  //   console.log(row)
  // }

  getTableList() {
    menuList('get', {
      success: ({data}) => {
        console.log(data)
        data.forEach((item: { [key: string]: any }) => {
          item.statusType = item.state ? 'success' : 'danger'
          item.statusName = item.state ? '启用' : '停用'
        })
        console.log(data);
        this.tableList.data = data
        // this.page = param
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
