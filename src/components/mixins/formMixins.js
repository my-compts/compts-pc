export default {
  data() {
    return {
      form: {
        comptValue: this.fieldValue
      }
    };
  },
  watch: {
    fieldValue(value) {
      this.form.comptValue = value;
    },
    'form.comptValue': {
      handler(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    validate(callback) {
      this.$refs['form'].validate((valid) => {
        callback(valid);
      });
    }
  }
};
