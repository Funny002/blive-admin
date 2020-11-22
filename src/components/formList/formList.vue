<template>
  <el-row :class="['form-list']" :gutter="formGutter">
    <el-form ref="formList" :label-width="labelWidth" :model="formValue" :rules="rules" style="width: 100%;" :disabled="disabled" :status-icon="statusIcon" @validate="(...Callback)=>$emit('validate', Callback)">
      <el-col v-for="(item,key) in formList" :key="key" :span="item.span" style="min-height: 47px; display: block;">
        <slot v-if="item.slot" :name="item.slot" :data="item"/>
        <el-form-item v-else :label="item.label" :prop="item.prop" :rules="item.rules" :style="{'align-items':item.align||'flex-start'}">
          <el-alert v-if="item.tips" class="form-list-tips" :type="item.tips.type" :closable="false" :show-icon="item.tips.showIcon">{{ item.tips.value }}</el-alert>
          <div v-if="item.type === 'input'" style="display: flex; align-items: center; width: 100%;">
            <el-input v-model="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" type="text" :suffix-icon="item.suffixIcon" :prefix-icon="item.prefixIcon" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" :maxlength="`${item.max}`" :show-word-limit="item['showWord']" clearable>
              <span v-if="item.prepend" slot="prepend" v-html="item.prepend"/>
              <span v-if="item.append" slot="append" v-html="item.append"/>
            </el-input>
            <div style="margin-left: 10px; display: flex;" v-if="item['btnList']">
              <el-button v-for="(btnV,btnK) in item['btnList']" :key="btnK" :type="btnV.type" :plain="btnV.plain||false" :icon="btnV.icon" :disabled="btnV.disabled" @click="event => $emit(btnV['clickName'], event)">{{ btnV.value }}</el-button>
            </div>
          </div>
          <div v-else-if="item.type === 'file'" style="display: flex;">
            <el-button @click="selectFile(item)" style="margin-right: 10px;">选择文件</el-button>
            <template v-if="show">
              <span v-if="!formValue[item.name]">未选择文件</span>
              <div v-else style="display: flex; width: calc(100% - 90px);">
                <div style=" overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ formValue[item.name].name }}</div>
                <el-button style="margin-left: auto;" type="text" icon="el-icon-close" @click="fileRemove(item)"></el-button>
              </div>
            </template>
          </div>
          <el-input v-else-if="item.type === 'textarea'" v-model="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" type="textarea" :placeholder="item.placeholder" :maxlength="`${item.max}`" :readonly="item.readonly" :disabled="item.disabled" :show-word-limit="item['showWord']" clearable/>
          <el-input v-else-if="item.type === 'number'" v-model.number="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" :placeholder="item.placeholder" :maxlength="`${item.max}`" :readonly="item.readonly" :disabled="item.disabled" :show-word-limit="item['showWord']" clearable/>
          <el-input v-else-if="item.type === 'password'" v-model="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" type="password" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" show-password clearable/>
          <el-date-picker v-else-if="item.type === 'date'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="date" :placeholder="item.placeholder" value-format="yyyy-MM-dd" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-date-picker v-else-if="item.type === 'dates'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="daterange" range-separator="-" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder" value-format="yyyy-MM-dd" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-date-picker v-else-if="item.type === 'year'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="year" :placeholder="item.placeholder" value-format="yyyy" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-date-picker v-else-if="item.type === 'datetime'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="datetime" :placeholder="item.placeholder" value-format="yyyy-MM-dd HH:mm" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-radio-group class="form-list-radio" v-else-if="item.type === 'radio'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" :disabled="item.disabled" :border="item.border">
            <el-radio v-for="(v,k) in item['radio']" :key="k" :label="v.value">{{ v.label }}</el-radio>
          </el-radio-group>
          <el-select v-else-if="item.type === 'select'" v-model="formValue[item['upName']]" :value="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" clearable>
            <el-option v-for="(v,k) in item.select" :key="k" :label="v.label" :value="v.value" clearable/>
          </el-select>
          <el-select v-else-if="item.type === 'selectTree'" v-model="formValue[item['upName']]" :value="formValue[item.name]" popper-class="selectTree" @change="$emit('change',item.name,formValue[item.name])" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" clearable>
            <template v-for="(option,key) in item.select">
              <el-option :key="key" v-if="!option.children" :label="option.label" :value="option.id"/>
              <el-option-group :key="key" v-else>
                <el-option class="selectTree-title" :label="option.label" :value="option.id" :disabled="item['groupTitle']"/>
                <template v-for="item in option.children">
                  <el-option :key="item.id" :label="item.label" :value="item.id"/>
                </template>
              </el-option-group>
            </template>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: 'form-list',
  props: {
    rules: Object,
    disabled: Boolean,
    formValue: Object,
    labelWidth: String,
    formGutter: Number,
    statusIcon: Boolean,
    formList: [Array, Object]
  },
  data: function () {
    return {
      file: {},
      show: true
    }
  },
  methods: {
    Refresh() {
      this.show = false
      setTimeout(() => {
        this.show = true
      })
    },
    selectFile({name, accept, type}) {
      if (!this.file[name]) {
        this.file[name] = document.createElement('input')
        this.file[name].accept = accept
        this.file[name].type = type
        this.file[name].onchange = () => {
          this.formValue[name] = this.file[name].files[0]
          this.$emit('change', name, this.formValue[name])
          this.Refresh()
        }
      }
      this.file[name].click()
    },
    // 手动触发验证
    validate(func) {
      this.$refs.formList.validate(event => func(event))
    },
    fileRemoveAll() {
      this.file = {}
    },
    fileRemove(item) {
      this.file[item.name] = null
      this.formValue[item.name] = null
      this.Refresh()
      this.$emit('fileRemove', item)
    },
    // 清空验证
    clearValidate() {
      // 验证
      this.$refs.formList.clearValidate()
    }
  }
}
</script>
<style scoped lang="scss">
.form-list-radio {
  display: flex;
  flex-wrap: wrap;
  padding-top: 5.5px;

  /deep/
  .el-radio {
    margin-left: 10px;
    margin-bottom: 5.5px;
  }
}

.form-list-tips {
  padding: 0 16px;
  font-size: 12px;
  margin-bottom: 5px;

  /deep/
  > i {
    font-size: 12px !important;
  }
}

.form-list {
  text-align: left;

  /deep/
  .el-form-item {
    display: flex;
    //align-items: center;

    &__label {
      width: 140px;
      min-width: 140px;
    }

    &__content {
      width: calc(100% - 140px);

      > * {
        width: 100%;
        display: block;
      }

      > .el-date-editor {
        display: inline-flex;
      }
    }
  }
}
</style>
<style lang="scss">
.selectTree {
  &-title {
    padding-left: 20px !important;

    &.is-disabled {
      cursor: default;
      font-weight: 500;
      color: #000 !important;
    }
  }

  .el-select-group {
    .el-select-dropdown__item {
      padding-left: 40px;
    }

    &__title {
      color: #000;
      font-weight: 500;
    }

    &__wrap {
      padding-bottom: 0;

      &::after {
        display: none;
      }
    }
  }
}
</style>
