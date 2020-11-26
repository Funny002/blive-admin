<template>
  <div class="tableList" :style="{'min-height':minHeight+'px'}">
    <el-table
        border
        :height="1"
        :data="data"
        ref="TableList"
        :stripe="stripe"
        :size="size||'mini'"
        highlight-current-row
        :show-header="showHeader"
        :row-class-name="rowClassName"
        :header-cell-style="headStyle"
        :empty-text="`暂无${auth?'数据':'权限'}`"
        @selection-change="handleSelectionChange"
    >
      <template v-for="(item,key) in tableHead">
        <slot v-if="item.slot" :name="item.slot" :item="item" :$index="key"/>
        <table-state v-else-if="item.type==='state'" :key="key" :item="item"/>
        <table-expand v-else-if="item.type==='expand'" :key="key" :item="item"/>
        <!-- selection比较特殊 -->
        <table-selection v-else-if="item.type==='selection'" :key="key" :item="item"/>
        <table-button v-else-if="item.type==='button'" :key="key" :item="item" @btn-click="buttonClick"/>
        <table-radio v-else-if="item.type==='radio'" :key="key" :item="item" :value="radioValue" @change="radioChange"/>
        <table-index v-else-if="item.type==='index'" :key="key" :item="item" :page-size="pageSize" :page-index="pageIndex"/>
        <table-list-item v-else :key="key" :item="item">
          <template slot-scope="{row,$index}">
            <slot :name="item.content+'Slot'" :row="row" :$index="$index" :item="item">
              <span class="table-text" @click="spanClick(row)">{{ row[item.content] || '—' }}</span>
            </slot>
          </template>
        </table-list-item>
      </template>
    </el-table>
  </div>
</template>
<script lang="ts">
import {ElTable} from "element-ui/types/table";
import {Component, Prop, Vue} from "vue-property-decorator";
import {Size, TableDom, TableHead} from "@/components/table-list/interface";
//
import TableIndex from "@/components/table-list/module/table-index.vue";
import TableState from "@/components/table-list/module/table-state.vue";
import TableRadio from "@/components/table-list/module/table-radio.vue";
import TableListItem from "@/components/table-list/table-list-item.vue";
import TableExpand from "@/components/table-list/module/table-expand.vue";
import TableButton from "@/components/table-list/module/table-button.vue";
import TableSelection from "@/components/table-list/module/table-selection.vue";

const ShowHeader = () => ({
  color: '#909399',
  backgroundColor: '#ebeef5'
})
@Component({
  components: {TableButton, TableRadio, TableState, TableSelection, TableListItem, TableExpand, TableIndex}
})
export default class TableList extends Vue {
  @Prop() data?: [];
  @Prop() radioValue?: never;
  @Prop() rowClassName?: string;
  @Prop() tableHead?: TableHead[];
  @Prop({default: 'mini'}) size?: Size;
  @Prop({default: true}) auth?: boolean;
  @Prop({default: 1}) pageSize?: number;
  @Prop({default: 1}) pageIndex?: number;
  @Prop({default: true}) stripe?: boolean;
  @Prop({default: 300}) minHeight?: number;
  @Prop({default: true}) showHeader?: boolean;
  @Prop({default: ShowHeader}) headStyle?: { [key: string]: string };
  //
  tableDom: TableDom = null;

  // 获取dom
  getDom() {
    if (!this.tableDom) {
      this.tableDom = this.$refs['TableList']
    }
    return this.tableDom
  }

  // 回调
  buttonClick(name: string, row: { [key: string]: never }) {
    this.$emit(`${name}-click`, row.id, row)
  }

  // 回调
  spanClick(row: { [key: string]: never }) {
    this.$emit('view-click', row.id, row)
  }

  // 回调映射
  radioChange(value: never) {
    console.log(value)
    this.$emit('radio-change', value)
  }

  // 方法回调
  toggleSelection(array: []) {
    if (Array.isArray(array)) {
      array.forEach((item: { [key: string]: never }) => {
        (this.getDom() as ElTable).toggleRowSelection(item);
      })
    } else {
      (this.getDom() as ElTable).clearSelection()
    }
  }

  // 方法映射 - 清空排序
  clearSort() {
    (this.getDom() as ElTable).doLayout()
  }

  // 方法映射 - 重新布局
  doLayout() {
    (this.getDom() as ElTable).doLayout()
  }

  // 回调映射
  handleSelectionChange(array: { [key: string]: string }[]) {
    this.$emit('selection-change', array);
  }
}
</script>
<style scoped lang="scss">
.tableList {
  width: 100%;
  display: flex;
  flex-direction: column;

  /deep/
  &-radio .el-radio__label {
    display: none;
  }
}
</style>
