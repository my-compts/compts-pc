<template>
  <div>
    <bd-div
      type="bd-newModifyUser-pc"
      :visible.sync="visible"
      :close-on-modal="closeOnModal"
      @submitClick="submitUserForm"
      @cancelClick="cancelDialog"
    />
    <el-button @click="clickFunc">
      用户信息修改
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
      this.$message.success('提交成功');
    },
    cancelDialog() {
      this.$message.success('关闭弹窗');
      this.visible = false;
    }
  }
};
</script>

<style lang="scss"></style>
