<template>
  <div class="">
    <table-list :data="tableList.data" :table-head="tableList.thead">

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
import {Component, Vue} from 'vue-property-decorator'
import TableList from "@/components/table-list/table-list.vue";

@Component({
  components: {TableList}
})
export default class SettingWeb extends Vue {
  page = {currPage: 1, total: 0};
  tableList = {
    data: [],
    thead: []
  }
}
</script>