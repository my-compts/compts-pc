import { shallowMount, mount } from '@vue/test-utils';
import common from './common/common';
import { data, series } from './data/bdIndicatorCard_data';
import BdIndicatorCard from '@/components/bd-indicatorCard-pc';

describe('BdIndicatorCard.vue', () => {
  const wrapper = shallowMount(BdIndicatorCard, {
    localVue: common.localVue,
    propsData: {
      data,
      series,
      bgColor: 'red',
      mainFontSize: 16,
      mainColor: 'red',
      subFontSize: 16,
      subColor: 'green',
      isMainIndicator: false,
      isNote: true,
      noteContent: '这是备注',
      subRowNum: 2
    }
  });
  it('指标卡背景色', () => {
    const wrap = wrapper.find('.bd-indicatorCard-pc');
    expect(wrap.attributes('style')).toContain('background-color: red');
  });
  // 主指标
  it('是否显示主指标', () => {
    const wrap = wrapper.find('.mainIndicator .indicator');
    expect(wrap.exists()).toBe(true);
  });
  it('是否显示备注', () => {
    const wrap = wrapper.find('.note');
    expect(wrap.exists()).toBe(true);
  });
  it('是否展示主指标条件设置', () => {
    const wrap = wrapper.findAll('.mainIndicator .value span').at(1);
    expect(wrap.exists()).toBe(true);
  });
  it('主指标字段样式', () => {
    const wrap = wrapper.find('.mainIndicator .indicator');
    expect(wrap.attributes('style')).toContain('font-size: 16px; color: red;');
  });
  it('主指标值样式', () => {
    const wrap = wrapper.find('.mainIndicator .value span');
    expect(wrap.attributes('style')).toContain('font-size: 16px; color: red;');
  });
  it('主指标条件设置字体大小', () => {
    const wrap = wrapper.findAll('.mainIndicator .value span').at(1);
    expect(wrap.attributes('style')).toContain('font-size: 16px;');
  });
  it('主指标是否显示大于等于', () => {
    const wrap = wrapper.find('.mainIndicator .icon-A10034_up');
    expect(wrap.exists()).toBe(true);
  });
  it('主指标条件设置大于等于图标颜色', () => {
    const wrap = wrapper.find('.mainIndicator .icon-A10034_up');
    expect(wrap.attributes('style')).toContain('color: red;');
  });
  it('主指标是否显示小于等于', () => {
    const wrap = wrapper.find('.mainIndicator .icon-A10035_down');
    expect(wrap.exists()).toBe(true);
  });
  it('主指标条件设置小于等于图标颜色', () => {
    const wrap = wrapper.find('.mainIndicator .icon-A10035_down');
    expect(wrap.attributes('style')).toContain('color: green;');
  });

  // 副指标
  it('副指标字段样式', () => {
    const wrap = wrapper.find('.subIndicator .indicator');
    expect(wrap.attributes('style')).toContain('font-size: 16px; color: green;');
  });
  it('副指标值样式', () => {
    const wrap = wrapper.find('.subIndicator .value span');
    expect(wrap.attributes('style')).toContain('font-size: 16px; color: green;');
  });
  it('副指标每行展示样式', () => {
    const wrap = wrapper.find('.subIndicator');
    expect(wrap.attributes('style')).toContain('width: 50%;');
  });
  it('是否展示副指标条件设置', () => {
    const wrap = wrapper.findAll('.subIndicator .value span').at(1);
    expect(wrap.exists()).toBe(true);
  });
  it('副指标条件设置字体大小', () => {
    const wrap = wrapper.findAll('.subIndicator .value span').at(1);
    expect(wrap.attributes('style')).toContain('font-size: 16px;');
  });
  it('副指标是否显示大于等于', () => {
    const wrap = wrapper.find('.subIndicator .icon-A10034_up');
    expect(wrap.exists()).toBe(true);
  });
  it('副指标条件设置大于等于图标颜色', () => {
    const wrap = wrapper.find('.subIndicator .icon-A10034_up');
    expect(wrap.attributes('style')).toContain('color: red;');
  });
  it('副指标是否显示小于等于', () => {
    const wrap = wrapper.find('.subIndicator .icon-A10035_down');
    expect(wrap.exists()).toBe(true);
  });
  it('副指标条件设置小于等于图标颜色', () => {
    const wrap = wrapper.find('.subIndicator .icon-A10035_down');
    expect(wrap.attributes('style')).toContain('color: green;');
  });
});
