import textNote from './bd-textNote-pc';

textNote.install = function(Vue) {
  Vue.component(textNote.name, textNote);
};

export default textNote;
