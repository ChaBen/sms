<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-fixed"
    :class="{
      [`md-${type}`]: !navbarTransparent,
      [extraNavClasses]: navbarTransparent,
      'md-transparent': navbarTransparent
    }"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <nuxt-link class="logo" :to="$i18n.path('')">Canada SMS</nuxt-link>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <li v-if="!isAuthenticated" class="md-list-item">
                <nuxt-link :to="$i18n.path('login')" class="md-list-item-link md-list-item-container md-button-clean">
                  <div class="md-list-item-content">
                    <div class="md-ripple">
                      <i class="fal fa-fingerprint" />{{ $t('head.login') }}
                    </div>
                  </div>
                </nuxt-link>
              </li>
              <li v-if="!isAuthenticated" class="md-list-item">
                <nuxt-link :to="$i18n.path('signup')" class="md-list-item-link md-list-item-container md-button-clean">
                  <div class="md-list-item-content">
                    <div class="md-ripple">
                      <i class="fal fa-user-plus" />{{ $t('head.register') }}
                    </div>
                  </div>
                </nuxt-link>
              </li>
              <li class="md-list-item">
                <nuxt-link :to="$i18n.path('pricing')" class="md-list-item-link md-list-item-container md-button-clean">
                  <div class="md-list-item-content">
                    <div class="md-ripple">
                      <i class="fal fa-usd-circle" />{{ $t('head.pricing') }}
                    </div>
                  </div>
                </nuxt-link>
              </li>
              <li v-if="isAuthenticated" class="md-list-item">
                <a class="md-list-item-link md-list-item-container md-button-clean" @click.prevent="exit">
                  <div class="md-list-item-content">
                    <div class="md-ripple">
                      <i class="fal fa-sign-out-alt" />{{ $t('head.logout') }}
                    </div>
                  </div>
                </a>
              </li>
              <li class="md-list-item">
                <nuxt-link :to="$i18n.path('sms')" class="sms md-list-item-router md-list-item-container md-button-clean">
                  <div class="md-list-item-content">
                    <md-button class="md-rose md-round">
                      <i class="far fa-comment" />{{ $t('head.sms') }}
                    </md-button>
                  </div>
                </nuxt-link>
              </li>
              <li class="md-list-item">
                <a href="javascript:void(0)" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <small class="flag-icon"><country-flag :country="$i18n.locale.toLowerCase()" size="small" /></small>
                        <p>{{ $t('head.lang') }}</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li v-if="$i18n.locale === 'kr' || $i18n.locale === 'cn'">
                          <nuxt-link :to="linkPath('/us')">
                            <small class="flag-icon"><country-flag country="us" size="small" /></small>
                            English
                          </nuxt-link>
                        </li>
                        <li v-if="$i18n.locale === 'us' || $i18n.locale === 'cn'">
                          <nuxt-link :to="linkPath('/kr')">
                            <small class="flag-icon"><country-flag country="kr" size="small" /></small>
                            Korean
                          </nuxt-link>
                        </li>
                        <li v-if="$i18n.locale === 'us' || $i18n.locale === 'kr'">
                          <nuxt-link :to="linkPath('/cn')">
                            <small class="flag-icon"><country-flag country="cn" size="small" /></small>
                            Chinese
                          </nuxt-link>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import CountryFlag from 'vue-country-flag'
import { mapState, mapMutations, mapActions } from 'vuex';
import MobileMenu from './MobileMenu';
export default {
  components: {
    MobileMenu,
    CountryFlag
  },
  props: {
    type: {
      type: String,
      default: 'white',
      validator(value) {
        return [
          'white',
          'default',
          'primary',
          'danger',
          'success',
          'warning',
          'info',
          'dark'
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    },
    navbarTransparent: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    extraNavClasses: '',
    toggledClass: false
  }),
  computed: {
    ...mapState('auth', ['accessToken']),
    ...mapState({
      locales: 'locales',
      lang: 'locale'
    }),
    isAuthenticated() {
      return !!this.accessToken;
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollListener);
  },
  methods: {
    ...mapMutations({
      setLang: 'SET_LANG'
    }),
    ...mapActions({
      logout: 'auth/logout'
    }),
    linkPath(lang) {
      const { locales, $route } = this;
      const isLang = $route.fullPath.includes(locales[0]) || $route.fullPath.includes(locales[1]) || $route.fullPath.includes(locales[2]);
      const pushLang = lang === 'us' ? '' : lang;
      const fullPath = $route.fullPath.replace(/^\/[^\/]+/, pushLang);
      return isLang ? fullPath : `${lang}${$route.fullPath}`;
    },
    async exit() {
      await this.logout();
      this.$router.push(this.$i18n.path(''));
    },
    bodyClick() {
      const bodyClick = document.getElementById('bodyClick');

      if (bodyClick === null) {
        const body = document.querySelector('body');
        const elem = document.createElement('div');
        elem.setAttribute('id', 'bodyClick');
        body.appendChild(elem);

        const bodyClick = document.getElementById('bodyClick');
        bodyClick.addEventListener('click', this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      const scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      const navbarColor = document.getElementById('toolbar');
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove('md-transparent');
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = '';
          navbarColor.classList.add('md-transparent');
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    }
  }
};
</script>

<style lang="scss" scoped>
.flag-icon {
  height: 17px;
  .flag {
    margin-top: -24px;
    margin-right: -15px;
  }
}
.md-toolbar.md-transparent {
  .logo {
    color: #fff !important;
  }
}
.md-toolbar.md-white {
  .logo {
    color: #222 !important;
  }
}
</style>
