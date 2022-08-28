<template>
  <div
    class="bd-indicatorCard-pc"
    :style="{backgroundColor:bgColor}"
    ref="elContainer"
    @click="blockClick()"
  >
    <div>
      <div>
        <div
          class="mainIndicator"
          :style="mainIndicatorStyle"
          v-if="data.rows.length > 0 && Object.keys(data.rows[0]).length > 0"
        >
          <div
            class="indicator"
            v-if="!isMainIndicator"
            :style="mainSeriesStyle"
          >
            {{ getMainData.name }}
          </div>
          <div class="value">
            <span :style="mainIndicatorValueStyle">{{ tranNumber(getMainData.value, getMainData.decimalDigit) }}</span>
            <span
              v-if="getMainData.setCondi"
              :style="{fontSize:mainFontSize+'px'}"
            >
              <span
                v-if="parseFloat(getMainData.value) >= parseFloat(getMainData.riseNum)"
                class="metric-icon icon-A10034_up"
                :style="{color:getMainData.riseIconColor }"
              />
              <span
                v-if="parseFloat(getMainData.value) <= parseFloat(getMainData.dropNum)"
                class="metric-icon icon-A10035_down"
                :style="{color:getMainData.dropIconColor }"
              />
            </span>
          </div>
          <div
            class="note"
            v-if="isNote"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="noteContent"
              placement="top-start"
            >
              <span
                :style="{color:noteColor}"
                class="icon-A10407_help tool-btn-icon"
              />
            </el-tooltip>
          </div>
        </div>
        <div class="clear" />
      </div>
      <div
        class="subIndicatorBox"
        v-if="data.rows.length > 0 &&Object.keys(data.rows[0]).length > 1"
      >
        <div
          class="subIndicator"
          :style="{'width':getSubRowNum,'text-align': alignFun(index)}"
          v-for="(item, index) in getSubData"
          :key="index"
        >
          <span
            class="indicator"
            :style="{fontSize:item.seriesFontSize+'px',color:item.seriesColor}"
          >{{ item.name }}</span>
          <span class="value">
            <span :style="subIndicatorValueStyle">{{ tranNumber(item.value, item.decimalDigit) }}</span>
            <span
              v-if="item.setCondi"
              :style="{fontSize:subFontSize+'px'}"
            >
              <span
                v-if="parseFloat(item.value) >= parseFloat(item.riseNum)"
                class="metric-icon icon-A10034_up"
                :style="{color:item.riseIconColor }"
              />
              <span
                v-if="parseFloat(item.value) <= parseFloat(item.dropNum)"
                class="metric-icon icon-A10035_down"
                :style="{color:item.dropIconColor }"
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BdIndicatorCardPc',
  props: {
    data: Object,
    series: {
      type: Array,
      default() {
        return [];
      }
    },
    bgColor: { // 卡片颜色
      type: String,
      default: ''
    },
    isMainIndicator: { // 是否显示主指标
      type: Boolean,
      default: false
    },
    mainFontSize: { // 设置主指标字体大小
      type: Number,
      default: 20
    },
    mainColor: { // 设置主指标字体颜色
      type: String,
      default: ''
    },
    mainIndicatorTextAlign: { // 设置主指标对齐方式
      type: String,
      default: ''
    },
    subIndicatorTextAlign: { // 设置副指标对齐方式
      type: String,
      default: ''
    },
    isNote: { // 是否显示备注
      type: Boolean,
      default: false
    },
    noteContent: { // 备注内容
      type: String,
      default: ''
    },
    noteColor: { // 备注图标颜色
      type: String,
      default: ''
    },
    subFontSize: { // 设置副指标字体大小
      type: Number,
      default: 16
    },
    subColor: { // 设置副指标字体颜色
      type: String,
      default: ''
    },
    subTextAlign: { // 设置副指标对齐方式
      type: String,
      default: ''
    },
    subRowNum: { // 设置副指标每行展示个数
      type: Number,
      default: null
    },
    isBothAlign: { // 是否两端对齐
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    metricData() {
      let metricData = [];
      if (this.data.columns && this.data.columns.length > 0) {
        this.data.columns.forEach((colData, colIndex) => {
          if (
            this.series &&
              this.series.length > 0 &&
              colIndex <= this.series.length
          ) {
            metricData.push({
              ...this.series[colIndex],
              name: this.series[colIndex].nickName ? this.series[colIndex].nickName : colData,
              value: this.data.rows[0][colData]
            });
          } else {
            metricData.push({
              ...this.series[colIndex],
              name: colData,
              value: this.data.rows[0][colData]
            });
          }
        });
      }
      return metricData;
    },
    getMainData() {
      return this.metricData.length > 0 ? this.metricData[0] : {};
    },
    getSubData() {
      let data = this.metricData.length > 1 ? this.metricData : {};
      let data1 = [];
      for (let i = 1; i < data.length; i++) {
        data1.push(data[i]);
      }
      return data1;
    },
    getSubRowNum() { // 根据每列展示个数计算每个副指标的宽度
      return this.subRowNum ? parseFloat(100 / this.subRowNum) + '%' : '33.33%';
    },
    mainSeriesStyle() {
      return {
        'font-size': this.getMainData.seriesFontSize ? this.getMainData.seriesFontSize + 'px' : '',
        'color': this.getMainData.seriesColor ? this.getMainData.seriesColor : ''
      };
    },
    mainIndicatorStyle() {
      return {
        'text-align': this.mainIndicatorTextAlign ? this.mainIndicatorTextAlign : 'left'
      };
    },
    mainIndicatorValueStyle() {
      return {
        'font-size': this.mainFontSize ? this.mainFontSize + 'px' : '',
        'color': this.mainColor ? this.mainColor : ''
      };
    },
    subIndicatorValueStyle() {
      return {
        'font-size': this.subFontSize ? this.subFontSize + 'px' : '',
        'color': this.subColor ? this.subColor : ''
      };
    }
  },
  methods: {
    tranNumber(num, decimalDigit) {
      num = Number(num);
      let unit = '';
      if (num >= 10000 && num < 100000000) {
        num = num / 10000;
        unit = '万';
      } else if (num >= 100000000) {
        num = num / 100000000;
        unit = '亿';
      }
      return decimalDigit || decimalDigit === 0 ? num.toFixed(decimalDigit) + unit : num + unit;
    },
    alignFun(index) {
      let len = this.getSubData.length;
      let num = this.subRowNum;
      if (len === 1 || !this.isBothAlign || (num === 3 && len === 2)) {
        return this.subIndicatorTextAlign ? this.subIndicatorTextAlign : 'left';
      }
      // 每行展示个数2时 分左右
      if (num == 2) {
        if (index % num === 0) {
          return 'left';
        } else {
          return 'right';
        }
      }
      // 每行展示个数3时 分左中右
      if (num == 3) {
        if (index % num === 0) {
          return 'left';
        } else {
          if (index % num === 2) {
            return 'right';
          } else {
            return 'center';
          }
        }
      }
    },
    blockClick() {
      this.$emit('click');
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.bd-indicatorCard-pc{
    padding: 10px;
    width: 100%;
    height: 100%;
    .mainIndicator{
        .indicator{
            margin-bottom: 10px;
        }
        .value{
          .icon-A10034_up{
             color: #f00;
          }
          .icon-A10035_down{
            color: #008000;
            position: relative;
            top: 1px;
          }
        }
    }
    .note{
        position: absolute;
        top: 10px;
        right:10px;
        span{
            font-size: 20px;
        }
    }
    .clear{
        clear: both;
    }
    .subIndicatorBox{
        margin-top: 20px;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        .subIndicator{
          white-space: nowrap;
          padding: 5px 0px;
          .indicator{
            max-width: 50%;
            overflow:hidden;
            text-overflow:ellipsis;
            display: inline-block;
            margin-right:5px;
            position: relative;
            top: -1px;
          }
          .value{
            max-width: 50%;
            text-overflow:ellipsis;
            display: inline-block;
            overflow:hidden;
            padding-right: 3px;
          }
          .icon-A10034_up{
             color: #f00;
          }
          .icon-A10035_down{
             color: #008000;
             position: relative;
             top: 1px;
          }
        }
    }

}
</style>
