<template>
  <div style="width:100%;">
    <bd-div
      type="bd-indicatorCard-pc"
      :data="data1"
      :series="series1"
    />
    <br>
    <bd-div
      type="bd-indicatorCard-pc"
      :data="data2"
    />
    <bd-div
      type="bd-indicatorCard-pc"
      :data="data3"
    />
    <bd-div
      type="bd-indicatorCard-pc"
      :data="data4"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: {
        rows: [
          { '个人收入': 188593.27, '环比': 28593.27, '排名': 1593, '新手': 13345, '老手': 7788, '小孩': 123.44, '大人': 7898888888880.4444 }
        ],
        columns: ['个人收入', '环比', '排名', '新手', '老手', '小孩', '大人']
      },
      series1: [
        { name: '个人收入', dropNum: 1222222, riseNum: 500, nickName: 'ahha', setCondi: true },
        { name: '环比', dropNum: 1233223, riseNum: 1234, nickName: '444是超市菜市场4' },
        { name: '排名', dropNum: 1222222, riseNum: 23445, nickName: '' },
        { name: '新手', dropNum: 1222222, riseNum: 3333 },
        { name: '老手', dropNum: 1222222, riseNum: 123 },
        { name: '小孩', dropNum: 1222222, riseNum: 50 },
        { name: '大人', dropNum: 1222222, riseNum: 50000000 }
      ],
      data2: {
        rows: [
          { '个人收入': 188593.27, '环比': 28593.27, '排名': 1593, '新手': 13345 }
        ],
        columns: ['个人收入', '环比', '排名', '新手']
      },
      data3: {
        rows: [
          { '个人收入': 188593.27 }
        ],
        columns: ['个人收入']
      },
      data4: {
        rows: [

        ],
        columns: []
      }
    };
  },
  methods: {

  }
};
</script>

<style lang="scss"></style>
