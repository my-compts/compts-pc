<template>
  <div style="width:100%;height:500px;">
    <bd-div
      type="bd-indicatorTrend-pc"
      :data="data"
      :series="series"
      :slides-per-view="4"
      :space-between="10"
    />
    <bd-div
      type="bd-indicatorTrend-pc"
      :data="data"
      :series="series"
      :slides-per-view="4"
      :space-between="10"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        columns: ['时间', '单价', '折扣点', '订单编号', '订单数量', '订单金额', '运输成本', '利润金额'],
        rows: [
          { '时间': '2020-01', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-02', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-03', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-04', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-05', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-06', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-07', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-08', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) },
          { '时间': '2020-09', '单价': Math.floor(Math.random() * 10000000), '折扣点': Math.floor(Math.random() * 10000000), '订单编号': Math.floor(Math.random() * 10000000), '订单数量': Math.floor(Math.random() * 10000000), '订单金额': Math.floor(Math.random() * 10000000), '运输成本': Math.floor(Math.random() * 10000000), '利润金额': Math.floor(Math.random() * 10000000) }
        ]
      },
      series: {
        '单价': {
          'color': '#f00',
          'suffix': '个',
          'riseNum': 1000
        },
        '折扣点': {},
        '订单编号': {},
        '订单数量': {},
        '订单金额': {},
        '运输成本': {},
        '利润金额': {}
      }
    };
  },
  methods: {
    blockClick(item) {
    }
  }
};
</script>

<style lang="scss"></style>
