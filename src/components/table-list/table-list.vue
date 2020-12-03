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
        @selection-change="selectionChange"
        :empty-text="`暂无${auth?'数据':'权限'}`"
    >
      <template v-for="(item,key) in tableHead">
        <slot v-if="item.slot" :name="item.slot" :item="item" :$index="key"/>
        <table-state v-else-if="item.type==='state'" :key="key" :item="item"/>
        <table-expand v-else-if="item.type==='expand'" :key="key" :item="item"/>
        <table-button v-else-if="item.type==='button'" :key="key" :item="item" @click="onClick"/>
        <table-selection v-else-if="item.type==='selection'" :key="key" :item="item" :selectable="selectable"/>
        <table-radio v-else-if="item.type==='radio'" :key="key" :item="item" :value="radioValue" @change="radioChange"/>
        <table-index v-else-if="item.type==='index'" :key="key" :item="item" :page-size="pageSize" :page-index="pageIndex"/>
        <table-text v-else :key="key" :item="item" @click="spanClick"/>
      </template>
    </el-table>
  </div>
</template>
<script lang="ts">
import {ElTable} from "element-ui/types/table";
import {Component, Prop, Vue} from "vue-property-decorator";
import {DefaultObj, Size, TableHead} from "@/components/table-list/interface";
//
import TableText from "./module/table-text.vue";
import TableIndex from "./module/table-index.vue";
import TableState from "./module/table-state.vue";
import TableRadio from "./module/table-radio.vue";
import TableListItem from "./table-list-item.vue";
import TableExpand from "./module/table-expand.vue";
import TableButton from "./module/table-button.vue";
import TableSelection from "./module/table-selection.vue";

const ShowHeader = () => ({
  color: '#909399',
  backgroundColor: '#ebeef5'
})
@Component({components: {TableText, TableButton, TableRadio, TableState, TableSelection, TableListItem, TableExpand, TableIndex}})
export default class TableList extends Vue {
  @Prop() data?: [];
  @Prop() rowClassName?: string;
  @Prop() tableHead?: TableHead[];
  @Prop({default: 'mini'}) size?: Size;
  @Prop({default: 300}) minHeight?: number;
  @Prop({default: true}) auth?: boolean;
  @Prop({default: true}) stripe?: boolean;
  @Prop({default: true}) showHeader?: boolean;
  @Prop({default: ShowHeader}) headStyle?: { [key: string]: string };
  //
  @Prop() radioValue?: never; // radio 专用
  @Prop() selectable?: Function; // selection 专用
  @Prop({default: 1}) pageSize?: number; // index 专用
  @Prop({default: 1}) pageIndex?: number; // index 专用


  /** 回调 - button 点击
   * @param name
   * @param row
   * @param event
   */
  onClick(name: string, row: DefaultObj, event: Event) {
    this.$emit(`${name}-click`, row.id, row, event)
  }

  /** 获取 dom
   */
  getDom() {
    if (!this.tableDom) {
      this.tableDom = this.$refs['TableList']
    }
    return this.tableDom
  }

  /** 文本点击
   * @param row
   */
  spanClick(row: DefaultObj) {
    this.$emit('span-view-click', row.id, row)
  }

  /** 回调 - radio 内容改变
   * @param value
   */
  radioChange(value: never) {
    console.log(value)
    this.$emit('radio-change', value)
  }

  /** 回调 - 多选框 内容改变
   * @param array
   */
  selectionChange(array: { [key: string]: string }[]) {
    this.$emit('selection-change', array);
  }

  /** 映射 - 表格多选框
   * @param array
   * @param is
   */
  toggleSelection(array: [], is: undefined | boolean = undefined) {
    if (Array.isArray(array)) {
      array.forEach((item: { [key: string]: never }) => (this.getDom() as ElTable).toggleRowSelection(item, is))
    } else {
      (this.getDom() as ElTable).clearSelection()
    }
  }

  /** 映射 - 清空排序
   */
  clearSort() {
    (this.getDom() as ElTable).doLayout()
  }

  /** 映射 - 重新布局
   */
  doLayout() {
    (this.getDom() as ElTable).doLayout()
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