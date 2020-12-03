<template>
  <span @click="event=>onClick(item.name, event)">
    <template v-if="item.type==='text'">{{ item.label }}</template>
    <i v-else-if="item.type==='icon'" :class="item.label"></i>
  </span>
</template>
<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator'

@Component
export default class FormInputItemExpand extends Vue {
  @Prop() item?: { [key: string]: string }

  /** 回调 - 点击
   * @param name
   * @param event
   */
  onClick(name: string, event: Event) {
    if (name) {
      this.$emit('click', name, event)
    }
  }
}
</script>