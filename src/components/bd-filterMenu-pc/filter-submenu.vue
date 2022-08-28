<template>
  <div>
    <div
      v-for="node in parentNode"
      :key="node.id"
      :level="level"
      :parent-id="parentId"
      class="filter-submenu-item"
    >
      <span>{{ node.name }}</span>
      <div
        v-if="node.children"
        class="filter-submenu-content"
        :level="level+1"
      >
        <filter-submenu
          :parent-node="node.children"
          :parent-id="node.id"
          :level="level+1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterSubmenu from './filter-submenu';
export default {
  name: 'FilterSubmenu',
  components: {
    FilterSubmenu
  },
  data() {
    return {};
  },
  computed: {},
  props: {
    parentNode: {
      type: Array
    },
    parentId: {
      type: Number
    },
    level: {
      type: Number
    }
  },
  methods: {},
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.bd-filterMenu-pc {
}
</style>
