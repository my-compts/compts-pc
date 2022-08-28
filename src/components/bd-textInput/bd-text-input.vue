<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :size="size"
    label-position="top"
    @submit.native.prevent
  >
    <el-form-item
      :label="comptName"
      prop="comptValue"
    >
      <el-input
        v-model="form.comptValue"
        :placeholder="placeholder"
        :type="type"
        :rows="5"
        :maxlength="isValidMaxValue ? maxValue : Infinity"
        :minlength="isValidMinValue ? minValue : 0"
        :show-word-limit="isValidMaxValue"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import formMixins from '../mixins/formMixins';
export default {
  name: 'BdTextInput',
  mixins: [formMixins],
  data() {
    return {
    };
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
    fieldValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    // 是否校验最小文本长度
    isValidMinValue: {
      type: Boolean,
      default: false
    },
    // 是否校验最大文本长度
    isValidMaxValue: {
      type: Boolean,
      default: false
    },
    // 最小文本长度
    minValue: {
      type: Number,
      default: 0
    },
    // 最大文本长度
    maxValue: {
      type: Number,
      default: Infinity
    },
    size: {
      type: String
    }
  },
  methods: {
  },
  watch: {
    fieldValue(value) {
      this.form.comptValue = value;
    },
    'form.comptValue': {
      handler(value) {
        this.$emit('input', value);
      }
    },
    refreshKey: {
      handler() {
        this.$refs['form'].validate((valid) => {
          // callback(valid);
        });
      }
    }
  },
  computed: {
    // 如果区间改变要重新处理输入框的值
    refreshKey() {
      return `bd-number-${this.isRequired}-${this.isValidMinValue}-${this.minValue}-${this.isValidMaxValue}-${this.maxValue}`;
    },
    rules() {
      let rules = {};
      rules['comptValue'] = [
        { required: this.isRequired, message: `请输入${this.comptName}`, trigger: 'blur' }
      ];
      if (this.isValidMinValue || this.isValidMaxValue) {
        const min = this.isValidMinValue ? this.minValue : 0;
        const max = this.isValidMaxValue ? this.maxValue : Infinity;
        let message = '';
        if (this.isValidMinValue && this.isValidMaxValue) {
          message = `长度在 ${min} 到 ${max} 之间`;
        } else if (this.isValidMinValue) {
          message = `长度必须大于 ${min} `;
        } else {
          message = `长度必须小于 ${max} `;
        }
        let range = { min, max, message, trigger: 'blur' };
        rules['comptValue'].push(range);
      }
      return rules;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label{
  word-break: break-all;
}
</style>
