<template>
  <div class="flow-work-box">
    <el-steps
      :id="`flow-${comptId}`"
      :active="flowData.length"
      style="padding-top: 30px;"
      align-center
    >
      <el-step
        v-for="(item, curIndex) in newFlowData"
        :key="item.index"
      >
        <template slot="title">
          <div class="title-dropdown">
            <el-dropdown
              @command="resetFlow"
            >
              <span class="el-dropdown-link">
                {{ item.xData[0].value }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu
                slot="dropdown"
              >
                <el-dropdown-item
                  v-for="(dim, changeIndex) in newFlowData"
                  :key="dim.index"
                  :command="{curIndex, changeIndex}"
                >
                  {{ dim.xData[0].value }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
        <template slot="description">
          <el-card shadow="hover">
            <div
              v-for="yItem in item.yData"
              :key="yItem.index"
              class="card-info"
            >
              <span
                :title="yItem.name"
                :style="{
                  'color': yItem.fontColor,
                  'font-size': yItem.fontSize
                }"
              >{{ yItem.name }}</span>
              <label
                :title="yItem.value"
                :style="{
                  'color': yItem.valueColor,
                  'font-size': yItem.fontSize
                }"
              >{{ yItem.value }}</label>
            </div>
          </el-card>
        </template>
      </el-step>
    </el-steps>
    <el-button
      class="icon-arrow left"
      icon="el-icon-arrow-left"
      circle
      @click="slideFlow('left')"
    />
    <el-button
      class="icon-arrow right"
      icon="el-icon-arrow-right"
      circle
      @click="slideFlow('right')"
    />
  </div>
</template>
<script>
import { transNumber } from '@/plugins/common.js';
export default {
  name: 'BdWorkFlow',
  props: {
    comptId: {
      type: String
    },
    flowData: {
      default: () => {
        return [
          {
            'xData': [
              {
                value: ''
              }
            ],
            'yData': [
              {
                name: '',
                value: ''
              }
            ]
          }
        ];
      },
      type: Array
    },
    // 存放ydata个性化样式设置,属性key
    colSetting: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // ydata个性化样式设置用来当key的属性名称
    keyName: {
      type: String,
      default: ''
    }
    /**
     * eg: {"D9A492CB24BE3BE488D19AEBCD8311EB":{"oriName":"移动当日新增通话客户数","nickName":"test","decimalDigit":2,"fontSize":18,"fontColor":"rgba(255, 128, 64, 1)", "valueColor": "#303133"},"D9A492CB24BE3BE488D19AECCD8311EB":{"oriName":"移动当日新增通话客户数较上一天变化值","nickName":"变化值","decimalDigit":4,"fontSize":69,"fontColor":"rgba(64, 79, 95, 1)", "valueColor": "red"}}
     */
  },
  data() {
    return {
      curFlowData: this.flowData
    };
  },
  watch: {
    'flowData': {
      'deep': true,
      handler(nv) {
        this.curFlowData = nv;
      }
    },
    curFlowData(nv) {
      this.$emit('input', nv);
    }
  },
  computed: {
    // 补上自定义样式设置属性
    newFlowData() {
      const flowData = this.flowData;
      const colSetting = this.colSetting || {};
      const keyName = this.keyName || '';
      let newData = JSON.parse(JSON.stringify(flowData));
      for (let firstIndex = 0; firstIndex < newData.length; firstIndex++) {
        const {
          yData
        } = newData[firstIndex];
        newData[firstIndex].yData = yData.map(item => {
          const { [keyName]: element_id, name, value } = item;
          let fontSize = 14;
          let fontColor = '#409eff';
          let valueColor = '#303133';
          let decimalDigit = 0;
          let newItem = {
            fontSize: 14,
            fontColor: '#409eff',
            value: transNumber(value || 0, decimalDigit),
            name
          };
          if (colSetting[element_id]) {
            const style = colSetting[element_id];
            newItem = {
              fontSize: (style.fontSize || fontSize) + 'px',
              fontColor: style.fontColor || fontColor,
              valueColor: style.valueColor || valueColor,
              value: transNumber(value || 0, style.decimalDigit || 0), // 格式化小数位
              name: style.nickName || name // 别名
            };
          }
          return newItem;
        });
      }
      return newData;
    }
  },
  methods: {
    resetFlow(data) {
      let { curIndex, changeIndex } = data;
      let x = Math.min(curIndex, changeIndex);
      let y = Math.max(curIndex, changeIndex);
      this.curFlowData.splice(x, 1, ...this.curFlowData.splice(y, 1, this.curFlowData[x]));
    },
    slideFlow(direction) {
      let count = direction === 'right' ? 4 : -4;
      let clock = setInterval(() => {
        document.getElementById(`flow-${this.comptId}`).scrollLeft += count;
      }, 10);
      setTimeout(() => {
        clearInterval(clock);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.title-dropdown {
  position: absolute;
  top: -34px;
  left: 50%;
  width: 100%;
  // margin-left: -30px;
  transform: translateX(-50%);
}
::v-deep.el-step.is-center .el-step__description {
  padding: 0 10px;
}
::v-deep.el-card {
  margin-top: 12px;
  font-size: 14px;
  .el-card__body {
    padding: 12px;
  }
}
.flow-work-box {
  height: 100%;
  overflow: hidden;
  position: relative;
  &:hover {
    .icon-arrow {
      display: block;
    }
  }
}
::v-deep.el-steps {
  width: 100%;
  overflow: auto;
  height: calc(100% + 20px);
  &::-webkit-scrollbar {
      display: none;
  }
}
::v-deep.el-step.is-horizontal {
  min-width: 200px;
}
.card-info {
  span, label {
    width: calc(50% - 10px);
    text-align: right;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  span {
    color: #409eff;
    margin-right: 18px;
    text-align: left;
  }
}
.icon-arrow {
  position: absolute;
  display: none;
  top: 30px;
  z-index: 9;
  cursor: pointer;
  &.left {
    left: 30px;
  }
  &.right {
    right: 30px;
  }
}
</style>
