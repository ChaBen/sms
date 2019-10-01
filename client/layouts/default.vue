<template>
  <div id="vue-material-kit-pro" :class="{ 'nav-open': NavbarStore.showNavbar }">
    <client-only>
      <MainNavbar :navbar-transparent="true" :color-on-scroll="66" />
    </client-only>

    <Nuxt />
  </div>
</template>

<script>
import MainNavbar from '@/components/layout/MainNavbar';

export default {
  components: {
    MainNavbar
  },
  mounted() {
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5d6a67c177aa790be331bb8f/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }
}
</script>
