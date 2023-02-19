import type { App } from 'vue';
import SvgIcon from '@/components/svg.vue';

const requireAll = (requireContext: any) => {
  requireContext.keys().map(requireContext);
}

const req = require.context('@/assets/svg', false, /\.svg$/)
requireAll(req);

export default function svgIconRegistered(app: App) {
  app.component('SvgIcon', SvgIcon)
}