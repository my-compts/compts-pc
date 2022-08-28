<template>
  <div>
    <bd-div
      type="bd-slide-code"
      :point-x="pointX"
      :point-y="pointY"
      @onSuccess="success"
      @refresh="refresh"
      @onFail="fail"
      @onClose="close"
      :show="slideShow"
    />
    <button @click="slideShow=true">
      打开
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointX: 150,
      pointY: 90,
      slideShow: false
    };
  },
  methods: {
    success() {
      console.log('success');
    },
    fail() {
      console.log('fail');
    },
    close() {
      console.log('close');
    },
    refresh() {
      console.log('refresh');
    }
  }
};
</script>

<style lang="scss"></style>
