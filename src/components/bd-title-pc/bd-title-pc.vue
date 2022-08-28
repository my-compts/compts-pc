<template>
  <div>
    <div
      class="bd-title-pc"
      @click="operWindos(titleURL);"
      :style="{
        'font-size': textSize,
        'color': fontColor,
        'font-weight':fontWeight,
        'cursor':'pointer'
      }"
    >
      <span
        :class="titleIconCls"
        v-if="isShowfontIcon"
      />
      {{ titletext }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // iconCls: this.titleIconCls,
      // text: this.titletext,
      // url: this.titleURL,
      // textSize: this.fontSize + "px",
      // textColor: this.fontColor,
      // textWeight: this.fontWeight
    };
  },
  computed: {
    textSize() {
      var fs = this.fontSize + 'px';
      return fs;
    }
  },
  name: 'BdTitlePc',
  props: {
    titletext: {
      type: String,
      default: '未命名'
    },
    isShowfontIcon: {
      type: Boolean,
      default: true
    },
    titleIconCls: {
      type: String,
      default: 'icon-A10060_3square'
    },
    titleURL: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 16
    },
    fontWeight: {
      type: String,
      default: ''
    },
    fontColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    operWindos(url) {
      if (url !== '') window.open(url);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.bd-title-pc {
  display: inline-block;
  color: #333333;
}
</style>
