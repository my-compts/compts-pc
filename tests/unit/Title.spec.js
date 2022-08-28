import { shallowMount, mount } from '@vue/test-utils';
import Title from '@/components/bd-title-pc/bd-title-pc.vue';
// import sinon from "sinon";

describe('Title.vue', () => {
  it('Title text', () => {
    const wrapper = shallowMount(Title, {
      propsData: { titletext: '标题文本' }
    });
    const titleWrap = wrapper.find('.bd-title-pc');
    expect(titleWrap.text()).toMatch('标题文本');
  });
  it('Icon exists', () => {
    const wrapper = shallowMount(Title, {
      propsData: { isShowfontIcon: true }
    });
    const IconTag = wrapper.find('span');
    expect(IconTag.exists()).toBe(true);
  });
  it('Icon class', () => {
    const wrapper = shallowMount(Title, {
      propsData: { titleIconCls: 'icon-A10060_3square' }
    });
    const IconTag = wrapper.find('span');
    expect(IconTag.classes('icon-A10060_3square')).toBe(true);
  });

  it('Click Event', async () => {
    const mockFn = jest.fn();
    const wrapper = shallowMount(Title, {
      propsData: { titleURL: 'www.baidu.com' }
    });
    const result = mockFn(wrapper.vm.titleURL);
    wrapper.vm.operWindos = mockFn;
    await wrapper.trigger('click');
    expect(result).toBeUndefined();
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalledWith('www.baidu.com');
  });
  it('fontSize', () => {
    const wrapper = shallowMount(Title, {
      propsData: { fontSize: 16 }
    });
    const titleWrap = wrapper.find('.bd-title-pc');
    expect(titleWrap.attributes('style')).toContain('font-size: 16px');
  });
  it('fontWeight', () => {
    const wrapper = shallowMount(Title, {
      propsData: { fontWeight: 'normal' }
    });
    const titleWrap = wrapper.find('.bd-title-pc');
    expect(titleWrap.attributes('style')).toContain('font-weight: normal');
  });
  it('fontColor', () => {
    const wrapper = shallowMount(Title, {
      propsData: { fontColor: '#333' }
    });
    const titleWrap = wrapper.find('.bd-title-pc');
    expect(titleWrap.attributes('style')).toContain('color');
  });
});
