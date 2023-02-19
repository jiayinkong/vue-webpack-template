<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

const props = defineProps({
  iconClass: {
    type: String as PropType<string>,
    require: true
  },
  className: {
    type: String as PropType<string>
  }
});

const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon');
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>