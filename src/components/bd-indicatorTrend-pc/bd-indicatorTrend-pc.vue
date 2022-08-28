<template>
  <div
    ref="elContainer"
    class="indicator-trend"
  >
    <div class="indicator-container">
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
      >
        <swiper-slide
          v-for="(item, index) in filterColumns"
          :key="item"
        >
          <div
            class="indicator-item"
            :class="{'indicator-item-active': activeIndicator.includes(item) }"
            @click.stop="indicatorClick(item, index)"
          >
            <div
              class="indicator-inner"
              :style="{'justify-content': indicatorAlignItems}"
            >
              <div
                class="indicator-content"
                :style="{'text-align': indicatorTextAlign}"
              >
                <el-row>
                  <div class="indicator-name">
                    {{ series[item].nickName || item }}
                  </div>
                </el-row>
                <el-row>
                  <div
                    class="indicator-value"
                    :style="{color: indicatorFontColor, 'font-size': `${indicatorFontSize}px`}"
                  >
                    <span
                      class="value"
                    >{{ convertNumber(indicatorRows[item], series[item].decimalDigit)[0] }}</span>
                    <span
                      class="unit"
                      v-if="indicatorRows[item]>=10000"
                    >{{ convertNumber(indicatorRows[item], series[item].decimalDigit)[1] }}</span>
                    <span
                      class="suffix"
                      v-if="series[item].suffix"
                    >{{ series[item].suffix }}</span>
                    <span
                      class="icon icon-A10034_up"
                      v-if="series[item].setCondi && parseFloat(indicatorRows[item]) >= parseFloat(series[item].riseNum)"
                      :style="{'font-size': series[item].riseIconSize + 'px',color: series[item].riseIconColor}"
                    />
                    <span
                      class="icon icon-A10035_down"
                      v-if="series[item].setCondi && parseFloat(indicatorRows[item]) <= parseFloat(series[item].dropNum)"
                      :style="{'font-size': series[item].dropIconSize + 'px',color: series[item].dropIconColor}"
                    />
                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div
        class="swiper-button-prev icon-A10026_prePage"
        :class="`swiper-button-prev-${timeStamp}`"
      />
      <div
        class="swiper-button-next icon-A10027_nextPage"
        :class="`swiper-button-next-${timeStamp}`"
      />
    </div>
    <div class="trendChart-container">
      <ve-line
        width="100%"
        height="100%"
        ref="myChart"
        :data="chartData"
        :extend="chartExtend()"
        :settings="chartSetting()"
        :events="chartEvents"
        :theme="theme.chartTheme"
      />
    </div>

    <el-popover
      placement="bottom"
      title="度量筛选"
      width="220"
      trigger="click"
    >
      <div class="check-columns">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="filterColumns"
          @change="changefilterColumns"
          :min="1"
        >
          <el-checkbox
            v-for="(item, index) in data.columns.slice(1)"
            :label="item"
            :key="index"
          >
            <div
              class="text"
              :title="item"
            >
              {{ item }}
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div
        class="filter-icon icon-A10184_filter"
        slot="reference"
      />
    </el-popover>
  </div>
</template>
<script>
import { deepObjectMerge } from '@plugins/common.js';
export default {
  name: 'BdIndicatorTrendPc',
  props: {
    data: Object,
    series: {
      type: Object
    //   default: function() {
    //     let series = {};
    //     this.data.columns.slice(1).forEach(item => {
    //       series[item] = {};
    //     });
    //     return series;
    //   }
    },
    theme: {
    	type: Object,
      default: function() {
        let theme = {
          chartTheme: {}
        };
        return theme;
      }
    },
    slidesPerView: {
      type: Number,
      default: 4
    },
    spaceBetween: {
      type: Number,
      default: 10
    },
    indicatorFontColor: {
      type: String,
      default: '#333'
    },
    indicatorFontSize: {
      type: Number,
      default: 16
    },
    indicatorAlignItems: {
      type: String,
      default: ''
    },
    indicatorTextAlign: {
      type: String,
      default: ''
    },
    chartRowsNum: {
      type: Number,
      default: null
    },
    yAxis2: {
      type: Boolean,
      default: false
    },
    yAxisSite: {
      type: String,
      default: ''
    },
    chartExtends: {
      type: Object,
      default: function() {
        return {};
      }
    },
    chartSettings: {
      type: Object,
      default: function() {
        return {};
      }
    },
    chartEvents: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      checkAll: true,
      filterColumns: this.data.columns.slice(1),
      isIndeterminate: false,
      activeIndicator: [this.data.columns[1]],
      timeStamp: new Date().getTime()
    };
  },
  computed: {
    indicatorRows() {
      return this.data.rows[this.data.rows.length - 1];
    },
    filterData() {
      return this.convertData(this.filterColumns);
    },
    chartData() {
      return this.convertData(this.activeIndicator);
    },
    swiperOptions() {
      return {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        allowTouchMove: false,
        navigation: {
          nextEl: '.swiper-button-next-' + this.timeStamp,
          prevEl: '.swiper-button-prev-' + this.timeStamp
        }
      };
    }
  },
  methods: {
    convertNumber(num, decimalDigit) {
      let unit = '';
      num = Number(num);
      if (num >= 10000 && num < 100000000) {
        num = num / 10000;
        unit = '万';
      } else if (num >= 100000000) {
        num = num / 100000000;
        unit = '亿';
      }
      num =
        decimalDigit || decimalDigit === 0 ? num.toFixed(decimalDigit) : num;
      return [num, unit, num + unit];
    },
    indicatorClick(item, index) {
      if (
        this.activeIndicator.includes(item) &&
        this.activeIndicator.length > 1
      ) {
        this.activeIndicator.splice(
          this.activeIndicator.findIndex(item1 => item1 === item),
          1
        );
      } else if (!this.activeIndicator.includes(item)) {
        this.activeIndicator.push(item);
      }
      this.$emit('click', { item, index });
    },
    handleCheckAllChange(val) {
      if (val) {
        this.filterColumns = this.data.columns.slice(1);
        this.isIndeterminate = false;
      } else {
        this.filterColumns = [this.data.columns[1]];
        this.activeIndicator = [this.data.columns[1]];
        this.isIndeterminate = true;
      }
      this.$emit('handleCheckAllChange', val);
    },
    changefilterColumns(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.data.columns.length - 1;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.columns.length - 1;
      this.activeIndicator = this.filterColumnsFun(this.filterColumns, this.activeIndicator);
      this.$nextTick(_ => {
        this.$refs.myChart.echarts.resize();
      });
      this.$emit('changefilterColumns', value);
    },
    filterColumnsFun(data1, data2) {
      let tempArr = [];
      data1.forEach(item => {
        data2.forEach(item1 => {
          if (item === item1) {
            tempArr.push(item1);
          }
        });
      });
      return tempArr;
    },
    convertData(metric) {
      let columns = [this.data.columns[0], ...metric];
      let rows = [];
      this.data.rows.forEach(rowsData => {
        let rowsObj = {};
        columns.forEach(columnsData => {
          rowsObj[columnsData] = rowsData[columnsData];
        });
        rows.push(rowsObj);
      });
      rows = this.chartRowsNum ? rows.slice(-this.chartRowsNum) : rows;
      return {
        columns: columns,
        rows: rows
      };
    },
    chartExtend() {
      let chartExtends = {
        grid: {
          left: 50,
          right: 50,
          bottom: 25
        },
        xAxis: {
          axisTick: {
            show: false
          },
          boundaryGap: false
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: (value, index) => {
              return this.convertNumber(value, 0)[2];
            }
          }
        },
        'yAxis.1.show': this.yAxis2
      };
      return deepObjectMerge(chartExtends, this.chartExtends);
    },
    chartSetting() {
      let chartSettings = {
        axisSite: {
          right: [this.yAxisSite]
        }
      };
      return deepObjectMerge(chartSettings, this.chartSettings);
    }
  },
  watch: {
    data: {
      handler(n, o) {
        if (this.filterColumns.length === 0) {
          this.filterColumns = this.data.columns.slice(1);
        } else {
          this.filterColumns = this.filterColumnsFun(this.filterColumns, this.data.columns.slice(1));
        }
        if (!this.activeIndicator[0]) {
          this.activeIndicator = [this.data.columns[1]];
        } else {
          this.activeIndicator = this.filterColumnsFun(this.filterColumns, this.activeIndicator);
        }
        this.$nextTick(_ => {
          this.$refs.myChart.echarts.resize();
        });
      }
    },
    swiperOptions: {
      handler(n, o) {
        let swiper = this.$refs.mySwiper.swiper || this.$refs.mySwiper.$swiper;
        swiper.params.slidesPerView = this.slidesPerView;
        swiper.params.spaceBetween = this.spaceBetween;
      }
    },
    filterColumns: {
      deep: true,
      immediate: true,
      handler(n, o) {
        let checkedCount = n.length;
        this.checkAll = checkedCount === this.data.columns.length - 1;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.columns.length - 1;
      }
    }
  },
  mounted() {
    console.log(this.series);
  }
};
</script>
<style lang="scss" scoped>
.indicator-trend {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
//指标块样式
.indicator-container {
  position: relative;
  padding: 0 20px;
}
.indicator-item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 90px;
  padding: 0 15px;
  border: 1px solid #dbdfe5;
  cursor: pointer;
}
.indicator-item-active {
  padding: 0 14px;
  border: 2px solid #409eff;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-top: 18px solid #409eff;
    border-left: 18px solid transparent;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 7px;
    height: 4px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(140deg);
  }
}
.indicator-inner {
  overflow: hidden;
  display: flex;
  width: 100%;
}
.indicator-value {
  display: flex;
  align-items: baseline;
  color: #2052d6;
  // .value {
  //   font-size: 24px;
  // }
  .icon {
    font-size: 14px;
  }
}
.filter-icon {
  position: absolute;
  left: 0;
  top: 0;
  color: #409eff;
  cursor: pointer;
}
//图形部分样式
.trendChart-container {
  position: relative;
  flex: 1;
  margin-top: 10px;
}
//swiper样式
.swiper-button-prev,
.swiper-button-next {
  width: auto;
  height: auto;
  margin-top: -9px;
  background: none;
  font-size: 18px;
  color: #409eff;
  outline: none;
  &.swiper-button-disabled {
    color: #c0c4cc;
    opacity: 1;
  }
}
.swiper-button-next {
  right: 0;
  left: auto;
}

.swiper-button-prev {
  left: 0;
  right: auto;
}
.check-columns {
  overflow: auto;
  max-height: 200px;
  &::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  &::-webkit-scrollbar-track {
    opacity: 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4.5px;
    border: 1px solid #ffffff;
    border-right-width: 2px;
    background-color: #d3d8e4;
  }
}
.el-checkbox {
  .text {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 120px;
    vertical-align: -4px;
  }
}
</style>
