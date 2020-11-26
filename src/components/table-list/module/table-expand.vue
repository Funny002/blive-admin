<template>
  <table-list-item :item="item">
    <template slot-scope="{row,$index}">
      <slot name="expand" :row="row" :item="item" :$index="$index"></slot>
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
export default class TableExpand extends Vue {
  @Prop() item?: TableHead;
}
</script>
