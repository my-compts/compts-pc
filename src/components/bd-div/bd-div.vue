<template>
  <div
    :is="type"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script>
export default {
  name: 'BdDiv',
  props: {
    type: {
      default: '',
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
