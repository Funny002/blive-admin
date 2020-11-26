<template>
  <table-list-item :item="getItem">
    <template slot-scope="{row}">
      <el-radio class="tableList-radio" v-model="value" :label="row[item.content]" @change="radioChange"/>
    </template>
  </table-list-item>
</template>


<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead} from "@/components/table-list/interface";

@Component({
  components: {TableListItem}
})
export default class TableRadio extends Vue {
  @Prop() item?: TableHead;
  @Prop() value?: TableHead;

  get getItem() {
    return Object.assign({}, this.item, {align: 'center', headerAlign: 'center'} as TableHead)
  }

  radioChange(value: never) {
    this.$emit('change', value)
  }
}
</script>
