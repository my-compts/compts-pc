import textarea from './bd-textarea-pc';

textarea.install = function(Vue) {
  Vue.component(textarea.name, textarea);
};

export default textarea;
