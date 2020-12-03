<template>
  <table-list-item :item="getItem">
    <el-radio slot-scope="{row}" class="tableList-radio" v-model="value" :label="row[item.content]" @change="onChange"/>
  </table-list-item>
</template>

<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {defaultConfig, TableHead} from "@/components/table-list/interface";

@Component({components: {TableListItem}})
export default class TableRadio extends Vue {
  @Prop() item?: TableHead;
  @Prop({default: ''}) value?: TableHead;

  get getItem() {
    return Object.assign({}, defaultConfig, this.item)
  }

  /** 回调 - 内容改变
   * @param value
   */
  onChange(value: string | number) {
    this.$emit('change', value)
  }
}
</script>