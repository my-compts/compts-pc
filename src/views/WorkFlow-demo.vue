<template>
  <div>
    <bd-div
      type="bd-work-flow"
      v-model="flowData"
      :flow-data="flowData"
      compt-id="flow1"
      style="height: 148px;"
      :col-setting="colSetting1"
      :key-name="keyName1"
    />
    <bd-div
      type="bd-work-flow"
      v-model="flowData1"
      :flow-data="flowData1"
      compt-id="flow2"
      style="height: 148px;"
      :col-setting="colSetting2"
      :key-name="keyName2"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      flowData: [],
      flowData1: [],
      colSetting1: { 'D9A492CB24BE3BE488D19AEBCD8311EB': { 'oriName': '移动当日新增通话客户数', 'nickName': 'test', 'decimalDigit': 2, 'fontSize': 18, 'fontColor': 'rgba(255, 128, 64, 1)', 'valueColor': '#303133' }, 'D9A492CB24BE3BE488D19AECCD8311EB': { 'oriName': '移动当日新增通话客户数较上一天变化值', 'nickName': '变化值', 'decimalDigit': 4, 'fontSize': 20, 'fontColor': 'rgba(64, 79, 95, 1)', 'valueColor': 'red' } },
      keyName1: 'element_id',
      colSetting2: { 'D9A492CB24BE3BE488D19AEBCD8311EB': { 'oriName': '移动当日新增通话客户数', 'nickName': 'test', 'decimalDigit': 2, 'fontSize': 18, 'fontColor': 'rgba(255, 128, 64, 1)', 'valueColor': '#303133' }, 'D9A492CB24BE3BE488D19AECCD8311EB': { 'oriName': '移动当日新增通话客户数较上一天变化值', 'nickName': '变化值', 'decimalDigit': 4, 'fontSize': 20, 'fontColor': 'rgba(64, 79, 95, 1)', 'valueColor': 'red' } },
      keyName2: 'key'
    };
  },
  methods: {
    setData() {
      this.flowData = [];
      for (let i = 0; i < 6; i++) {
        let item = {
          'xData': [{ value: '工单受理' + i }],
          'yData': [{ name: '工单总量' + i, value: '1234126545654', element_id: 'D9A492CB24BE3BE488D19AEBCD8311EB' }, { name: '完成量' + i, value: '123654', element_id: 'D9A492CB24BE3BE488D19AECCD8311EB' }]
        };
        this.flowData.push(item);
      }
    },
    setData1() {
      this.flowData1 = [];
      for (let i = 0; i < 3; i++) {
        let item = {
          'xData': [{ value: '工单受理' + i }],
          'yData': [{ name: '工单总量' + i, value: '1234126545654', key: 'D9A492CB24BE3BE488D19AEBCD8311EB' }, { name: '完成量' + i, value: '123654', key: 'D9A492CB24BE3BE488D19AECCD8311EB' }]
        };
        this.flowData1.push(item);
      }
    }
  },
  mounted() {
    this.setData();
    this.setData1();
  }
};
</script>

<style lang="scss"></style>
