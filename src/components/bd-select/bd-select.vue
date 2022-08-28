<template>
  <el-form
    ref="form"
    :model="form"
    :size="size"
    label-position="top"
  >
    <el-form-item
      :label="comptName"
      prop="comptValue"
    >
      <el-checkbox-group
        v-if="displayType === 'list' && selectType === 'multiple'"
        v-model="form.comptValue"
      >
        <el-checkbox
          v-for="item in options"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
      <el-radio-group
        v-if="displayType === 'list' && selectType === 'single'"
        v-model="form.comptValue"
      >
        <el-radio
          v-for="item in options"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-select
        v-if="displayType === 'select'"
        v-model="form.comptValue"
        style="width: 100%;"
        :multiple="selectType === 'multiple'"
        collapse-tags
        :placeholder="placeholder"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import formMixins from '../mixins/formMixins';
export default {
  name: 'BdSelect',
  mixins: [formMixins],
  data() {
    return {};
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    comptName: {
      type: String,
      default: ''
    },
    fieldValue: [String, Array],
    displayType: {
      type: String,
      default: 'list'
    },
    selectType: {
      type: String,
      default: 'single'
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    size: {
      type: String
    }
  },
  methods: {
  },
  computed: {
    // rules() {
    //   let rules = {};
    //   rules['comptValue'] = [
    //     { required: this.isRequired, message: `请输入${this.comptName}`, trigger: 'blur' }
    //   ];
    //   if (this.isValidTextLength) {
    //     let range = { min: this.minLength, max: this.maxLength, message: `长度在 ${this.minLength} 到 ${this.maxLength} 之间`, trigger: 'blur' };
    //     rules['comptValue'].push(range);
    //   }
    //   return rules;
    // }
  }
};
</script>

<style lang="scss" scoped>
.el-radio-group {
  line-height: unset;
  ::v-deep .el-radio__label {
    // display: inline-block;
  }
  .el-radio {
    display: block;
    line-height: 30px;
  }
}
.el-checkbox-group {
  display: inline-block;
  .el-checkbox {
    display: block;
    line-height: 30px;
  }
}
/deep/ .el-form-item__label{
  word-break: break-all;
}
/deep/ .el-checkbox__label{
  white-space:normal;
  word-break: break-all;
  display: inline;
}
/deep/ .el-radio{
   word-break: break-all;
}
/deep/.el-radio__label{
  white-space:normal;
  word-break: break-all;
  display: inline;
}
</style>
