import '../plugins/element.js';
import BdTextNotePc from '../components/bd-textNote-pc/bd-textNote-pc.vue';
import { withKnobs, text, color, number } from '@storybook/addon-knobs';

export default {
  title: 'BdTextNotePc',
  component: BdTextNotePc,
  argTypes: {
    label: {
      description: 'Overwritten description',
      table: {
        type: {
          summary: 'Something short',
          detail: 'Something really really long'
        }
      },
      control: {
        type: null
      }
    }
  },
  decorators: [withKnobs]
};
export const toStorybook = () => ({
  components: { BdTextNotePc },
  props: {
    textLabel: {
      default: text('textLabel', 'Hello Storybook')
    },
    fontColor: {
      default: color('字体颜色', '#409eff')
    },
    fontSize: {
      default: number('字体大小', 16)
    }
  },
  template: '<BdTextNotePc :text-label="textLabel" :font-color="fontColor" :font-size="fontSize" />'
});

toStorybook.story = {
  name: 'BdTextNotePc'
};

