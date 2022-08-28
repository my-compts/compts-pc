<template>
  <div style="width:100%;">
    <bd-div
      type="bd-kpiBlock-pc"
      :data="data1"
      :series="series1"
      @click="blockClick"
      @prevClick="prevClick"
      @nextClick="nextClick"
    />
    <br>
    <br>
    <bd-div
      type="bd-kpiBlock-pc"
      :data="data2"
      :lat-title-show="false"
      :metric-row-big="false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: {
        rows: [
          { 标题: '业务暂停', 当日: '20', 同比: '28', 环比: '43025' },
          { 标题: '已注销', 当日: '64181434352', 同比: '7150', 环比: '7.843' },
          { 标题: '欠费停机', 当日: '39600', 同比: '425', 环比: '5130156' },
          { 标题: '正常', 当日: '2.016', 同比: '2.192', 环比: '25.29' },
          { 标题: '预开通', 当日: '115', 同比: '123', 环比: '138014' },
          { 标题: '已注销', 当日: '64181434352', 同比: '7150', 环比: '7.843' },
          { 标题: '欠费停机', 当日: '39600', 同比: '425', 环比: '5130156' },
          { 标题: '正常', 当日: '2.016', 同比: '2.192', 环比: '25.29' },
          { 标题: '预开通', 当日: '115', 同比: '123', 环比: '138014' }
        ],
        columns: ['标题', '当日', '同比', '环比']
      },
      series1: [
        {
          name: '当日',
          riseNum: '500',
          dropNum: '100'
        },
        {
          name: '同比',
          riseNum: '1000',
          dropNum: '500'
        },
        {
          name: '环比',
          riseNum: '5000',
          dropNum: '110'
        }
      ],
      data2: {
        rows: [{ 标题: '业务暂停', 当日: 20, 同比: 28, 环比: 43025 }],
        columns: ['标题', '当日', '同比', '环比']
      }
    };
  },
  methods: {
    prevClick(e) {
    },
    nextClick(e) {
    },
    blockClick(item) {
    }
  }
};
</script>

<style lang="scss"></style>
