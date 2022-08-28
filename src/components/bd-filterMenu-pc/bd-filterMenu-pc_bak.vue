<template>
  <div>
    <div
      class="bd-filterMenu-pc"
      v-if="data"
    >
      <div
        v-for="node in data"
        :key="node.id"
        :level="level"
        class="filter-menu-item"
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
  </div>
</template>

<script>
import FilterSubmenu from './filter-submenu';
export default {
  components: {
    FilterSubmenu
  },
  data() {
    return {
      level: 1
    };
  },
  name: 'BdFilterMenuPc',
  props: {
    data: {
      type: Array
    }
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.bd-filterMenu-pc {
}
</style>
