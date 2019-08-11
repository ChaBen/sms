/**
 * You can register global mixins here
 */

const NavbarStore = {
  showNavbar: false
};

const GlobalMixins = {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          NavbarStore
        };
      },
      mounted() {
        const { bodyClass } = this.$options;
        if (bodyClass) {
          document.body.classList.add(bodyClass);
        }
      },
      beforeDestroy() {
        const { bodyClass } = this.$options;
        if (bodyClass) {
          document.body.classList.remove(bodyClass);
        }
      }
    });
  }
};

export default GlobalMixins;
