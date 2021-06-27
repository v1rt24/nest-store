<template>
  <div class="container">
    <component :is="layout"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, defineAsyncComponent, computed} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();

    const layout = computed(() => {
      const component = route.meta?.layout;

      if (component) {
        return defineAsyncComponent(() => import(`./layouts/${component}.vue`));
      }
    });

    return {
      layout,
    };
  },
});
</script>

<style scoped>

</style>