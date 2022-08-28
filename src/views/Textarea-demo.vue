<template>
  <div style="padding-top:20px;margin-left:20px;width:200px;height:200px;">
    <bd-div
      type="bd-textarea-pc"
      :border-color="bdCorlor"
      :border-style="bdStyle"
      :border-width="borderWidth"
      :radius-on="true"
      :bg-color="bgColor"
      :text-align="textAlign"
      :text-decoration="textDecoration"
      :color="color"
      :font-size="fontSize"
      :border-radius="borderRadius"
      :font-weight="fontWeight"
      :font-family="fontFamily"
    />
    <button @click="change">
      按钮
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '福建移动大数据业务运营平台',
      bdCorlor: 'red',
      bdStyle: 'dashed',
      borderWidth: '5px',
      bgColor: '#cccccc',
      textAlign: 'left',
      textDecoration: 'unset',
      color: '#333',
      fontSize: '14px',
      borderRadius: '',
      fontWeight: '',
      fontFamily: ''
    };
  },
  methods: {
    change() {
      this.bdCorlor = 'green';
      this.bdStyle = 'solid';
      this.borderWidth = '1px';
      this.bgColor = '#f37777';
      this.textAlign = 'center';
      this.textDecoration = 'underline';
      this.color = 'blue';
      this.fontSize = '16px';
      this.borderRadius = '15px';
      this.fontWeight = 'bold';
      this.fontFamily = 'monospace';
    }
  }
};
</script>

<style lang="scss">
</style>
