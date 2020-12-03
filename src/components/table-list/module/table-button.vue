<template>
  <table-list-item :item="item">
    <template slot-scope="{row}">
      <template v-for="(btnList,key) in operation">
        <!--        <el-button :key="key" type="text" @click="event=>onClick(btnList.name,row)">{{ typeof btnList.label === 'string' ? btnList.label : btnList.label[parseInt(row[item.content])] }}</el-button>-->
        <table-button-item :key="key" :btn="btnList" :row="row" :content="item.content" @click="onClick"/>
      </template>
      <template v-if="operation_.length">
        <el-dropdown>
          <span>更多<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(btnList,key) in operation_" :key="key">
              <table-button-item :key="key" :btn="btnList" :row="row" :content="item.content" @click="onClick"/>
              <!--              <el-button :key="key" type="text" @click="onClick(btnList.name,row)">{{ typeof btnList.label === 'string' ? btnList.label : btnList.label[parseInt(row[item.content])] }}</el-button>-->
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </template>
  </table-list-item>
</template>

<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Watch, Prop, Vue} from "vue-property-decorator";
import {TableHead, DefaultObj} from "@/components/table-list/interface";
import TableButtonItem from "@/components/table-list/module/table-button-item.vue";

@Component({components: {TableButtonItem, TableListItem}})
export default class TableButton extends Vue {
  @Prop() item?: TableHead;
  operation: DefaultObj[] = [];
  operation_: DefaultObj[] = [];

  @Watch('item') getItem() {
    this.setButtonList()
  }

  /** 映射 - 点击事件
   * @param name
   * @param row
   * @param event
   */
  onClick(name: string, row: DefaultObj, event: Event) {
    this.$emit('click', name, row, event)
  }

  getButtonList(name: string) {
    const buttonList = {
      'view': {name: 'view', label: '查看'},
      'save': {name: 'save', label: '修改'},
      'delete': {name: 'delete', label: '删除'},
      'state': {name: 'state', label: ['启用', '停用']},
    }
    if (Object.hasOwnProperty.call(buttonList, name)) {
      return buttonList[name]
    }
  }

  emptyButtonList() {
    this.operation = []
    this.operation_ = []
  }

  setButtonList() {
    this.emptyButtonList()
    if (this.item.operation) {
      const isInt = this.item.operation.length > 4 ? 3 : 4;
      this.item.operation.forEach((item, key) => {
        this[key < isInt ? 'operation' : 'operation_'].push(typeof item === "string" ? this.getButtonList(item) : item)
      })
    }
  }

  mounted() {
    this.setButtonList()
  }
}
</script>