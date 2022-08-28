import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Element from 'element-ui';

const localVue = createLocalVue();
localVue.use(Element);

export default {
  localVue
};
