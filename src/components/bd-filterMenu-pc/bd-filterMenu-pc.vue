<template>
  <div>
    <div
      class="bd-filterMenu-pc"
      v-if="data"
    >
      <div
        v-for="(node,index) in primaryNodeData"
        :key="index"
        :nodeLevel="nodeLevel"
        class="primary-filter-item"
      >
        <div class="parent-filter-content">
          <div class="parent-node-name">
            【{{ node.name }}】
          </div>
          <div
            class="all-options"
            :class="{'selected':isSelectAll(node.children)}"
            @click="selecteAll(node.children)"
          >
            全部
          </div>
          <div
            v-if="node.children"
            class="filter-list"
            :nodeLevel="nodeLevel"
            :style="{'height':unfoldDiv[index] ? '' :'32px'}"
          >
            <ul>
              <li
                v-for="(list,listIndex) in node.children"
                :key="listIndex"
                :data-id="list.id"
                :parent-id="node.id"
                :nodeLevel="nodeLevel"
                class="filter-options"
                @click="optionsClick(list,listIndex,node.children)"
                :class="{'selected':selectedList.includes(list.id),'hasChildNode':list.hasChildNode}"
              >
                <div class="option-item">
                  <span class="option-text">{{ list.name }}</span>
                  <span
                    v-if="list.hasChildNode"
                    :class="['option-icon',childNodeshowList.some(item => item.id === list.id) ? 'icon-A10016_doubleArrowUp' :'icon-A10017_doubleArrowDown']"
                    @click.stop="showChildNode(list,listIndex,node.children)"
                  />
                  <span
                    v-else
                    :class="['option-icon',selectedList.includes(list.id)?'icon-A10071_close':'icon-A10073_add']"
                  />
                </div>
              </li>
            </ul>
            <div
              v-if="node.children.length*130 > clientWidth-163"
              :class="['collapse-icon', unfoldDiv[index] ? 'icon-A10022_doubleArrowBackUp' : 'icon-A10023_doubleArrowBackDown']"
              @click="adjustDiv(index)"
            />
          </div>
        </div>
        <div
          v-if="allChildNodeData[index].length > 0"
          class="children-filter-content"
        >
          <div
            v-show="childNodeshowList.some(item => item.id === childNode.parentId)"
            v-for="(childNode,childNodeIndex) in allChildNodeData[index]"
            :key="childNodeIndex"
            :parent-id="childNode.parentId"
            :nodeLevel="childNode.nodeLevel"
            class="children-filter-item"
          >
            <div class="parent-node-name">
              <span style="margin-left:6px;">[</span>{{ childNode.name }}<span>]</span>
            </div>
            <div
              class="all-options"
              :class="{'selected':isSelectAll(childNode.nodeData)}"
              @click="selecteAll(childNode.nodeData)"
            >
              全部
            </div>
            <div class="filter-list">
              <ul>
                <li
                  v-for="(childNodeList,childNodeListIndex) in childNode.nodeData"
                  :key="childNodeListIndex"
                  :data-id="childNodeList.id"
                  :parent-id="childNodeList.parentId"
                  :nodeLevel="childNodeList.nodeLevel"
                  class="filter-options"
                  @click="optionsClick(childNodeList,childNodeListIndex,childNode.nodeData)"
                  :class="{'selected':selectedList.includes(childNodeList.id),'hasChildNode':childNodeList.hasChildNode}"
                >
                  <div class="option-item">
                    <span class="option-text">{{ childNodeList.name }}</span>
                    <span
                      v-if="childNodeList.hasChildNode"
                      :class="['option-icon',childNodeshowList.some(item => item.id === childNodeList.id) ? 'icon-A10016_doubleArrowUp' :'icon-A10017_doubleArrowDown']"
                      @click.stop="showChildNode(childNodeList,childNodeListIndex,childNode.nodeData)"
                    />
                    <span
                      v-else
                      :class="['option-icon',selectedList.includes(childNodeList.id)?'icon-A10071_close':'icon-A10073_add']"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeLevel: 1,
      selectedList: [],
      unfoldDiv: [],
      childNodeshowList: [],
      clientWidth: window.innerWidth
    };
  },
  name: 'BdFilterMenuPc',
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    primaryNodeData() {
      let primaryNodeData = [];
      this.data.forEach(node => {
        let nodeObj = {
          id: node.id,
          name: node.name,
          nodeLevel: this.nodeLevel
        };
        let childNodeData = [];
        node.children.forEach(childNode => {
          let childNodeObj = {
            id: childNode.id,
            name: childNode.name,
            nodeLevel: this.nodeLevel,
            hasChildNode: !!(childNode.children && childNode.children.length > 0)
          };
          childNodeData.push(childNodeObj);
        });
        nodeObj.children = childNodeData;
        primaryNodeData.push(nodeObj);
      });
      return primaryNodeData;
    },
    allChildNodeData() {
      let allChildNodeData = [];
      this.data.forEach(item => {
        let childNodeData = [];
        item.children.forEach(item => {
          if (item.children && item.children.length > 0) {
            childNodeData.push(
              ...this.restructureData([], item, this.nodeLevel)
            );
          }
        });
        allChildNodeData.push(childNodeData);
      });
      return allChildNodeData;
    }
  },
  methods: {
    adjustDiv(index) {
      if (!this.unfoldDiv[index]) {
        this.$set(this.unfoldDiv, index, true);
      } else {
        this.$set(this.unfoldDiv, index, false);
      }
    },
    restructureData(callbackData, parentNode, nodeLevel) {
      let [node, newData] = [
        parentNode.children,
        {
          parentId: parentNode.id,
          name: parentNode.name,
          nodeLevel: nodeLevel + 1,
          nodeData: []
        }
      ];
      node.forEach(item => {
        let nodeObj = {
          id: item.id,
          parentId: parentNode.id,
          name: item.name,
          nodeLevel: newData.nodeLevel,
          hasChildNode: !!(item.children && item.children.length > 0)
        };
        newData.nodeData.push(nodeObj);
      });
      callbackData.push(newData);
      node.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.restructureData(callbackData, item, newData.nodeLevel);
        }
      });
      return callbackData;
    },
    optionsClick(option, index, node) {
      if (this.selectedList.includes(option.id)) {
        this.selectedList.splice(
          this.selectedList.findIndex(item => item === option.id),
          1
        );
      } else {
        this.selectedList.push(option.id);
      }
    },
    isSelectAll(node) {
      return node.every(item => {
        return this.selectedList.includes(item.id);
      });
    },
    selecteAll(node) {
      if (this.isSelectAll(node)) {
        node.forEach(childNode => {
          this.selectedList.splice(
            this.selectedList.findIndex(item => item === childNode.id),
            1
          );
        });
      } else {
        node.forEach(childNode => {
          if (!this.selectedList.includes(childNode.id)) {
            this.selectedList.push(childNode.id);
          }
        });
      }
    },
    showChildNode(option, index, node) {
      let tempNode = {
        id: option.id,
        nodeLevel: option.nodeLevel
      };
      if (this.childNodeshowList.length > 0) {
        let haschildNodes = this.childNodeshowList.findIndex(item => item.id === option.id);
        this.childNodeshowList = this.childNodeshowList.filter(item =>
          item.nodeLevel < option.nodeLevel
        );
        if (haschildNodes < 0) {
          this.childNodeshowList.push(tempNode);
        }
      } else {
        this.childNodeshowList.push(tempNode);
      }
    }
  },
  watch: {
  },
  mounted() {
    window.onresize = () => {
      this.clientWidth = window.innerWidth;
    };
  }
};
</script>

<style lang="scss" scoped>
.bd-filterMenu-pc {
  .filter-list {
    flex: 1;
    position: relative;
    overflow: hidden;
    padding-right: 30px;
    ul {
      li {
        display: inline-flex;
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-bottom: 10px;
        &.selected {
          .option-item {
            border: 1px dashed #4385fb;
            .option-icon {
              display: inline-block;
            }
          }
        }
        &.hasChildNode {
          .option-item {
            border: none;
            .option-icon {
              display: inline-block;
              color: #4385fb;
            }
            &:hover {
              background-color: #4385fb;
              color: #fff;
              .option-icon {
                color: #fff;
              }
            }
          }
          &.selected {
            .option-item {
              background-color: #4385fb;
              color: #fff;
              .option-icon {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .parent-node-name {
    width: 100px;
    height: 22px;
    line-height: 22px;
  }
  .all-options {
    height: 22px;
    line-height: 22px;
    margin-right: 15px;
    padding: 0 10px;
    cursor: pointer;
    &.selected, &:hover{
      background-color: #4385fb;
      color: #fff;
    }
  }
  .option-item {
    display: inline-block;
    height: 22px;
    line-height: 20px;
    padding: 0 8px;
    border: 1px dashed transparent;
    cursor: pointer;
    .option-icon {
      display: none;
      margin-left: 10px;
      font-size: 12px;
      color: #4385fb;
    }
    &:hover {
      border: 1px dashed #4385fb;
      .option-icon {
        display: inline-block;
        margin-left: 10px;
        font-size: 12px;
        color: #4385fb;
      }
    }
  }
  .primary-filter-item {
    &:not(:last-child){
      border-bottom: 1px dashed #95c2ff;
    }
  }
  .parent-filter-content {
    display: flex;
    padding-top: 10px;
    .parent-node-name {
      font-weight: bold;
    }
    .collapse-icon {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 14px;
      color: #4385fb;
      cursor: pointer;
    }
  }
  .children-filter-item {
    display: flex;
    &[nodelevel="2"] {
      padding-top: 10px;
      border-top: 1px dashed #95c2ff;
    }
    @for $i from 3 to 10
    {
      &[nodelevel="#{$i}"] {
        .parent-node-name,.all-options {
          margin-top: 11px;
        }
        .filter-list {
          padding-top: 10px;
          border-top: 1px dashed #eee;
        }
      }
    }
  }
}
</style>
