import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import '@/assets/scss/material-kit.scss';
import '@/assets/style.scss';
import globalDirectives from './globalDirectives';
import globalMixins from './globalMixins';
// import basicMixins from "./basicMixins";
import globalComponents from './globalComponents';
import VeeValidate from 'vee-validate';
import VueLazyload from 'vue-lazyload';
import VueGitHubButtons from 'vue-github-buttons';
import 'vue-github-buttons/dist/vue-github-buttons.css';

const materialKit = {
  install(Vue) {
    Vue.use(VueMaterial);
    Vue.use(globalDirectives);
    Vue.use(globalMixins);
    Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
    // Vue.use(basicMixins);
    Vue.use(globalComponents);
    Vue.use(VueLazyload, {
      observer: true,
      // optional
      observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      }
    });
    Vue.use(VueGitHubButtons, { useCache: false });
    Vue.filter('Comma', str => {
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
  }
};

Vue.use(materialKit);
