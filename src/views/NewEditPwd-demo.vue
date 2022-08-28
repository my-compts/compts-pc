<template>
  <div>
    <bd-div
      type="bd-newEditPwd-pc"
      :visible.sync="visible"
      :close-on-modal="closeOnModal"
      @submitClick="submitUserForm"
      @cancelClick="cancelDialog"
    />
    <el-button @click="clickFunc">
      密码修改
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      closeOnModal: false
    };
  },
  methods: {
    clickFunc() {
      this.visible = true;
    },
    submitUserForm() {
      this.$message.success('在这里增加事件处理');
    },
    cancelDialog() {
      this.$message.success('关闭弹窗');
    }
  }
};
</script>

<style lang="scss"></style>
