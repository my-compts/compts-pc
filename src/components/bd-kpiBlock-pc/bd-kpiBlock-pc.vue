<template>
  <div
    class="bd-kpiBlock-pc"
    ref="elContainer"
    :style="{
      padding: navigation?'0 30px':''
    }"
  >
    <div class="kpiBlock-wrapper">
      <div
        class="kpiBlock-slideWrap"
        :style="{
          transform:'translate3d(' + offsetLeft + 'px, 0, 0)'
        }"
      >
        <div
          v-for="(itemDim, index) in data.rows"
          :key="index"
          class="kpiBlock-slide"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
          @click="blockClick(itemDim)"
          :style="{
            'width': width + 'px',
            'background-color': bgColor,
            'border-color': borderColor,
            'margin-left': index!=0?spacing + 'px': 0
          }"
        >
          <div
            v-if="!latTitleHide"
            class="lat-title"
            :style="{
              'font-size': latTitleFontSize + 'px',
              color: latTitleFontColor
            }"
          >
            {{ itemDim[data.columns[0]] }}
          </div>
          <div
            class="metric-content"
            v-if="metricData.length>0"
          >
            <div
              v-for="(itemKpi, indexkpi) in metricData"
              :key="indexkpi"
              class="metric-row"
              :class="[
                'metric-row' + (indexkpi + 1),
                metricRowBig && indexkpi === 0 ? 'metric-row-big' : ''
              ]"
              :style="[indexkpi != metricData.length - 1 ? metricSplitLine : '']"
            >
              <div
                class="metric-name"
                v-if="indexkpi === 0 && !metricTitleHide"
              >
                {{ itemKpi.name }}
              </div>
              <div
                class="metric-name"
                v-else-if="indexkpi != 0"
              >
                {{ itemKpi.name }}
              </div>
              <div
                class="metric-vCont"
                :style="[indexkpi === 0 ? priMetricStyle : '']"
              >
                <div
                  class="metric-value"
                >
                  {{ tranNumber(itemDim[itemKpi.name],itemKpi.decimalDigit) }}
                </div>
                <div
                  class="metric-unit"
                  v-if="itemDim[itemKpi.name] >= 100000000"
                >
                  亿
                </div>
                <div
                  class="metric-unit"
                  v-if="
                    itemDim[itemKpi.name] >= 10000 &&
                      itemDim[itemKpi.name] < 100000000
                  "
                >
                  万
                </div>
                <div
                  class="metric-icon icon-A10034_up"
                  v-if="
                    parseFloat(itemDim[itemKpi.name]) >= parseFloat(itemKpi.riseNum)
                  "
                  :style="{
                    'font-size': itemKpi.riseIconSize + 'px',
                    color: itemKpi.riseIconColor
                  }"
                />
                <div
                  class="metric-icon icon-A10035_down"
                  v-if="
                    parseFloat(itemDim[itemKpi.name]) <= parseFloat(itemKpi.dropNum)
                  "
                  :style="{
                    'font-size': itemKpi.dropIconSize + 'px',
                    color: itemKpi.dropIconColor
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="navigation"
        class="kpiBlock-button-prev icon-A10028_arrowLeft"
        :class="{'kpiBlock-button-disabled':slideIndex==0}"
        @click="prevSlide"
      />
      <div
        v-if="navigation"
        class="kpiBlock-button-next icon-A10029_arrowRight"
        :class="{'kpiBlock-button-disabled':slideIndex==Math.floor(slideTimes)+1}"
        @click="nextSlide"
      />
    </div>
  </div>
</template>

<script>
import DomSize from '@plugins/domSize.js';
export default {
  data() {
    return {
      slideIndex: 0,
      offsetLeft: 0,
      containerWidth: 0
    };
  },
  name: 'BdKpiBlockPc',
  props: {
    data: Object,
    series: {
      type: Array,
      default() {
        return [];
      }
    },
    latTitleHide: {
      type: Boolean,
      default: false
    },
    latTitleFontSize: {
      type: Number,
      default: null
    },
    latTitleFontColor: {
      type: String,
      default: ''
    },
    metricRowBig: {
      type: Boolean,
      default: true
    },
    metricTitleHide: {
      type: Boolean,
      default: false
    },
    priMetricTextAlign: {
      type: String,
      default: ''
    },
    priMetricFontSize: {
      type: Number,
      default: null
    },
    priMetricFontColor: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    hoverBgColor: {
      type: String,
      default: ''
    },
    hoverBorderColor: {
      type: String,
      default: ''
    },
    metricSplitLineStyle: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 150
    },
    spacing: {
      type: Number,
      default: 10
    }
  },
  computed: {
    metricData() {
      let metricData = [];
      if (this.data.columns && this.data.columns.length > 1) {
        this.data.columns.forEach((colData, colIndex) => {
          if (colIndex > 0) {
            let seriesObj = {};
            seriesObj.name = colData;
            if (
              this.series &&
              this.series.length > 0 &&
              colIndex <= this.series.length
            ) {
              Object.assign(seriesObj, this.series[colIndex - 1]);
            }
            metricData.push(seriesObj);
          }
        });
      }
      return metricData;
    },
    priMetricStyle() {
      return {
        color: this.priMetricFontColor,
        'font-size': this.priMetricFontSize
          ? this.priMetricFontSize + 'px'
          : '',
        'text-align': this.priMetricTextAlign
      };
    },
    metricSplitLine() {
      return {
        'border-bottom-width': this.metricSplitLineStyle ? '1px' : '',
        'border-bottom-color': this.metricSplitLineStyle ? '#dbdfe5' : '',
        'border-bottom-style': this.metricSplitLineStyle,
        'padding-bottom': this.metricSplitLineStyle ? '5px' : ''
      };
    },
    navigation() {
      if (
        (this.width + this.spacing) * this.data.rows.length - this.spacing >
        this.containerWidth
      ) {
        return true;
      } else {
        return false;
      }
    },
    slidePerView() {
      let slidePerView =
        (this.containerWidth - 60 + this.spacing) / (this.width + this.spacing);
      if (slidePerView > 0 && slidePerView < 1) {
        slidePerView = 1;
      } else {
        Math.floor(slidePerView);
      }
      return slidePerView;
    },
    slideTimes() {
      if (this.data.rows.length / this.slidePerView === 0) {
        return this.data.rows.length - this.slidePerView;
      } else {
        return (
          Math.floor(this.data.rows.length / this.slidePerView) *
            this.slidePerView -
          this.slidePerView +
          (this.data.rows.length % this.slidePerView)
        );
      }
    }
  },
  watch: {
    width() {
      this.slideIndex = 0;
      this.offsetLeft = 0;
    },
    spacing() {
      this.slideIndex = 0;
      this.offsetLeft = 0;
    },
    containerWidth() {
      this.slideIndex = 0;
      this.offsetLeft = 0;
    }
  },
  methods: {
    mouseenter(e) {
      e.target.style.backgroundColor = this.hoverBgColor;
      e.target.style.borderColor = this.hoverBorderColor;
    },
    mouseleave(e) {
      e.target.style.backgroundColor = this.bgColor;
      e.target.style.borderColor = this.borderColor;
    },
    tranNumber(num, decimalDigit) {
      num = Number(num);
      if (num >= 10000 && num < 100000000) {
        num = num / 10000;
      } else if (num >= 100000000) {
        num = num / 100000000;
      }
      return decimalDigit || decimalDigit === 0 ? num.toFixed(decimalDigit) : num;
    },
    prevSlide(e) {
      if (this.slideIndex > 0) {
        this.offsetLeft = this.offsetLeft + this.width + this.spacing;
        this.$emit('prevClick', e);
        this.slideIndex--;
      }
    },
    nextSlide(e) {
      if (this.slideIndex < this.slideTimes) {
        this.offsetLeft = this.offsetLeft - this.width - this.spacing;
        this.$emit('nextClick', e);
        this.slideIndex++;
      }
    },
    blockClick(item) {
      this.$emit('click', item);
    }
  },
  mounted() {
    let _this = this;
    this.containerWidth = this.$refs.elContainer.offsetWidth;
    DomSize.bind(this.$refs.elContainer, function() {
      _this.containerWidth = parseInt(this.style.width);
    });
  }
};
</script>

<style lang="scss" scoped>
.bd-kpiBlock-pc {
  position: relative;
  width: 100%;
}
.kpiBlock-wrapper {
  overflow: hidden;
}
.kpiBlock-slideWrap {
  position: relative;
  display: flex;
  transform: translate3d(0px, 0, 0);
  transition: transform 300ms;
}
.kpiBlock-slide {
  flex: none;
  width: 150px;
  padding: 10px;
  color: #333;
  background-color: #fff;
  border: 1px solid #dbdfe5;
  .lat-title {
    font-size: 14px;
    text-align: left;
  }
  .metric-content {
    .metric-row {
      display: inline-block;
      overflow: hidden;
      width: 100%;
      .metric-name {
        float: left;
        color: #999;
      }
      .metric-vCont {
        float: right;
        > div {
          display: inline-block;
        }
        .icon-A10034_up {
          color: #f00;
        }
        .icon-A10035_down {
          color: #008000;
        }
      }
    }
    .metric-row-big {
      .metric-name {
        width: 100%;
        text-align: left;
      }
      .metric-vCont {
        display: inline-block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        color: #2052d6;
        text-align: center;
      }
    }
    .metric-row1 {
      .metric-name {
        color: #333;
      }
    }
  }
  &:hover {
    background-color: #ebebeb;
  }
}
.kpiBlock-button-prev,
.kpiBlock-button-next {
  position: absolute;
  top: 50%;
  font-size: 32px;
  margin-top: -16px;
  z-index: 10;
  cursor: pointer;
  color: #2052d6;
}
.kpiBlock-button-prev {
  left: 0;
}
.kpiBlock-button-next {
  right: 0;
}
.kpiBlock-button-disabled {
  color: #dbdfe5;
}
</style>
