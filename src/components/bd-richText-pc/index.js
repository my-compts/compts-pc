import richText from './bd-richText-pc';

richText.install = function (Vue) {
  Vue.component(richText.name, richText);
};

export default richText;
